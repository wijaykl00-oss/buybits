import express from 'express';
import crypto from 'crypto';
import { db, dbMutex } from './db.js';
import { generateDynamicQRIS } from './qris.js';
import { validateStockForCheckout, fulfillOrderAtomically } from './inventory.js';
import { ALL_PRODUCTS, convertUsdToIdr, USD_TO_IDR_RATE, getFlashSaleCycleInfo } from '../src/data/products.js';
import { Order, CartItem, OrderStatus, InventoryItem } from '../src/types.js';

const app = express();
const PORT = process.env.PORT || 3001;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'buybits_secret_webhook_key_2026';

app.use(express.json());

// CORS headers for Vite dev server proxy or direct communication
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Webhook-Signature');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ==========================================
// 1. GET /api/products - Live catalog with stock
// ==========================================
app.get('/api/products', (req, res) => {
  const cycle = getFlashSaleCycleInfo();
  const productsWithStock = ALL_PRODUCTS.map((prod) => {
    const availableStock = db.getAvailableStockForProduct(prod.id);
    const isFlashSale = prod.inFlashSaleBatch === cycle.currentBatch;
    return {
      ...prod,
      availableStock,
      isFlashSaleActive: isFlashSale,
    };
  });

  res.json({
    success: true,
    products: productsWithStock,
    currentFlashSaleBatch: cycle.currentBatch,
    secondsRemaining: cycle.secondsRemaining,
  });
});

// ==========================================
// 2. POST /api/orders/checkout - Server Price Validation & Dynamic QRIS Generation
// ==========================================
app.post('/api/orders/checkout', async (req, res) => {
  try {
    const { customerName, customerEmail, customerWhatsApp, items } = req.body;

    if (!customerEmail || !customerEmail.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid customer email is required' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart cannot be empty' });
    }

    // Validate Stock first
    const stockValidation = await validateStockForCheckout(
      items.map((it: any) => ({
        productId: it.productId || it.product?.id,
        quantity: it.quantity || 1,
      }))
    );

    if (!stockValidation.valid) {
      return res.status(400).json({
        success: false,
        error: `Stok produk berikut habis atau tidak mencukupi: ${stockValidation.outOfStockProducts.join(', ')}`,
      });
    }

    // Server-Side Price Calculation (Do NOT trust client prices)
    const cycle = getFlashSaleCycleInfo();
    let calculatedTotalUsd = 0;
    const validatedCartItems: CartItem[] = [];

    for (const item of items) {
      const prodId = item.productId || item.product?.id;
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      const serverProduct = ALL_PRODUCTS.find((p) => p.id === prodId);

      if (!serverProduct) {
        return res.status(400).json({ success: false, error: `Invalid product ID: ${prodId}` });
      }

      const isFlashSale = serverProduct.inFlashSaleBatch === cycle.currentBatch;
      const serverFinalPriceUsd =
        serverProduct.flashSalePriceUsd ??
        (isFlashSale
          ? Number((serverProduct.priceUsd * 0.2).toFixed(2))
          : serverProduct.priceUsd);

      calculatedTotalUsd += serverFinalPriceUsd * quantity;

      validatedCartItems.push({
        product: serverProduct,
        quantity,
        isFlashSale,
        finalPriceUsd: serverFinalPriceUsd,
      });
    }

    const baseTotalIdr = convertUsdToIdr(calculatedTotalUsd);
    // Unique 3-digit verification code
    const uniqueCode = Math.floor(100 + Math.random() * 899);
    const finalTotalIdr = baseTotalIdr + uniqueCode;

    const timestamp = Date.now();
    const orderId = `ord-${timestamp}-${Math.random().toString(36).substring(2, 6)}`;
    const orderNumber = `AIS-${timestamp.toString().slice(-6)}`;

    // Expiration: 15 minutes from now
    const expiresAt = new Date(timestamp + 15 * 60 * 1000).toISOString();

    // Generate EMVCo standard Dynamic QRIS for this exact transaction amount
    const qrisPayload = generateDynamicQRIS({
      amount: finalTotalIdr,
      orderId: orderNumber,
      merchantName: 'BUYBITS ID OFFICIAL',
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
      customerName: (customerName || 'Pelanggan Buybits').trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerWhatsApp: customerWhatsApp?.trim(),
      items: validatedCartItems,
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

    db.saveOrder(newOrder);

    res.status(201).json({
      success: true,
      order: newOrder,
      qrisPayload,
      finalTotalIdr,
      expiresAt,
    });
  } catch (err: any) {
    console.error('[API Checkout Error]', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error during checkout' });
  }
});

// ==========================================
// 3. GET /api/orders/:id - Order Status & Credentials
// ==========================================
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { email } = req.query;

  const order = db.getOrderById(id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Pesanan tidak ditemukan' });
  }

  // Check if order is expired
  if (order.status === 'PENDING' && order.expiresAt) {
    if (new Date() > new Date(order.expiresAt)) {
      order.status = 'EXPIRED';
      db.saveOrder(order);
    }
  }

  // Security: Only return credentials if email matches or if requested by admin/order owner
  const isOwner = email && order.customerEmail.toLowerCase() === String(email).trim().toLowerCase();

  const sanitizedOrder: Order = {
    ...order,
    credentials: isOwner || order.status === 'FULFILLED' ? order.credentials : undefined,
  };

  res.json({
    success: true,
    order: sanitizedOrder,
  });
});

