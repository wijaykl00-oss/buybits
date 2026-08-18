import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Package,
  Calendar,
  Lock,
} from 'lucide-react';
import { Order } from '../types';
import { formatIdr } from '../data/products';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [orderQuery, setOrderQuery] = useState('');
  const [emailQuery, setEmailQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSearchedOrder(null);

    try {
      const url = `/api/orders/${encodeURIComponent(orderQuery.trim())}${
        emailQuery.trim() ? `?email=${encodeURIComponent(emailQuery.trim())}` : ''
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Pesanan tidak ditemukan. Periksa kembali No. Order / Email Anda.');
      }

      setSearchedOrder(data.order);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mencari data pesanan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'FULFILLED':
      case 'PAID':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {status === 'FULFILLED' ? 'PRODUK DIKIRIM (FULFILLED)' : 'SUDAH DIBAYAR (PAID)'}
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            MENUNGGU PEMBAYARAN
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-neutral-600 bg-neutral-200 px-3 py-1 rounded-full uppercase tracking-wider">
            KEDALUWARSA (EXPIRED)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-neutral-200 relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Package className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Layanan Mandiri Pelanggan
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-tight">
            Lacak Pesanan & Kredensial AI
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Masukkan Nomor Pesanan (Invoice) atau Email Anda untuk mengecek status dan mengambil kredensial akun AI.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleLookup} className="space-y-3 mb-6 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-1">
                Nomor Pesanan / Order ID *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: AIS-123456"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-1">
                Email Pelanggan (Untuk Buka Kredensial)
              </label>
              <input
                type="email"
                placeholder="email@anda.com"
                value={emailQuery}
                onChange={(e) => setEmailQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs disabled:opacity-50"
          >
            {isLoading ? (
              <span>Mencari Data Pesanan...</span>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Cari Status Pesanan</span>
              </>
            )}
          </button>
        </form>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-medium mb-5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Order Details View */}
        {searchedOrder && (
          <div className="space-y-4 animate-in fade-in duration-200 max-h-[50vh] overflow-y-auto pr-1">
            <div className="p-4 rounded-2xl bg-[#faf9f5] border border-neutral-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase">
                    Nomor Invoice
                  </span>
                  <h4 className="text-base font-black text-neutral-900 font-mono">
                    {searchedOrder.orderNumber}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{searchedOrder.createdAt}</span>
                  </div>
                </div>
                <div>{getStatusBadge(searchedOrder.status)}</div>
              </div>

              {/* Customer & Total Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 block uppercase">
                    Pembeli
                  </span>
                  <span className="font-bold text-neutral-800">
                    {searchedOrder.customerName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 block uppercase">
                    Email
                  </span>
                  <span className="font-mono text-neutral-800 text-[11px]">
                    {searchedOrder.customerEmail}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 block uppercase">
                    Total Bayar
                  </span>
                  <span className="font-black text-indigo-700">
                    {formatIdr(searchedOrder.finalTotalIdr)}
                  </span>
                </div>
              </div>

              {/* Items Purchased */}
              <div className="pt-2 border-t border-neutral-200">
                <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1.5">
                  Produk yang Dipesan ({searchedOrder.items.length}):
                </span>
                <div className="space-y-1.5">
                  {searchedOrder.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white p-2 rounded-xl border border-neutral-200 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-black text-neutral-900">
                          {it.product.name}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-medium">
                          x{it.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-neutral-700">
                        {it.product.durationBadge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Credentials / Digital Product Section */}
            {searchedOrder.credentials && searchedOrder.credentials.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-black uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Kredensial Akun Digital AI Anda</span>
                </div>

                {searchedOrder.credentials.map((cred, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border-2 border-emerald-200 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-black text-neutral-900 uppercase">
                        {cred.serviceName}
                      </h5>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Garansi: {cred.expiresAt}
                      </span>
                    </div>

                    {cred.licenseKey ? (
                      <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 space-y-1">
                        <span className="text-[10px] font-bold text-neutral-500 block uppercase">
                          API Secret Key:
                        </span>
                        <div className="flex items-center justify-between gap-2 font-mono text-[11px] font-bold text-neutral-900">
                          <span className="break-all">{cred.licenseKey}</span>
                          <button
                            onClick={() => handleCopy(cred.licenseKey!, `key-${idx}`)}
                            className="p-1 rounded bg-white hover:bg-neutral-200 text-neutral-700 flex-shrink-0"
                          >
                            {copiedKey === `key-${idx}` ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                          <span className="text-[10px] font-bold text-neutral-500 block uppercase">
                            Email Login:
                          </span>
                          <div className="flex items-center justify-between gap-2 font-mono font-bold text-neutral-900 mt-0.5">
                            <span>{cred.accountEmail}</span>
                            <button
                              onClick={() => handleCopy(cred.accountEmail || '', `mail-${idx}`)}
                              className="p-1 rounded hover:bg-neutral-200 text-neutral-600"
                            >
                              {copiedKey === `mail-${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                          <span className="text-[10px] font-bold text-neutral-500 block uppercase">
                            Password:
                          </span>
                          <div className="flex items-center justify-between gap-2 font-mono font-bold text-neutral-900 mt-0.5">
                            <span>{cred.accountPassword}</span>
                            <button
                              onClick={() => handleCopy(cred.accountPassword || '', `pass-${idx}`)}
                              className="p-1 rounded hover:bg-neutral-200 text-neutral-600"
                            >
                              {copiedKey === `pass-${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[10px] text-neutral-500">
                        ℹ️ {cred.instructions}
                      </p>
                      {cred.loginUrl && (
                        <a
                          href={cred.loginUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:underline flex-shrink-0"
                        >
                          <span>Buka Login</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              searchedOrder.status === 'PENDING' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-center gap-2">
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Kredensial produk digital akan otomatis tampil di sini segera setelah pembayaran Dynamic QRIS berhasil diverifikasi.
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
