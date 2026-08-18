import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Order, InventoryItem, Product } from '../src/types.js';
import { ALL_PRODUCTS, USD_TO_IDR_RATE } from '../src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data_store');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export interface DatabaseSchema {
  orders: Order[];
  inventory: InventoryItem[];
  processedWebhooks: {
    transactionId: string;
    orderId: string;
    receivedAt: string;
    amount: number;
  }[];
}

class AsyncMutex {
  private queue: Array<() => void> = [];
  private locked = false;

  async acquire(): Promise<() => void> {
    return new Promise((resolve) => {
      const run = () => {
        this.locked = true;
        resolve(() => {
          this.locked = false;
          const next = this.queue.shift();
          if (next) {
            next();
          }
        });
      };

      if (!this.locked) {
        run();
      } else {
        this.queue.push(run);
      }
    });
  }
}

export const dbMutex = new AsyncMutex();

function generateInitialInventory(): InventoryItem[] {
  const items: InventoryItem[] = [];
  const now = new Date().toISOString();

  // Create initial pool of 10 items for each product in catalog
  ALL_PRODUCTS.forEach((product) => {
    const isApiKey = product.category === 'API';
    const count = 10;

    for (let i = 1; i <= count; i++) {
      const randSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const numPad = i.toString().padStart(2, '0');

      if (isApiKey) {
        items.push({
          id: `inv-${product.id}-${numPad}`,
          productId: product.id,
          productName: product.name,
          type: 'LICENSE_KEY',
          licenseKey: `sk-proj-${product.brand}-${randSuffix}${Date.now().toString().slice(-6)}`,
          loginUrl: 'https://platform.openai.com/api-keys',
          instructions: 'Salin API Secret Key di atas dan masukkan ke environment variable atau Authorization Bearer Header Anda.',
          status: 'AVAILABLE',
          createdAt: now,
        });
      } else {
        const loginUrl =
          product.brand === 'claude'
            ? 'https://claude.ai/login'
            : product.brand === 'chatgpt'
            ? 'https://chatgpt.com/auth/login'
            : product.brand === 'cursor'
            ? 'https://cursor.com/login'
            : product.brand === 'google'
            ? 'https://gemini.google.com/app'
            : 'https://kiro.ai/login';

        items.push({
          id: `inv-${product.id}-${numPad}`,
          productId: product.id,
          productName: product.name,
          type: 'ACCOUNT',
          accountEmail: `user.${product.brand}.${randSuffix.toLowerCase()}@buybits.id`,
          accountPassword: `Pass#${randSuffix}!2026`,
          loginUrl,
          instructions: 'Akun 100% Legal & Private. Anda dapat langsung login dan mengganti password serta mengaktifkan 2FA sendiri.',
          status: 'AVAILABLE',
          createdAt: now,
        });
      }
    }
  });

  return items;
}

export class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = {
      orders: [],
      inventory: [],
      processedWebhooks: [],
    };
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure inventory exists
        if (!this.data.inventory || this.data.inventory.length === 0) {
          this.data.inventory = generateInitialInventory();
          this.saveSync();
        }
      } else {
        this.data = {
          orders: [],
          inventory: generateInitialInventory(),
          processedWebhooks: [],
        };
        this.saveSync();
      }
    } catch (err) {
      console.error('[DB] Failed to load database file, creating fresh in-memory DB', err);
      this.data = {
        orders: [],
        inventory: generateInitialInventory(),
        processedWebhooks: [],
      };
    }
  }

  private saveSync() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DB] Failed to save database file', err);
    }
  }

  // --- Orders ---
  getOrders(): Order[] {
    return this.data.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.data.orders.find((o) => o.id === id || o.orderNumber === id);
  }

  saveOrder(order: Order): void {
    const idx = this.data.orders.findIndex((o) => o.id === order.id);
    if (idx !== -1) {
      this.data.orders[idx] = order;
    } else {
      this.data.orders.unshift(order);
    }
    this.saveSync();
  }

  // --- Inventory ---
  getInventory(): InventoryItem[] {
    return this.data.inventory;
  }

  getAvailableStockForProduct(productId: string): number {
    return this.data.inventory.filter(
      (item) => item.productId === productId && item.status === 'AVAILABLE'
    ).length;
  }

  addInventoryItems(newItems: InventoryItem[]): void {
    this.data.inventory.push(...newItems);
    this.saveSync();
  }

  updateInventoryItem(item: InventoryItem): void {
    const idx = this.data.inventory.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      this.data.inventory[idx] = item;
      this.saveSync();
    }
  }

  // --- Webhooks Idempotency ---
  isWebhookProcessed(transactionId: string): boolean {
    return this.data.processedWebhooks.some(
      (w) => w.transactionId === transactionId
    );
  }

  recordProcessedWebhook(transactionId: string, orderId: string, amount: number): void {
    this.data.processedWebhooks.push({
      transactionId,
      orderId,
      receivedAt: new Date().toISOString(),
      amount,
    });
    this.saveSync();
  }

  // Reset helper for testing
  resetDb(): void {
    this.data = {
      orders: [],
      inventory: generateInitialInventory(),
      processedWebhooks: [],
    };
    this.saveSync();
  }
}

export const db = new Database();