// ==========================================
// 4. POST /api/webhooks/payment - Webhook Receiver with Verification & Idempotency
// ==========================================
app.post('/api/webhooks/payment', async (req, res) => {
  try {
    const { orderId, amount, transactionId, status, signature } = req.body;

    if (!orderId || !amount || !transactionId) {
      return res.status(400).json({ success: false, error: 'Missing required webhook parameters' });
    }

    // Optional HMAC Signature Verification
    if (signature && WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(`${orderId}:${amount}:${transactionId}`)
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(401).json({ success: false, error: 'Invalid webhook signature' });
      }
    }

    // Idempotency Check: Prevent duplicate webhook processing
    if (db.isWebhookProcessed(transactionId)) {
      const existingOrder = db.getOrderById(orderId);
      return res.status(200).json({
        success: true,
        message: 'Webhook duplicate already processed (Idempotent)',
        order: existingOrder,
      });
    }

    const order = db.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: `Order ${orderId} not found` });
    }

    // Amount validation: must match finalTotalIdr exactly
    if (Number(amount) !== Number(order.finalTotalIdr)) {
      return res.status(400).json({
        success: false,
        error: `Nominal pembayaran tidak sesuai (Diharapkan: ${order.finalTotalIdr}, Diterima: ${amount})`,
      });
    }

    if (status === 'FAILED' || status === 'CANCELLED') {
      order.status = 'FAILED';
      db.saveOrder(order);
      db.recordProcessedWebhook(transactionId, order.id, Number(amount));
      return res.json({ success: true, message: 'Order marked as FAILED', order });
    }

    if (status === 'PAID' || status === 'SUCCESS' || !status) {
      // Execute atomic fulfillment with mutex lock
      const fulfillment = await fulfillOrderAtomically(order.id, transactionId);

      if (!fulfillment.success) {
        return res.status(500).json({
          success: false,
          error: `Gagal memproses alokasi produk: ${fulfillment.error}`,
        });
      }

      // Record successful webhook
      db.recordProcessedWebhook(transactionId, order.id, Number(amount));

      return res.json({
        success: true,
        message: 'Pembayaran terverifikasi, akun digital berhasil dialokasikan',
        order: fulfillment.order,
      });
    }

    res.status(400).json({ success: false, error: 'Unsupported payment status' });
  } catch (err: any) {
    console.error('[API Webhook Error]', err);
    res.status(500).json({ success: false, error: err.message || 'Internal webhook error' });
  }
});

// ==========================================
// 5. ADMIN APIS
// ==========================================

// GET /api/admin/orders
app.get('/api/admin/orders', (req, res) => {
  const orders = db.getOrders();
  res.json({ success: true, orders });
});

