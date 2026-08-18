import { db } from '../server/db.js';
import { fulfillOrderAtomically, validateStockForCheckout } from '../server/inventory.js';
import { generateDynamicQRIS, calculateCRC16 } from '../server/qris.js';
import { ALL_PRODUCTS, convertUsdToIdr } from '../src/data/products.js';
import { Order } from '../src/types.js';

async function runTests() {
  console.log('\n=============================================');
  console.log('🚀 MEMULAI PENGUJIAN SISTEM DYNAMIC QRIS & INVENTORY');
  console.log('=============================================\n');

  let passedTests = 0;
  let failedTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${detail || 'Condition false'}`);
      failedTests++;
    }
  }

  // Reset database to initial fresh state
  db.resetDb();

  // ----------------------------------------------------
  // TEST 1: Dynamic QRIS Generation & CRC16 Validity
  // ----------------------------------------------------
  console.log('\n--- TEST 1: Dynamic QRIS Generation ---');
  const amount = 178000;
  const qris = generateDynamicQRIS({
    amount,
    orderId: 'AIS-998811',
    merchantName: 'BUYBITS ID OFFICIAL',
  });

  assert(qris.startsWith('000201010212'), 'QRIS starts with EMVCo Dynamic format (010212)');
  assert(qris.includes('5406178000') || qris.includes('5406' + amount.toString()), 'QRIS contains exact transaction amount Tag 54');
  assert(qris.includes('5303360'), 'QRIS specifies Currency IDR 360 Tag 53');
  assert(qris.includes('5802ID'), 'QRIS specifies Country ID Tag 58');

  // Verify CRC16 matches
  const payloadWithoutChecksum = qris.slice(0, -4);
  const expectedChecksum = calculateCRC16(payloadWithoutChecksum);
  const actualChecksum = qris.slice(-4);
  assert(expectedChecksum === actualChecksum, `CRC16 Checksum is mathematically valid (${actualChecksum})`);

  // ----------------------------------------------------
  // TEST 2: Flow Pembayaran Berhasil (PENDING -> PAID -> FULFILLED)
  // ----------------------------------------------------
  console.log('\n--- TEST 2: Successful Payment & Auto-Fulfillment ---');
  const productA = ALL_PRODUCTS[0]; // e.g. Gemini Pro
  const initialStockA = db.getAvailableStockForProduct(productA.id);

  const testOrder1: Order = {
    id: `ord-test-1-${Date.now()}`,
    orderNumber: 'AIS-100001',
    createdAt: new Date().toISOString(),
    customerName: 'Budi Santoso',
    customerEmail: 'budi@example.com',
    items: [
      {
        product: productA,
        quantity: 1,
        isFlashSale: false,
        finalPriceUsd: productA.priceUsd,
      },
    ],
    totalUsd: productA.priceUsd,
    totalIdr: convertUsdToIdr(productA.priceUsd),
    exchangeRate: 13948,
    uniqueCode: 123,
    finalTotalIdr: convertUsdToIdr(productA.priceUsd) + 123,
    paymentMethod: 'Dynamic QRIS Realtime',
    status: 'PENDING',
  };

  db.saveOrder(testOrder1);
  assert(db.getOrderById(testOrder1.id)?.status === 'PENDING', 'Order created with PENDING status');

  // Webhook executes payment fulfillment
  const fulfillResult1 = await fulfillOrderAtomically(testOrder1.id, 'tx_gateway_001');
  assert(fulfillResult1.success === true, 'Fulfillment executed successfully');
  assert(fulfillResult1.order?.status === 'FULFILLED', 'Order status updated to FULFILLED');
  assert(
    fulfillResult1.assignedCredentials?.length === 1 &&
      Boolean(fulfillResult1.assignedCredentials[0].accountEmail || fulfillResult1.assignedCredentials[0].licenseKey),
    'Digital credentials properly assigned to customer'
  );

  const finalStockA = db.getAvailableStockForProduct(productA.id);
  assert(finalStockA === initialStockA - 1, 'Stock properly decremented by 1');

  // ----------------------------------------------------
  // TEST 3: Duplicate Webhook Idempotency (Anti Double Delivery)
  // ----------------------------------------------------
  console.log('\n--- TEST 3: Duplicate Webhook Idempotency ---');
  db.recordProcessedWebhook('tx_gateway_001', testOrder1.id, testOrder1.finalTotalIdr);

  const isDuplicate = db.isWebhookProcessed('tx_gateway_001');
  assert(isDuplicate === true, 'Webhook transaction is marked as processed');

  // Re-attempt fulfillment with same order & transaction
  const fulfillResultDuplicate = await fulfillOrderAtomically(testOrder1.id, 'tx_gateway_001');
  assert(fulfillResultDuplicate.success === true, 'Idempotent fulfillment returns success without error');
  const finalStockAfterDup = db.getAvailableStockForProduct(productA.id);
  assert(finalStockAfterDup === finalStockA, 'Stock NOT decremented a second time on duplicate webhook');

  // ----------------------------------------------------
  // TEST 4: Stock Exhaustion Protection
  // ----------------------------------------------------
  console.log('\n--- TEST 4: Out of Stock Protection ---');
  const targetProduct = ALL_PRODUCTS[1];
  // Drain stock of targetProduct
  const availableItems = db.getInventory().filter((i) => i.productId === targetProduct.id && i.status === 'AVAILABLE');
  for (const item of availableItems) {
    item.status = 'SOLD';
    db.updateInventoryItem(item);
  }

  assert(db.getAvailableStockForProduct(targetProduct.id) === 0, 'Target product stock intentionally drained to 0');

  const stockCheck = await validateStockForCheckout([{ productId: targetProduct.id, quantity: 1 }]);
  assert(stockCheck.valid === false, 'Checkout rejected when stock is 0');
  assert(stockCheck.outOfStockProducts.includes(targetProduct.name), 'Out of stock product identified in rejection');

  // ----------------------------------------------------
  // TEST 5: Race Condition / Concurrent Checkouts
  // ----------------------------------------------------
  console.log('\n--- TEST 5: Race Condition & Mutex Protection ---');
  // Add exactly 1 item for test product
  const raceProduct = ALL_PRODUCTS[2];
  // Clear existing items for raceProduct
  const existingRaceItems = db.getInventory().filter((i) => i.productId === raceProduct.id);
  existingRaceItems.forEach((i) => {
    i.status = 'SOLD';
    db.updateInventoryItem(i);
  });

  // Add exactly 1 fresh item
  db.addInventoryItems([
    {
      id: `inv-race-single-1`,
      productId: raceProduct.id,
      productName: raceProduct.name,
      type: 'ACCOUNT',
      accountEmail: 'winner@buybits.id',
      accountPassword: 'WinnerPassword123',
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
    },
  ]);

  assert(db.getAvailableStockForProduct(raceProduct.id) === 1, 'Stock is exactly 1 before race');

  // Create two simultaneous orders for the same single item
  const orderA: Order = {
    id: `ord-race-a-${Date.now()}`,
    orderNumber: 'AIS-RACE-A',
    createdAt: new Date().toISOString(),
    customerName: 'Buyer A',
    customerEmail: 'buyer_a@example.com',
    items: [{ product: raceProduct, quantity: 1, isFlashSale: false, finalPriceUsd: 10 }],
    totalUsd: 10,
    totalIdr: 140000,
    exchangeRate: 14000,
    uniqueCode: 101,
    finalTotalIdr: 140101,
    paymentMethod: 'Dynamic QRIS',
    status: 'PENDING',
  };

  const orderB: Order = {
    id: `ord-race-b-${Date.now()}`,
    orderNumber: 'AIS-RACE-B',
    createdAt: new Date().toISOString(),
    customerName: 'Buyer B',
    customerEmail: 'buyer_b@example.com',
    items: [{ product: raceProduct, quantity: 1, isFlashSale: false, finalPriceUsd: 10 }],
    totalUsd: 10,
    totalIdr: 140000,
    exchangeRate: 14000,
    uniqueCode: 102,
    finalTotalIdr: 140102,
    paymentMethod: 'Dynamic QRIS',
    status: 'PENDING',
  };

  db.saveOrder(orderA);
  db.saveOrder(orderB);

  // Fire simultaneous payment fulfillment for both orders
  const [resA, resB] = await Promise.all([
    fulfillOrderAtomically(orderA.id, 'tx_race_a'),
    fulfillOrderAtomically(orderB.id, 'tx_race_b'),
  ]);

  const oneSuccess = (resA.success && !resB.success) || (!resA.success && resB.success);
  assert(oneSuccess, 'Exactly one buyer successfully fulfilled; the other rejected due to zero stock');
  assert(db.getAvailableStockForProduct(raceProduct.id) === 0, 'Final stock is 0 (no negative stock, no double sell)');

  // ----------------------------------------------------
  // TEST 6: Payment Failed & Expired Order Handling
  // ----------------------------------------------------
  console.log('\n--- TEST 6: Payment Expired & Failed Order Handling ---');
  const expiredOrder: Order = {
    id: `ord-expired-${Date.now()}`,
    orderNumber: 'AIS-EXP',
    createdAt: new Date().toISOString(),
    customerName: 'Buyer Expired',
    customerEmail: 'expired@example.com',
    items: [{ product: ALL_PRODUCTS[3], quantity: 1, isFlashSale: false, finalPriceUsd: 10 }],
    totalUsd: 10,
    totalIdr: 140000,
    exchangeRate: 14000,
    uniqueCode: 555,
    finalTotalIdr: 140555,
    paymentMethod: 'Dynamic QRIS',
    status: 'EXPIRED',
  };
  db.saveOrder(expiredOrder);

  const fulfillExpired = await fulfillOrderAtomically(expiredOrder.id, 'tx_exp');
  assert(fulfillExpired.success === false, 'Cannot fulfill order in EXPIRED status');

  console.log('\n=============================================');
  console.log(`📊 HASIL PENGUJIAN: ${passedTests} BERHASIL, ${failedTests} GAGAL`);
  console.log('=============================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
