import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Package,
  Calendar,
  Send,
  UploadCloud,
  FileImage,
  MessageCircle,
} from 'lucide-react';
import { Order } from '../types';
import { formatIdr } from '../data/products';
import { lookupOrder } from '../services/orderService';
import { useLanguage } from '../context/LanguageContext';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUploadProof?: (order: Order) => void;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
  onOpenUploadProof,
}) => {
  const { language, t } = useLanguage();
  const [orderQuery, setOrderQuery] = useState('');
  const [emailQuery, setEmailQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSearchedOrder(null);

    try {
      // Check local persistent store first
      const local = lookupOrder(orderQuery.trim(), emailQuery.trim());
      if (local) {
        setSearchedOrder(local);
        setIsLoading(false);
        return;
      }

      // Try server lookup
      const url = `/api/orders/${encodeURIComponent(orderQuery.trim())}${
        emailQuery.trim() ? `?email=${encodeURIComponent(emailQuery.trim())}` : ''
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.success && data.order) {
        setSearchedOrder(data.order);
      } else {
        throw new Error(data.error || 'Pesanan tidak ditemukan. Periksa kembali No. Order / Email Anda.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mencari data pesanan.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'FULFILLED':
      case 'PAID':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider font-space">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {status === 'FULFILLED' ? t('order_lookup.status_fulfilled') : t('order_lookup.status_paid')}
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider font-space">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            {t('order_lookup.status_pending')}
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-neutral-600 bg-neutral-200 px-3 py-1 rounded-full uppercase tracking-wider font-space">
            {t('order_lookup.status_expired')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider font-space">
            <AlertCircle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl border border-neutral-200 relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <Package className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-wider font-space">
              {t('order_lookup.badge')}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-tight font-display">
            {t('order_lookup.title')}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            {t('order_lookup.subtitle')}
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleLookup} className="space-y-3 mb-5 bg-neutral-50 p-3.5 sm:p-4 rounded-2xl border border-neutral-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-1 font-space">
                {t('order_lookup.order_id_label')}
              </label>
              <input
                type="text"
                required
                placeholder={t('order_lookup.order_id_placeholder')}
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-neutral-700 uppercase mb-1 font-space">
                {t('order_lookup.email_label')}
              </label>
              <input
                type="email"
                placeholder="email@anda.com"
                value={emailQuery}
                onChange={(e) => setEmailQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm disabled:opacity-50 font-space"
          >
            {isLoading ? (
              <span>{t('order_lookup.btn_searching')}</span>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>{t('order_lookup.btn_search')}</span>
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
          <div className="space-y-4 animate-in fade-in duration-200 max-h-[48vh] overflow-y-auto pr-1">
            <div className="p-4 rounded-2xl bg-[#faf9f5] border border-neutral-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase font-space">
                    {t('order_lookup.invoice_number')}
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
                  <span className="text-[10px] font-bold text-neutral-500 block uppercase font-space">
                    {t('order_lookup.buyer')}
                  </span>
                  <span className="font-bold text-neutral-800">
                    {searchedOrder.customerName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 block uppercase font-space">
                    Email
                  </span>
                  <span className="font-mono text-neutral-800 text-[11px]">
                    {searchedOrder.customerEmail}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 block uppercase font-space">
                    {t('order_lookup.total_paid')}
                  </span>
                  <span className="font-black text-red-600 font-mono">
                    {formatIdr(searchedOrder.finalTotalIdr)}
                  </span>
                </div>
              </div>

              {/* Items Purchased */}
              <div className="pt-2 border-t border-neutral-200">
                <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1.5 font-space">
                  {t('order_lookup.ordered_products')} ({searchedOrder.items.length}):
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

              {/* Upload Proof Call To Action for PENDING Orders */}
              {searchedOrder.status === 'PENDING' && (
                <div className="p-3 bg-red-50/80 border border-red-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <div className="text-left">
                    <span className="text-xs font-black text-red-700 block font-space">
                      {t('order_lookup.already_paid_q')}
                    </span>
                    <span className="text-[11px] text-neutral-600">
                      {t('order_lookup.already_paid_desc')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenUploadProof) {
                        onOpenUploadProof(searchedOrder);
                      }
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer font-space flex-shrink-0"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{t('order_lookup.upload_proof_btn')}</span>
                  </button>
                </div>
              )}

              {/* Uploaded Payment Proof Receipt Preview if exists */}
              {searchedOrder.paymentProof && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-800 uppercase font-space flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {language === 'id' ? 'Bukti Pembayaran Tersimpan:' : 'Saved Payment Receipt:'}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {new Date(searchedOrder.paymentProof.uploadedAt).toLocaleTimeString(language === 'id' ? 'id-ID' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-emerald-100">
                    <img
                      src={searchedOrder.paymentProof.imageUrl}
                      alt="Bukti Transfer"
                      className="w-12 h-12 object-cover rounded-lg border border-neutral-200 flex-shrink-0"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-neutral-900">
                        {language === 'id' ? 'Pengirim:' : 'Sender:'} {searchedOrder.paymentProof.senderName} ({searchedOrder.paymentProof.senderBank})
                      </div>
                      <div className="text-[11px] text-neutral-500 font-mono">
                        {language === 'id' ? 'Nominal:' : 'Amount:'} {formatIdr(searchedOrder.paymentProof.transferAmount || searchedOrder.finalTotalIdr)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Claim Account Section for PAID / FULFILLED Orders */}
            {(searchedOrder.status === 'PAID' || searchedOrder.status === 'FULFILLED') && (
              <div className="p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 text-center flex flex-col items-center shadow-xs space-y-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h4 className="text-sm sm:text-base font-black text-neutral-900 uppercase font-space mb-2">
                  {t('order_lookup.claim_now_title')}
                </h4>
                <a
                  href={`https://wa.me/6285124935573?text=${encodeURIComponent(
                    language === 'id'
                      ? `Halo Admin, saya ingin mengambil akun untuk pesanan #${searchedOrder.orderNumber}.`
                      : `Hello Admin, I would like to claim my account credentials for order #${searchedOrder.orderNumber}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-space"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>{t('order_lookup.claim_whatsapp_btn')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
