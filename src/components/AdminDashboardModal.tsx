import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Package,
  Layers,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  RefreshCw,
  Search,
  Key,
  Database,
  Send,
  Sliders,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { Order, InventoryItem, Product } from '../types';
import { ALL_PRODUCTS, formatIdr } from '../data/products';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'ORDERS' | 'INVENTORY' | 'SIMULATOR'>('ORDERS');
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [inventorySummary, setInventorySummary] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchOrder, setSearchOrder] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');

  // Add Inventory State
  const [selectedProductId, setSelectedProductId] = useState<string>(ALL_PRODUCTS[0]?.id || '');
  const [itemType, setItemType] = useState<'ACCOUNT' | 'LICENSE_KEY'>('ACCOUNT');
  const [rawText, setRawText] = useState('');
  const [addSuccessMessage, setAddSuccessMessage] = useState<string | null>(null);

  // Simulator State
  const [simOrderId, setSimOrderId] = useState('');
  const [simAction, setSimAction] = useState<'PAY_AND_FULFILL' | 'EXPIRE' | 'FAIL'>('PAY_AND_FULFILL');
  const [simResult, setSimResult] = useState<any>(null);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, invRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/inventory'),
      ]);

      if (ordersRes.ok) {
        const oData = await ordersRes.json();
        if (oData.success) setOrders(oData.orders);
      }

      if (invRes.ok) {
        const iData = await invRes.json();
        if (iData.success) {
          setInventory(iData.inventory);
          setInventorySummary(iData.summary);
        }
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddInventory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    try {
      const res = await fetch('/api/admin/inventory/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProductId,
          rawText,
          itemType,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAddSuccessMessage(`Berhasil menambahkan ${data.addedCount} item ke inventory.`);
        setRawText('');
        fetchAdminData();
        setTimeout(() => setAddSuccessMessage(null), 3000);
      } else {
        alert(data.error || 'Gagal menambahkan inventory');
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleRunSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simOrderId) return;

    try {
      const res = await fetch('/api/admin/simulate-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: simOrderId,
          action: simAction,
        }),
      });

      const data = await res.json();
      setSimResult(data);
      fetchAdminData();
    } catch (err: any) {
      setSimResult({ success: false, error: err.message });
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderStatusFilter === 'ALL' || o.status === orderStatusFilter;
    const matchesSearch =
      !searchOrder ||
      o.orderNumber.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchOrder.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl border border-neutral-200 relative my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Store Administrator
              </span>
              <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">
                Control Panel Buybits
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAdminData}
              className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-700 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-neutral-100">
          <button
            onClick={() => setActiveTab('ORDERS')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'ORDERS'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Daftar Pesanan ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('INVENTORY')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'INVENTORY'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Inventory Digital ({inventory.filter((i) => i.status === 'AVAILABLE').length} Ready)</span>
          </button>

          <button
            onClick={() => setActiveTab('SIMULATOR')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'SIMULATOR'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>Webhook Simulator</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'ORDERS' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Cari No. Order / Email..."
                  value={searchOrder}
                  onChange={(e) => setSearchOrder(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {['ALL', 'PENDING', 'FULFILLED', 'PAID', 'EXPIRED', 'FAILED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors ${
                      orderStatusFilter === st
                        ? 'bg-indigo-600 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 font-black text-neutral-600 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Produk</th>
                      <th className="p-3">Total IDR</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Waktu</th>
                      <th className="p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-neutral-400 font-medium">
                          Belum ada transaksi ditemukan.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="p-3 font-mono font-bold text-neutral-900">
                            {order.orderNumber}
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-neutral-900">{order.customerName}</div>
                            <div className="text-[10px] text-neutral-500 font-mono">
                              {order.customerEmail}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-neutral-800">
                              {order.items.map((it) => it.product.name).join(', ')}
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              {order.items.reduce((sum, it) => sum + it.quantity, 0)} item
                            </div>
                          </td>
                          <td className="p-3 font-mono font-black text-indigo-700">
                            {formatIdr(order.finalTotalIdr)}
                          </td>
                          <td className="p-3">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                order.status === 'FULFILLED' || order.status === 'PAID'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : order.status === 'PENDING'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-neutral-100 text-neutral-600'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="p-3 text-[10px] text-neutral-500 whitespace-nowrap">
                            {order.createdAt}
                          </td>
                          <td className="p-3">
                            {order.status === 'PENDING' && (
                              <button
                                onClick={() => {
                                  setSimOrderId(order.id);
                                  setActiveTab('SIMULATOR');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                              >
                                Test Bayar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY */}
        {activeTab === 'INVENTORY' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-5">
            {/* Add Inventory Form */}
            <div className="bg-[#faf9f5] rounded-2xl p-4 border border-neutral-200 space-y-3">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-black uppercase text-neutral-900 tracking-wide">
                  Tambah Stok Kredensial Digital AI
                </h4>
              </div>

              {addSuccessMessage && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold">
                  ✅ {addSuccessMessage}
                </div>
              )}

              <form onSubmit={handleAddInventory} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                      Pilih Produk AI
                    </label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                    >
                      {ALL_PRODUCTS.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name} ({prod.durationBadge}) - {prod.category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                      Tipe Kredensial
                    </label>
                    <select
                      value={itemType}
                      onChange={(e) => setItemType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                    >
                      <option value="ACCOUNT">Akun (Email & Password)</option>
                      <option value="LICENSE_KEY">License Key / API Secret Key</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                    Kredensial (Bisa Masukkan Banyak Baris Sekaligus)
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={
                      itemType === 'ACCOUNT'
                        ? 'email1@gmail.com:Password123\nemail2@gmail.com:Password456'
                        : 'sk-proj-abc123xyz456\nsk-proj-def789uvw012'
                    }
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-[10px] text-neutral-500 block mt-0.5">
                    Format Akun: <code>email:password</code> atau <code>email|password</code> per baris.
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer shadow-xs transition-colors"
                >
                  Simpan Stok ke Database
                </button>
              </form>
            </div>

            {/* Stock Summary Table */}
            <div>
              <h4 className="text-xs font-black uppercase text-neutral-900 tracking-wide mb-2">
                Ringkasan Stok Ready vs Terjual
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {inventorySummary.slice(0, 8).map((sum) => (
                  <div key={sum.productId} className="bg-white p-3 rounded-xl border border-neutral-200 text-xs">
                    <div className="font-black text-neutral-900 truncate">{sum.productName}</div>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className="text-emerald-700 font-bold">{sum.availableStock} Ready</span>
                      <span className="text-neutral-500">{sum.soldCount} Terjual</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WEBHOOK SIMULATOR */}
        {activeTab === 'SIMULATOR' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-xs text-indigo-900 space-y-1">
              <div className="flex items-center gap-2 font-black uppercase tracking-wider">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>Alat Pengujian Pembayaran & Webhook Callback</span>
              </div>
              <p className="text-neutral-600">
                Gunakan simulator ini untuk memicu event pembayaran Gateway (Midtrans/Tripay/Pakasir/Bank Indonesia QRIS) secara instan guna menguji flow otomatisasi:
                <strong> PENDING &rarr; PAID &rarr; FULFILLED</strong> dan pengalokasian kredensial.
              </p>
            </div>

            <form onSubmit={handleRunSimulation} className="bg-white p-4 rounded-2xl border border-neutral-200 space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                  Pilih Pesanan (Order ID)
                </label>
                <select
                  value={simOrderId}
                  onChange={(e) => setSimOrderId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                >
                  <option value="">-- Pilih Order yang Sedang PENDING --</option>
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.orderNumber} - {o.customerName} ({formatIdr(o.finalTotalIdr)}) - [{o.status}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-600 uppercase mb-1">
                  Event Gateway
                </label>
                <select
                  value={simAction}
                  onChange={(e) => setSimAction(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option value="PAY_AND_FULFILL">✅ Simulasi Pembayaran Sukses (PAID & FULFILLED)</option>
                  <option value="EXPIRE">⏳ Simulasi QRIS Expired / Timeout</option>
                  <option value="FAIL">❌ Simulasi Pembayaran Gagal / Dibatalkan</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Webhook Simulasi ke Server</span>
              </button>
            </form>

            {/* Simulation Result Preview */}
            {simResult && (
              <div className="bg-neutral-900 text-neutral-100 p-4 rounded-2xl font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-neutral-400 pb-1 border-b border-neutral-800 text-[10px]">
                  <span>SERVER RESPONSE:</span>
                  <span className={simResult.success ? 'text-emerald-400' : 'text-rose-400'}>
                    {simResult.success ? 'HTTP 200 OK' : 'ERROR'}
                  </span>
                </div>
                <pre className="overflow-x-auto text-[11px]">
                  {JSON.stringify(simResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
