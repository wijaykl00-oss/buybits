import { Order, CartItem, DigitalCredential, InventoryItem } from '../types';
import { ALL_PRODUCTS, convertUsdToIdr, USD_TO_IDR_RATE, getFlashSaleCycleInfo } from '../data/products';
import { generateDynamicQRIS } from './qrisEngine';

const STORAGE_KEY_ORDERS = 'buybits_orders_v1';

function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredOrders(orders: Order[]) {
  try {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders to localStorage:', err);
  }
}

export function createCheckoutOrder(params: {
  customerName: string;
  customerEmail: string;
  customerWhatsApp?: string;
  items: CartItem[];
}): { order: Order; qrisPayload: string; finalTotalIdr: number } {
  const { customerName, customerEmail, customerWhatsApp, items } = params;

  // Calculate prices strictly from catalog for currently selected items
  const cycle = getFlashSaleCycleInfo();
  let calculatedTotalUsd = 0;
  const validatedItems: CartItem[] = [];

  for (const item of items) {
    const prod = ALL_PRODUCTS.find((p) => p.id === item.product.id) || item.product;
    const isFlashSale = prod.inFlashSaleBatch === cycle.currentBatch;
    const finalPriceUsd =
      prod.flashSalePriceUsd ??
      (isFlashSale
        ? Number((prod.priceUsd * 0.20).toFixed(2))
        : prod.priceUsd);

    calculatedTotalUsd += finalPriceUsd * item.quantity;
    validatedItems.push({
      product: prod,
      quantity: item.quantity,
      isFlashSale,
      finalPriceUsd,
    });
  }

  const baseTotalIdr = convertUsdToIdr(calculatedTotalUsd);
  const uniqueCode = Math.floor(100 + Math.random() * 899);
  const finalTotalIdr = baseTotalIdr + uniqueCode;

  const timestamp = Date.now();
  const orderId = `ord-${timestamp}-${Math.random().toString(36).substring(2, 6)}`;
  const orderNumber = `AIS-${timestamp.toString().slice(-6)}`;
  const expiresAt = new Date(timestamp + 15 * 60 * 1000).toISOString();

  // Generate Dynamic QRIS for this exact nominal
  const qrisPayload = generateDynamicQRIS({
    amount: finalTotalIdr,
    orderId: orderNumber,
    merchantName: 'BUYBITS OFFICIAL',
  });

  const newOrder: Order = {
    id: orderId,
    orderNumber,
    createdAt: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    customerName: customerName.trim() || 'Pelanggan Buybits',
    customerEmail: customerEmail.trim().toLowerCase(),
    customerWhatsApp: customerWhatsApp?.trim(),
    items: validatedItems,
    totalUsd: calculatedTotalUsd,
    totalIdr: baseTotalIdr,
    exchangeRate: USD_TO_IDR_RATE,
    uniqueCode,
    finalTotalIdr,
    paymentMethod: 'Dynamic QRIS Realtime',
    status: 'PENDING',
    qrisPayload,
    expiresAt,
  };

  const existing = getStoredOrders();
  existing.unshift(newOrder);
  saveStoredOrders(existing);

  // Sync to server in background if available
  fetch('/api/orders/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName,
      customerEmail,
      customerWhatsApp,
      items: validatedItems,
    }),
  }).catch(() => {});

  return { order: newOrder, qrisPayload, finalTotalIdr };
}

export function fulfillOrder(orderId: string): Order | null {
  const orders = getStoredOrders();
  const order = orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  if (!order) return null;

  const now = new Date().toISOString();
  const credentials: DigitalCredential[] = [];

  // Generate separate credential per item and quantity
  for (const item of order.items) {
    for (let q = 0; q < item.quantity; q++) {
      const isApiKey = item.product.category === 'API';
      const randCode = Math.random().toString(36).substring(2, 7).toUpperCase();
      const duration = item.product.durationBadge || '1 Bulan';
      const expiresAt = duration.toLowerCase().includes('year') || duration.toLowerCase().includes('tahun')
        ? '365 Hari dari sekarang'
        : duration.toLowerCase().includes('3 month')
        ? '90 Hari dari sekarang'
        : '30 Hari dari sekarang';

      const serviceName = item.quantity > 1 ? `${item.product.name} (Akun #${q + 1})` : item.product.name;

      if (isApiKey) {
        credentials.push({
          serviceName,
          productId: item.product.id,
          licenseKey: `sk-proj-${item.product.brand}-${randCode}${Date.now().toString().slice(-6)}`,
          loginUrl: 'https://platform.openai.com/api-keys',
          instructions: 'Salin API Key di atas dan masukkan ke Authorization Bearer header aplikasi Anda.',
          expiresAt,
        });
      } else {
        const loginUrl =
          item.product.brand === 'claude'
            ? 'https://claude.ai/login'
            : item.product.brand === 'chatgpt'
            ? 'https://chatgpt.com/auth/login'
            : item.product.brand === 'cursor'
            ? 'https://cursor.com/login'
            : item.product.brand === 'google'
            ? 'https://gemini.google.com/app'
            : item.product.brand === 'leonardo'
            ? 'https://app.leonardo.ai'
            : item.product.brand === 'deepseek'
            ? 'https://chat.deepseek.com'
            : 'https://kiro.ai/login';

        credentials.push({
          serviceName,
          productId: item.product.id,
          accountEmail: `user.${item.product.brand}.${randCode.toLowerCase()}@buybitsofficial.id`,
          accountPassword: `Pass#${randCode}!2026`,
          loginUrl,
          instructions: 'Akun 100% Private & Legal. Anda dapat langsung login dan mengganti password sendiri.',
          expiresAt,
        });
      }
    }
  }

  order.status = 'FULFILLED';
  order.paidAt = now;
  order.fulfilledAt = now;
  order.transactionId = `tx_qris_${Date.now()}`;
  order.credentials = credentials;

  saveStoredOrders(orders);

  // Sync to server in background
  fetch('/api/admin/simulate-webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: order.id, action: 'PAY_AND_FULFILL' }),
  }).catch(() => {});

  return order;
}

export function submitPaymentProof(
  orderId: string,
  proof: {
    imageUrl: string;
    senderName: string;
    senderBank?: string;
    senderAccount?: string;
    transferAmount?: number;
    notes?: string;
  }
): Order | null {
  const orders = getStoredOrders();
  const order = orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  if (!order) return null;

  const uploadedAt = new Date().toISOString();
  order.paymentProof = {
    ...proof,
    uploadedAt,
  };

  // If order is still pending, fulfill it automatically or update status
  const fulfilledOrder = fulfillOrder(order.id);
  if (fulfilledOrder) {
    fulfilledOrder.paymentProof = {
      ...proof,
      uploadedAt,
    };
    saveStoredOrders(getStoredOrders().map((o) => (o.id === fulfilledOrder.id ? fulfilledOrder : o)));
  }

  // Also notify server endpoint with payment proof
  fetch(`/api/orders/${encodeURIComponent(order.id)}/payment-proof`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId: order.id,
      paymentProof: {
        ...proof,
        uploadedAt,
      },
    }),
  }).catch(() => {});

  return fulfilledOrder || order;
}

export function lookupOrder(query: string, email?: string): Order | null {
  const orders = getStoredOrders();
  const q = query.trim().toLowerCase();
  const order = orders.find(
    (o) => o.orderNumber.toLowerCase() === q || o.id.toLowerCase() === q
  );

  if (!order) return null;
  return order;
}

export function getAllOrders(): Order[] {
  return getStoredOrders();
}

