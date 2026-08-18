import { db, dbMutex } from './db.js';
import { Order, DigitalCredential, InventoryItem } from '../src/types.js';
import { ALL_PRODUCTS } from '../src/data/products.js';

export interface FulfillmentResult {
  success: boolean;
  error?: string;
  order?: Order;
  assignedCredentials?: DigitalCredential[];
}

/**
 * Validates requested item stock before allowing checkout
 */
export async function validateStockForCheckout(items: { productId: string; quantity: number }[]): Promise<{
  valid: boolean;
  outOfStockProducts: string[];
}> {
  const release = await dbMutex.acquire();
  try {
    const outOfStockProducts: string[] = [];

    for (const item of items) {
      const available = db.getAvailableStockForProduct(item.productId);
      if (available < item.quantity) {
        const prod = ALL_PRODUCTS.find((p) => p.id === item.productId);
        outOfStockProducts.push(prod?.name || item.productId);
      }
    }

    return {
      valid: outOfStockProducts.length === 0,
      outOfStockProducts,
    };
  } finally {
    release();
  }
}

/**
 * Fulfills an order atomically by taking available items from inventory,
 * marking them SOLD with orderId and timestamp, and attaching credentials to the order.
 */
export async function fulfillOrderAtomically(
  orderId: string,
  transactionId: string
): Promise<FulfillmentResult> {
  const release = await dbMutex.acquire();
  try {
    const order = db.getOrderById(orderId);
    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    if (order.status === 'FULFILLED') {
      // Idempotent: already fulfilled
      return {
        success: true,
        order,
        assignedCredentials: order.credentials,
      };
    }

    if (order.status === 'EXPIRED' || order.status === 'CANCELLED') {
      return { success: false, error: `Order is in ${order.status} state` };
    }

    const assignedCredentials: DigitalCredential[] = [];
    const itemsToUpdate: InventoryItem[] = [];
    const allInventory = db.getInventory();
    const now = new Date().toISOString();

    // Check stock for all cart items first
    for (const cartItem of order.items) {
      const neededQty = cartItem.quantity;
      const matchingAvailable = allInventory.filter(
        (inv) =>
          inv.productId === cartItem.product.id &&
          inv.status === 'AVAILABLE' &&
          !itemsToUpdate.some((u) => u.id === inv.id)
      );

      if (matchingAvailable.length < neededQty) {
        return {
          success: false,
          error: `Insufficient stock for product ${cartItem.product.name} (Need: ${neededQty}, Available: ${matchingAvailable.length})`,
        };
      }

      // Allocate items
      for (let i = 0; i < neededQty; i++) {
        const invItem = matchingAvailable[i];
        invItem.status = 'SOLD';
        invItem.orderId = order.id;
        invItem.soldAt = now;
        itemsToUpdate.push(invItem);

        const duration = cartItem.product.durationBadge || '1 Bulan';
        const expiresAt = duration.toLowerCase().includes('year') || duration.toLowerCase().includes('tahun')
          ? '365 Hari dari sekarang'
          : duration.toLowerCase().includes('3 month')
          ? '90 Hari dari sekarang'
          : '30 Hari dari sekarang';

        assignedCredentials.push({
          serviceName: cartItem.product.name,
          productId: cartItem.product.id,
          accountEmail: invItem.accountEmail,
          accountPassword: invItem.accountPassword,
          licenseKey: invItem.licenseKey,
          loginUrl: invItem.loginUrl || 'https://buybits.id',
          instructions: invItem.instructions || 'Gunakan kredensial resmi ini untuk login.',
          expiresAt,
        });
      }
    }

    // Persist all allocated items
    for (const item of itemsToUpdate) {
      db.updateInventoryItem(item);
    }

    // Update order status to PAID and then FULFILLED
    order.status = 'FULFILLED';
    order.transactionId = transactionId;
    order.paidAt = now;
    order.fulfilledAt = now;
    order.credentials = assignedCredentials;
    db.saveOrder(order);

    return {
      success: true,
      order,
      assignedCredentials,
    };
  } finally {
    release();
  }
}
