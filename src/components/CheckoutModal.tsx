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
  Download,
  AlertCircle,
} from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bca_va' | 'mandiri_va' | 'dana'>('qris');
  
  // Unique verification code (3 digits)
  const [uniqueCode] = useState(() => Math.floor(100 + Math.random() * 899));
  const [copiedAmount, setCopiedAmount] = useState(false);
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
    if (step !== 'payment') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  if (!isOpen || items.length === 0) return null;

  const totalUsd = items.reduce(
    (sum, item) => sum + item.finalPriceUsd * item.quantity,
    0
  );
  const baseTotalIdr = convertUsdToIdr(totalUsd);
  const finalTotalIdr = baseTotalIdr + uniqueCode;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerWhatsApp) return;
    setStep('payment');
  };

  const handleSimulateInstantPayment = () => {
    setIsVerifyingPayment(true);

    setTimeout(() => {
      const orderNumber = `AIS-${Date.now().toString().slice(-6)}`;
      const order: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        customerName: customerName.trim() || 'Pelanggan AI Store',
        customerEmail: customerEmail.trim(),
        customerWhatsApp: customerWhatsApp.trim(),
        items: [...items],
        totalUsd,
        totalIdr: baseTotalIdr,
        exchangeRate: USD_TO_IDR_RATE,
        uniqueCode,
        finalTotalIdr,
        paymentMethod: paymentMethod === 'qris' ? 'QRIS Otomatis' : 'Transfer Bank / E-Wallet',
        status: 'PAID',
        credentials: items.map((item, index) => ({
          serviceName: item.product.name,
          accountEmail: `vip-${item.product.brand}-${Date.now().toString().slice(-4)}@aistore-premium.com`,
          accountPassword: `Pass#${Math.random().toString(36).slice(-8)}!`,
          loginUrl:
            item.product.brand === 'claude'
              ? 'https://claude.ai/login'
              : item.product.brand === 'chatgpt'
              ? 'https://chatgpt.com/auth/login'
              : item.product.brand === 'cursor'
              ? 'https://cursor.com/login'
              : item.product.brand === 'google'
              ? 'https://gemini.google.com/app'
              : 'https://platform.openai.com/api-keys',
          instructions:
            'Gunakan email dan password ini untuk login langsung. Akun 100% private, Anda dapat mengganti password atau mengaktifkan 2FA sendiri.',
          licenseKey:
            item.product.category === 'API'
              ? `sk-proj-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
              : undefined,
          expiresAt: item.product.durationBadge.includes('Tahun') || item.product.durationBadge.includes('YEAR')
            ? '365 Hari dari sekarang'
            : '30 Hari dari sekarang',
        })),
      };

      setIsVerifyingPayment(false);
      onOrderSuccess(order);
    }, 1200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
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
          /* STEP 1: Customer Details & Payment Method Selection */
          <div>
            <div className="mb-5">
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Langkah 1 dari 2
              </span>
              <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight mt-1">
                Data Pemesanan & Pengiriman
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Kredensial akun (Email & Password) akan otomatis dikirimkan ke Email & WhatsApp berikut.
              </p>
            </div>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                      Alamat Email (Penerima Akun)
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
                      No. WhatsApp (Notifikasi Instan)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="081234567890"
                      value={customerWhatsApp}
                      onChange={(e) => setCustomerWhatsApp(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-2">
                  Pilih Metode Pembayaran
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'qris'
                        ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-1.5 shadow-2xs">
                      <QrCode className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="block text-xs font-black text-neutral-900">
                      QRIS Realtime
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Otomatis
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bca_va')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'bca_va'
                        ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mx-auto mb-1.5 text-[10px] font-black">
                      BCA
                    </div>
                    <span className="block text-xs font-black text-neutral-900">
                      BCA VA
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold">
                      Transfer
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mandiri_va')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'mandiri_va'
                        ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center mx-auto mb-1.5 text-[10px] font-black">
                      MDR
                    </div>
                    <span className="block text-xs font-black text-neutral-900">
                      Mandiri VA
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold">
                      Transfer
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('dana')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'dana'
                        ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center mx-auto mb-1.5 text-[10px] font-black">
                      DANA
                    </div>
                    <span className="block text-xs font-black text-neutral-900">
                      E-Wallet
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold">
                      Dana / OVO
                    </span>
                  </button>
                </div>
              </div>

              {/* Dynamic Currency Rate Conversion Breakdown */}
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
                  <span>Konversi Otomatis ke Rupiah:</span>
                  <span className="font-bold">{formatIdr(baseTotalIdr)}</span>
                </div>
                <div className="flex justify-between text-indigo-600 font-semibold">
                  <span>Kode Verifikasi Unik Otomatis:</span>
                  <span>+{uniqueCode}</span>
                </div>
                <div className="flex justify-between text-neutral-900 font-black text-sm pt-2 border-t border-neutral-200">
                  <span>Total yang Harus Ditransfer:</span>
                  <span className="text-base text-indigo-700">
                    {formatIdr(finalTotalIdr)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#1c1d22] hover:bg-neutral-900 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Lanjut ke Bayar QRIS ({formatIdr(finalTotalIdr)})</span>
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

            {/* QRIS Card with Official Indonesian Banking Look */}
            <div className="bg-white rounded-3xl border-2 border-neutral-300 p-5 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded tracking-tighter">
                    QRIS
                  </div>
                  <span className="text-[10px] font-bold text-neutral-600">
                    QR Standar Pembayaran Nasional
                  </span>
                </div>
                <div className="text-[10px] font-black text-neutral-400">
                  GPN INDONESIA
                </div>
              </div>

              <div className="mb-2">
                <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight">
                  AISTORE ID OFFICIAL
                </h4>
                <p className="text-[11px] text-neutral-500">
                  NMID: ID1024889201992 • Instant Verification
                </p>
              </div>

              {/* QRIS Graphic */}
              <div className="bg-white p-3 rounded-2xl border border-neutral-200 shadow-xs my-2 relative">
                {/* SVG Simulated Dynamic QR Code */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-48 h-48 sm:w-56 sm:h-56 mx-auto"
                >
                  {/* Outer corner squares */}
                  <rect x="10" y="10" width="50" height="50" fill="#1c1d22" rx="4" />
                  <rect x="20" y="20" width="30" height="30" fill="white" rx="2" />
                  <rect x="27" y="27" width="16" height="16" fill="#1c1d22" />

                  <rect x="140" y="10" width="50" height="50" fill="#1c1d22" rx="4" />
                  <rect x="150" y="20" width="30" height="30" fill="white" rx="2" />
                  <rect x="157" y="27" width="16" height="16" fill="#1c1d22" />

                  <rect x="10" y="140" width="50" height="50" fill="#1c1d22" rx="4" />
                  <rect x="20" y="150" width="30" height="30" fill="white" rx="2" />
                  <rect x="27" y="157" width="16" height="16" fill="#1c1d22" />

                  {/* QR Pattern dots */}
                  <g fill="#1c1d22">
                    <rect x="70" y="15" width="8" height="8" />
                    <rect x="85" y="15" width="8" height="8" />
                    <rect x="100" y="15" width="8" height="8" />
                    <rect x="115" y="15" width="8" height="8" />
                    <rect x="70" y="30" width="8" height="8" />
                    <rect x="92" y="30" width="8" height="8" />
                    <rect x="115" y="30" width="8" height="8" />
                    <rect x="78" y="45" width="8" height="8" />
                    <rect x="105" y="45" width="8" height="8" />

                    <rect x="15" y="70" width="8" height="8" />
                    <rect x="30" y="70" width="8" height="8" />
                    <rect x="45" y="70" width="8" height="8" />
                    <rect x="60" y="70" width="8" height="8" />
                    <rect x="75" y="70" width="8" height="8" />
                    <rect x="90" y="70" width="8" height="8" />
                    <rect x="105" y="70" width="8" height="8" />
                    <rect x="120" y="70" width="8" height="8" />
                    <rect x="135" y="70" width="8" height="8" />
                    <rect x="150" y="70" width="8" height="8" />
                    <rect x="165" y="70" width="8" height="8" />
                    <rect x="180" y="70" width="8" height="8" />

                    <rect x="25" y="90" width="8" height="8" />
                    <rect x="45" y="90" width="8" height="8" />
                    <rect x="65" y="90" width="8" height="8" />
                    <rect x="135" y="90" width="8" height="8" />
                    <rect x="155" y="90" width="8" height="8" />
                    <rect x="175" y="90" width="8" height="8" />

                    <rect x="15" y="110" width="8" height="8" />
                    <rect x="35" y="110" width="8" height="8" />
                    <rect x="75" y="110" width="8" height="8" />
                    <rect x="115" y="110" width="8" height="8" />
                    <rect x="145" y="110" width="8" height="8" />
                    <rect x="165" y="110" width="8" height="8" />

                    <rect x="70" y="145" width="8" height="8" />
                    <rect x="90" y="145" width="8" height="8" />
                    <rect x="110" y="145" width="8" height="8" />
                    <rect x="130" y="145" width="8" height="8" />
                    <rect x="150" y="145" width="8" height="8" />
                    <rect x="170" y="145" width="8" height="8" />
                    <rect x="80" y="165" width="8" height="8" />
                    <rect x="100" y="165" width="8" height="8" />
                    <rect x="140" y="165" width="8" height="8" />
                    <rect x="160" y="165" width="8" height="8" />
                    <rect x="180" y="165" width="8" height="8" />
                  </g>

                  {/* Center AI Store Logo Badge */}
                  <circle cx="100" cy="100" r="18" fill="#4f46e5" />
                  <text
                    x="100"
                    y="104"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    AI
                  </text>
                </svg>

                <div className="text-[10px] font-bold text-neutral-500 mt-1">
                  Scan pakai BCA, GoPay, OVO, Dana, ShopeePay, Mandiri, BRI
                </div>
              </div>

              {/* Exact Amount To Pay with Copy Button */}
              <div className="w-full bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200 mt-2 text-center">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                  Jumlah Nominal Tepat yang Harus Dibayar:
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-2xl font-black text-indigo-700 font-mono">
                    {formatIdr(finalTotalIdr)}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(finalTotalIdr.toString())}
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
                  ⚠️ Pastikan nominal transfer sesuai persis hingga 3 digit terakhir agar terdeteksi otomatis!
                </span>
              </div>
            </div>

            {/* Check Payment Simulator Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                id="btn-confirm-payment"
                onClick={handleSimulateInstantPayment}
                disabled={isVerifyingPayment}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-98 text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {isVerifyingPayment ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Mengecek Transaksi QRIS Realtime...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Saya Sudah Bayar (Cek Otomatis)</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-neutral-500 font-medium">
                Sistem kami memindai mutasi bank setiap 5 detik. Akun akan langsung tampil di layar setelah pembayaran diterima.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
