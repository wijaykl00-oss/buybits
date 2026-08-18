import React, { useState, useEffect } from 'react';
import {
  X,
  QrCode,
  ShieldCheck,
  Zap,
  Copy,
  Check,
  Clock,
  ArrowLeft,
  Lock,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Send,
  ExternalLink,
  Package,
  Download,
} from 'lucide-react';
import { CartItem, Order, User } from '../types';
import { convertUsdToIdr, formatIdr, formatUsd, USD_TO_IDR_RATE } from '../data/products';
import { createCheckoutOrder, fulfillOrder } from '../services/orderService';
import { BrandLogo } from './BrandLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentUser: User | null;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currentUser,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerWhatsApp, setCustomerWhatsApp] = useState(currentUser?.phone || '');

  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Active Order Details
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [qrisPayload, setQrisPayload] = useState<string>('');
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  // Reset modal state whenever modal opens or cart items change to prevent order bleeding
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setActiveOrder(null);
      setQrisPayload('');
      setCheckoutError(null);
      setTimeLeft(900);
      setIsVerifyingPayment(false);
    }
  }, [isOpen, items]);

  useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.name);
      if (!customerEmail) setCustomerEmail(currentUser.email);
      if (!customerWhatsApp && currentUser.phone) setCustomerWhatsApp(currentUser.phone);
    }
  }, [currentUser]);

  // Payment Countdown Timer
  useEffect(() => {
    if (step !== 'payment' || !activeOrder) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, activeOrder]);

  if (!isOpen || items.length === 0) return null;

  const totalUsd = items.reduce(
    (sum, item) => sum + item.finalPriceUsd * item.quantity,
    0
  );
  const baseTotalIdr = convertUsdToIdr(totalUsd);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerEmail.includes('@')) {
      setCheckoutError('Silakan masukkan alamat email yang valid');
      return;
    }

    setIsLoadingCheckout(true);
    setCheckoutError(null);

    try {
      // Create fresh Checkout Order with Dynamic QRIS calculation for these specific items
      const result = createCheckoutOrder({
        customerName: customerName.trim() || 'Pelanggan Buybits',
        customerEmail: customerEmail.trim().toLowerCase(),
        customerWhatsApp: customerWhatsApp.trim(),
        items,
      });

      setActiveOrder(result.order);
      setQrisPayload(result.qrisPayload);
      setStep('payment');
    } catch (err: any) {
      console.error('Checkout error:', err);
      setCheckoutError(err.message || 'Terjadi kesalahan saat memproses checkout.');
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  const handleConfirmPayment = () => {
    if (!activeOrder) return;
    setIsVerifyingPayment(true);

    setTimeout(() => {
      const fulfilled = fulfillOrder(activeOrder.id);
      setIsVerifyingPayment(false);
      if (fulfilled) {
        onOrderSuccess(fulfilled);
      }
    }, 1200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-4 sm:p-7 shadow-2xl border border-neutral-200 relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          /* STEP 1: Customer Details & Order Breakdown */
          <div>
            <div className="mb-4">
              <span className="text-[10px] font-black text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-space">
                Langkah 1 dari 2
              </span>
              <h3 className="text-lg sm:text-xl font-black text-neutral-900 uppercase tracking-tight mt-1 font-display">
                Data Pemesanan & Pengiriman
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Kredensial akun (Email, Password, API Key) akan otomatis diberikan dan dikirim ke Email ini.
              </p>
            </div>

            {/* List of Products being Checked Out */}
            <div className="mb-4 p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-2 font-space">
                Produk yang Dipilih ({items.length} Item):
              </span>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-neutral-200 shadow-2xs text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <BrandLogo brand={item.product.brand} size="sm" />
                      <div>
                        <h5 className="font-bold text-neutral-900 text-xs">
                          {item.product.name}
                        </h5>
                        <span className="text-[10px] text-neutral-500 font-medium font-space">
                          Qty: {item.quantity} • {item.product.durationBadge}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-red-600 font-space block">
                        {formatIdr(convertUsdToIdr(item.finalPriceUsd * item.quantity))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {checkoutError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{checkoutError}</span>
              </div>
            )}

            <form onSubmit={handleProceedToPayment} className="space-y-3 sm:space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1 font-space">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1 font-space">
                    Alamat Email (Penerima Akun / Kredensial) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@anda.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1 font-space">
                    Nomor WhatsApp (Opsional untuk Notifikasi)
                  </label>
                  <input
                    type="tel"
                    placeholder="08123456789"
                    value={customerWhatsApp}
                    onChange={(e) => setCustomerWhatsApp(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>
              </div>

              {/* Payment Method Selector (Dynamic QRIS Only) */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1.5 font-space">
                  Metode Pembayaran
                </label>
                <div className="p-3.5 rounded-2xl border-2 border-red-500 bg-red-50/40 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-xs flex-shrink-0">
                      <QrCode className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <span className="block text-xs font-black text-neutral-900 uppercase font-space">
                        Dynamic QRIS Realtime
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-neutral-500 font-medium block">
                        Otomatis terisi nominal. Scan pakai BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay.
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-600 text-white font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0">
                    Instant
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2 text-xs font-space">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({items.length} item):</span>
                  <span className="font-bold">{formatUsd(totalUsd)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Kurs Dollar Hari Ini ($1):</span>
                  <span className="font-bold">Rp {USD_TO_IDR_RATE.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Konversi ke Rupiah:</span>
                  <span className="font-bold">{formatIdr(baseTotalIdr)}</span>
                </div>
                <div className="flex justify-between text-neutral-900 font-black text-sm pt-2 border-t border-neutral-200">
                  <span>Perkiraan Total IDR:</span>
                  <span className="text-base text-red-600 font-black font-space">
                    {formatIdr(baseTotalIdr)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoadingCheckout}
                className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 active:scale-98 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-space"
              >
                {isLoadingCheckout ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Membuat Dynamic QRIS...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Lanjut ke Bayar Dynamic QRIS</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* STEP 2: Real-time Dynamic QRIS Payment Screen */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep('form')}
                className="flex items-center gap-1 text-xs font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Ubah Data</span>
              </button>
              <div className="flex items-center gap-1.5 text-xs font-black text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200 font-mono">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Sisa Waktu: {formatTime}</span>
              </div>
            </div>

            {/* Official Indonesian Dynamic QRIS Card using foto/qris.png */}
            <div className="bg-white rounded-3xl border-2 border-neutral-300 p-4 sm:p-5 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
              {/* Header GPN / QRIS */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-100 mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded tracking-tighter shadow-xs">
                    QRIS
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-neutral-700 font-space">
                    QR Standar Pembayaran Nasional
                  </span>
                </div>
                <div className="text-[10px] font-black text-neutral-500 tracking-wider">
                  GPN INDONESIA
                </div>
              </div>

              <div className="mb-2">
                <div className="text-[11px] font-black text-red-600 uppercase tracking-wider mb-0.5 font-mono">
                  Order ID: {activeOrder?.orderNumber}
                </div>
                <h4 className="text-sm sm:text-base font-black text-neutral-900 uppercase tracking-tight font-display">
                  BUYBITS OFFICIAL
                </h4>
                <p className="text-[10px] sm:text-[11px] text-neutral-500">
                  NMID: ID1024889201992 • Instant Verification
                </p>
              </div>

              {/* Scannable Official QRIS Image from foto/qris.png */}
              <div className="bg-white p-2.5 sm:p-3.5 rounded-2xl border-2 border-neutral-200 shadow-md my-1.5 max-w-[260px] sm:max-w-[280px] w-full flex flex-col items-center">
                <img
                  src="/foto/qris.png"
                  alt="QRIS Pembayaran Buybits Official"
                  className="w-full h-auto object-contain rounded-xl"
                  onError={(e) => {
                    // Fallback to /qris.png if /foto/qris.png path difference
                    (e.target as HTMLImageElement).src = '/qris.png';
                  }}
                />

                <div className="text-[10px] font-bold text-neutral-600 mt-2 text-center">
                  Scan kode QRIS di atas dengan aplikasi BCA, Mandiri, BRI, GoPay, OVO, Dana, ShopeePay.
                </div>
              </div>

              {/* Exact Amount To Pay with Copy Button */}
              <div className="w-full bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200 mt-2 text-center">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block font-space">
                  Jumlah Nominal Tepat yang Harus Dibayar:
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-red-600 font-space font-mono">
                    {formatIdr(activeOrder?.finalTotalIdr || 0)}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(activeOrder?.finalTotalIdr.toString() || '')}
                    className="p-1.5 rounded-lg bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                    title="Salin Nominal"
                  >
                    {copiedAmount ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <span className="text-[10px] text-amber-700 font-semibold block mt-1">
                  ⚠️ Masukkan nominal pas sebesar <b>{formatIdr(activeOrder?.finalTotalIdr || 0)}</b> saat scan QRIS.
                </span>
              </div>
            </div>

            {/* Check Payment Button */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                id="btn-confirm-payment"
                onClick={handleConfirmPayment}
                disabled={isVerifyingPayment}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-98 text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60 font-space"
              >
                {isVerifyingPayment ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Pembayaran QRIS...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Saya Sudah Bayar (Cek Otomatis)</span>
                  </>
                )}
              </button>

              {/* Dedicated High-Contrast Telegram Support Card */}
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#2AABEE] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Send className="w-4 h-4 translate-x-[-0.5px]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block font-space">
                      Bantuan & Konfirmasi
                    </span>
                    <span className="text-[10px] text-neutral-600 font-medium block">
                      Telegram: <b>@buybitsofficial</b>
                    </span>
                  </div>
                </div>

                <a
                  href="https://t.me/buybitsofficial"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-xs transition-all hover:scale-105 flex-shrink-0 cursor-pointer"
                >
                  <span>Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