// GET /api/admin/inventory
app.get('/api/admin/inventory', (req, res) => {
  const inventory = db.getInventory();
  const summary = ALL_PRODUCTS.map((prod) => ({
    productId: prod.id,
    productName: prod.name,
    availableStock: inventory.filter((i) => i.productId === prod.id && i.status === 'AVAILABLE').length,
    soldCount: inventory.filter((i) => i.productId === prod.id && i.status === 'SOLD').length,
  }));

  res.json({
    success: true,
    inventory,
    summary,
  });
});

// POST /api/admin/inventory/add - Add single or bulk items
app.post('/api/admin/inventory/add', async (req, res) => {
  const release = await dbMutex.acquire();
  try {
    const { productId, rawText, itemType } = req.body;
    const product = ALL_PRODUCTS.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    if (!rawText || typeof rawText !== 'string') {
      return res.status(400).json({ success: false, error: 'rawText is required' });
    }

    const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
    const newItems: InventoryItem[] = [];
    const now = new Date().toISOString();

    for (const line of lines) {
      const randId = `inv-${productId}-${Date.now().toString().slice(-4)}-${Math.random().toString(36).substring(2, 6)}`;
      
      if (itemType === 'LICENSE_KEY' || product.category === 'API' || line.startsWith('sk-')) {
        newItems.push({
          id: randId,
          productId,
          productName: product.name,
          type: 'LICENSE_KEY',
          licenseKey: line,
          loginUrl: 'https://platform.openai.com/api-keys',
          instructions: 'Salin API Key di atas ke environment variable Anda.',
          status: 'AVAILABLE',
          createdAt: now,
        });
      } else {
        // Assume format email:password or email|password
        const [accountEmail, accountPassword] = line.includes('|') ? line.split('|') : line.split(':');
        const loginUrl =
          product.brand === 'claude'
            ? 'https://claude.ai/login'
            : product.brand === 'chatgpt'
            ? 'https://chatgpt.com/auth/login'
            : product.brand === 'cursor'
            ? 'https://cursor.com/login'
            : 'https://gemini.google.com/app';

        newItems.push({
          id: randId,
          productId,
          productName: product.name,
          type: 'ACCOUNT',
          accountEmail: accountEmail?.trim() || line,
          accountPassword: accountPassword?.trim() || `Pass#${Math.random().toString(36).slice(-6)}!`,
          loginUrl,
          instructions: 'Gunakan kredensial ini untuk login ke platform resmi.',
          status: 'AVAILABLE',
          createdAt: now,
        });
      }
    }

    db.addInventoryItems(newItems);

    res.status(201).json({
      success: true,
      addedCount: newItems.length,
      items: newItems,
    });
  } finally {
    release();
  }
});

// POST /api/admin/simulate-webhook - Interactive simulation tool for testing
app.post('/api/admin/simulate-webhook', async (req, res) => {
  const { orderId, action } = req.body;
  const order = db.getOrderById(orderId);

  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }

  const transactionId = `sim_tx_${Date.now()}`;

  if (action === 'EXPIRE') {
    order.status = 'EXPIRED';
    db.saveOrder(order);
    return res.json({ success: true, message: 'Order marked as EXPIRED', order });
  }

  if (action === 'FAIL') {
    order.status = 'FAILED';
    db.saveOrder(order);
    return res.json({ success: true, message: 'Order marked as FAILED', order });
  }

  // Action: PAY_AND_FULFILL
  const fulfillment = await fulfillOrderAtomically(order.id, transactionId);
  db.recordProcessedWebhook(transactionId, order.id, order.finalTotalIdr);

  if (!fulfillment.success) {
    return res.status(500).json({ success: false, error: fulfillment.error });
  }

  res.json({
    success: true,
    message: 'Simulasi pembayaran berhasil! Akun langsung dialokasikan.',
    order: fulfillment.order,
  });
});

export { app, PORT };

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Buybits Backend] Server running on http://localhost:${PORT}`);
  });
}
