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
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CartItem, Order, User } from '../types';
import { convertUsdToIdr, formatIdr, formatUsd, USD_TO_IDR_RATE } from '../data/products';

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

  // Active Order Details from Server
  const [serverOrder, setServerOrder] = useState<Order | null>(null);
  const [qrisPayload, setQrisPayload] = useState<string>('');
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedQris, setCopiedQris] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.name);
      if (!customerEmail) setCustomerEmail(currentUser.email);
      if (!customerWhatsApp && currentUser.phone) setCustomerWhatsApp(currentUser.phone);
    }
  }, [currentUser]);

  // Payment Countdown Timer
  useEffect(() => {
    if (step !== 'payment' || !serverOrder) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, serverOrder]);

  // Real-time Polling for Payment Webhook Confirmation
  useEffect(() => {
    if (step !== 'payment' || !serverOrder || serverOrder.status === 'FULFILLED') return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${serverOrder.id}?email=${encodeURIComponent(customerEmail)}`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.success && (data.order.status === 'FULFILLED' || data.order.status === 'PAID')) {
          clearInterval(pollInterval);
          onOrderSuccess(data.order);
        }
      } catch (err) {
        // Safe polling ignore
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [step, serverOrder, customerEmail, onOrderSuccess]);

  if (!isOpen || items.length === 0) return null;

  const totalUsd = items.reduce(
    (sum, item) => sum + item.finalPriceUsd * item.quantity,
    0
  );
  const baseTotalIdr = convertUsdToIdr(totalUsd);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerEmail.includes('@')) {
      setCheckoutError('Silakan masukkan alamat email yang valid');
      return;
    }

    setIsLoadingCheckout(true);
    setCheckoutError(null);

    try {
      // Call Server Checkout API with price validation and stock lock
      const response = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim() || 'Pelanggan Buybits',
          customerEmail: customerEmail.trim().toLowerCase(),
          customerWhatsApp: customerWhatsApp.trim(),
          items: items.map((it) => ({
            productId: it.product.id,
            quantity: it.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gagal memproses checkout server');
      }

      setServerOrder(data.order);
      setQrisPayload(data.qrisPayload);
      setStep('payment');
    } catch (err: any) {
      console.error('Checkout error:', err);
      setCheckoutError(err.message || 'Terjadi kesalahan saat memproses checkout. Silakan coba lagi.');
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  const handleSimulatePaymentWebhook = async () => {
    if (!serverOrder) return;
    setIsVerifyingPayment(true);

    try {
      // Call backend payment webhook simulator endpoint
      const response = await fetch('/api/admin/simulate-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: serverOrder.id,
          action: 'PAY_AND_FULFILL',
        }),
      });

      const data = await response.json();
      if (data.success && data.order) {
        setIsVerifyingPayment(false);
        onOrderSuccess(data.order);
      } else {
        throw new Error(data.error || 'Simulasi pembayaran gagal');
      }
    } catch (err: any) {
      console.error('Simulation error:', err);
      setIsVerifyingPayment(false);
      alert('Gagal memverifikasi: ' + err.message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const copyQrisPayload = () => {
    if (!qrisPayload) return;
    navigator.clipboard.writeText(qrisPayload);
    setCopiedQris(true);
    setTimeout(() => setCopiedQris(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-neutral-200 relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          /* STEP 1: Customer Details & Order Breakdown */
          <div>
            <div className="mb-5">
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Langkah 1 dari 2
              </span>
              <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight mt-1">
                Data Pemesanan & Pengiriman
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Kredensial akun (Email, Password, API Key) akan otomatis diberikan dan dikirim ke Email ini.
              </p>
            </div>

            {checkoutError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-medium">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{checkoutError}</span>
              </div>
            )}

            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Alamat Email (Penerima Akun / Kredensial) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@anda.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Nomor WhatsApp (Opsional untuk Notifikasi)
                  </label>
                  <input
                    type="tel"
                    placeholder="08123456789"
                    value={customerWhatsApp}
                    onChange={(e) => setCustomerWhatsApp(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
                  />
                </div>
              </div>

              {/* Payment Method Selector (Dynamic QRIS Only) */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1.5">
                  Metode Pembayaran
                </label>
                <div className="p-3.5 rounded-2xl border border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
                      <QrCode className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <span className="block text-xs font-black text-neutral-900 uppercase">
                        Dynamic QRIS Realtime
                      </span>
                      <span className="text-[11px] text-neutral-500 font-medium">
                        Otomatis terisi nominal. Scan pakai BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay.
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500 text-white font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Instant
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2 text-xs">
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
                  <span className="text-base text-indigo-700">
                    {formatIdr(baseTotalIdr)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoadingCheckout}
                className="w-full py-3.5 rounded-full bg-[#1c1d22] hover:bg-neutral-900 active:scale-98 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoadingCheckout ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>Membuat Dynamic QRIS Server...</span>
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
              <div className="flex items-center gap-1.5 text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Sisa Waktu: {formatTime}</span>
              </div>
            </div>

            {/* Official Indonesian Dynamic QRIS Card */}
            <div className="bg-white rounded-3xl border-2 border-neutral-300 p-5 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
              {/* Header GPN / QRIS */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded tracking-tighter shadow-xs">
                    QRIS
                  </div>
                  <span className="text-[10px] font-bold text-neutral-700">
                    QR Standar Pembayaran Nasional (Dynamic)
                  </span>
                </div>
                <div className="text-[10px] font-black text-neutral-500 tracking-wider">
                  GPN INDONESIA
                </div>
              </div>

              <div className="mb-2">
                <div className="text-[11px] font-black text-indigo-600 uppercase tracking-wider mb-0.5">
                  Order ID: {serverOrder?.orderNumber}
                </div>
                <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight">
                  BUYBITS ID OFFICIAL
                </h4>
                <p className="text-[11px] text-neutral-500">
                  NMID: ID1024889201992 • Instant Realtime Verification
                </p>
              </div>

              {/* Dynamic QR Code Vector Rendered from Payload */}
              <div className="bg-white p-3 rounded-2xl border border-neutral-200 shadow-md my-2 relative max-w-xs flex flex-col items-center">
                {qrisPayload ? (
                  <div className="p-2 bg-white rounded-xl">
                    <QRCodeSVG
                      value={qrisPayload}
                      size={210}
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                ) : (
                  <div className="w-52 h-52 flex items-center justify-center bg-neutral-100 rounded-xl">
                    <RefreshCw className="w-6 h-6 animate-spin text-neutral-400" />
                  </div>
                )}

                <div className="text-[10px] font-bold text-neutral-500 mt-2">
                  Buka aplikasi M-Banking atau E-Wallet apa saja dan arahkan kamera ke kode QR di atas.
                </div>
              </div>

              {/* Exact Amount To Pay with Copy Button */}
              <div className="w-full bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200 mt-2 text-center">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                  Jumlah Nominal Tepat yang Harus Dibayar:
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-2xl font-black text-indigo-700 font-mono">
                    {formatIdr(serverOrder?.finalTotalIdr || 0)}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(serverOrder?.finalTotalIdr.toString() || '')}
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
                  ⚠️ Nominal sudah diatur otomatis oleh Dynamic QRIS.
                </span>
              </div>
            </div>

            {/* Check Payment & Webhook Simulation Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                id="btn-confirm-payment"
                onClick={handleSimulatePaymentWebhook}
                disabled={isVerifyingPayment}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-98 text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
              >
                {isVerifyingPayment ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Pembayaran QRIS...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Saya Sudah Bayar (Cek Otomatis / Simulasi Webhook)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Mendengarkan Webhook Gateway Realtime
                </span>
                <span>•</span>
                <button
                  type="button"
                  onClick={copyQrisPayload}
                  className="text-indigo-600 hover:underline cursor-pointer"
                >
                  {copiedQris ? 'Disalin!' : 'Salin String QRIS'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
