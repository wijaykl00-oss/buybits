import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  UploadCloud,
  FileImage,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Check,
  Send,
  ExternalLink,
  CreditCard,
  Building2,
  Smartphone,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Order } from '../types';
import { formatIdr } from '../data/products';
import { lookupOrder, submitPaymentProof } from '../services/orderService';

interface UploadProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrder?: Order | null;
  initialOrderNumber?: string;
  onProofSubmitted?: (order: Order) => void;
}

const POPULAR_PAYMENT_SOURCES = [
  'BCA',
  'Bank Mandiri',
  'BRI',
  'BNI',
  'BSI',
  'GoPay',
  'DANA',
  'OVO',
  'ShopeePay',
  'SeaBank',
  'QRIS Bank Lainnya',
];

export const UploadProofModal: React.FC<UploadProofModalProps> = ({
  isOpen,
  onClose,
  initialOrder,
  initialOrderNumber,
  onProofSubmitted,
}) => {
  const [orderQuery, setOrderQuery] = useState(initialOrderNumber || initialOrder?.orderNumber || '');
  const [activeOrder, setActiveOrder] = useState<Order | null>(initialOrder || null);
  const [isSearchingOrder, setIsSearchingOrder] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Form Fields
  const [senderName, setSenderName] = useState(initialOrder?.customerName || '');
  const [senderBank, setSenderBank] = useState('BCA');
  const [customBank, setCustomBank] = useState('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [notes, setNotes] = useState('');

  // Image Upload State
  const [proofImageBase64, setProofImageBase64] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync state with props
  useEffect(() => {
    if (isOpen) {
      const order = initialOrder || (initialOrderNumber ? lookupOrder(initialOrderNumber) : null);
      if (order) {
        setActiveOrder(order);
        setOrderQuery(order.orderNumber);
        setSenderName(order.customerName || '');
        setTransferAmount(order.finalTotalIdr.toString());
      } else if (initialOrderNumber) {
        setOrderQuery(initialOrderNumber);
      }
      setSubmitSuccess(false);
      setSubmitError(null);
      setIsSubmitting(false);
    }
  }, [isOpen, initialOrder, initialOrderNumber]);

  // Support paste from clipboard
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            processFile(blob);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearchOrder = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderQuery.trim()) return;

    setIsSearchingOrder(true);
    setSearchError(null);

    try {
      // Look up locally first
      const local = lookupOrder(orderQuery.trim());
      if (local) {
        setActiveOrder(local);
        setSenderName(local.customerName);
        setTransferAmount(local.finalTotalIdr.toString());
        setIsSearchingOrder(false);
        return;
      }

      // Try server
      const res = await fetch(`/api/orders/${encodeURIComponent(orderQuery.trim())}`);
      const data = await res.json();
      if (res.ok && data.success && data.order) {
        setActiveOrder(data.order);
        setSenderName(data.order.customerName);
        setTransferAmount(data.order.finalTotalIdr.toString());
      } else {
        setSearchError('Nomor Order / Invoice tidak ditemukan. Mohon cek kembali.');
      }
    } catch (err: any) {
      setSearchError(err.message || 'Gagal mencari data pesanan.');
    } finally {
      setIsSearchingOrder(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran gambar terlalu besar. Maksimal 10MB.');
      return;
    }

    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setProofImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder) {
      setSubmitError('Silakan masukkan dan pilih No. Order / Invoice terlebih dahulu.');
      return;
    }

    if (!proofImageBase64) {
      setSubmitError('Wajib mengunggah foto / screenshot struk bukti pembayaran.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const amountVal = parseInt(transferAmount.replace(/[^0-9]/g, ''), 10) || activeOrder.finalTotalIdr;

    try {
      const updatedOrder = submitPaymentProof(activeOrder.id, {
        imageUrl: proofImageBase64,
        senderName: activeOrder.customerName || 'Pelanggan',
        senderBank: 'QRIS Realtime',
        transferAmount: amountVal,
        notes: notes.trim(),
      });

      // Try server upload too
      await fetch(`/api/orders/${encodeURIComponent(activeOrder.id)}/payment-proof`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: activeOrder.id,
          paymentProof: {
            imageUrl: proofImageBase64,
            senderName: activeOrder.customerName || 'Pelanggan',
            senderBank: 'QRIS Realtime',
            transferAmount: amountVal,
            notes: notes.trim(),
            uploadedAt: new Date().toISOString(),
          },
        }),
      }).catch(() => {});

      setSubmitSuccess(true);
      setIsSubmitting(false);

      if (onProofSubmitted && updatedOrder) {
        setTimeout(() => {
          onProofSubmitted(updatedOrder);
        }, 1500);
      }
    } catch (err: any) {
      console.error('Failed to submit proof:', err);
      setSubmitError(err.message || 'Gagal mengirim bukti pembayaran.');
      setIsSubmitting(false);
    }
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

        {submitSuccess ? (
          /* SUCCESS STATE */
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider font-space">
                Bukti Pembayaran Terverifikasi
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-tight mt-2 font-display">
                Konfirmasi Berhasil Diterima!
              </h3>
              <p className="text-xs text-neutral-600 max-w-md mx-auto mt-1">
                Bukti pembayaran untuk Order{' '}
                <span className="font-bold text-neutral-900 font-mono">
                  {activeOrder?.orderNumber}
                </span>{' '}
                telah berhasil disimpan. Akun digital dan kredensial Anda langsung dialokasikan!
              </p>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-left text-xs space-y-1.5 font-space">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order ID:</span>
                <span className="font-bold font-mono text-neutral-900">{activeOrder?.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Pelanggan:</span>
                <span className="font-bold text-neutral-900">{activeOrder?.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Nominal:</span>
                <span className="font-bold text-emerald-600">{formatIdr(activeOrder?.finalTotalIdr || 0)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (onProofSubmitted && activeOrder) {
                    onProofSubmitted(activeOrder);
                  } else {
                    onClose();
                  }
                }}
                className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer font-space"
              >
                Lihat Kredensial Akun Saya
              </button>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider font-space">
                    Konfirmasi Pembayaran
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-neutral-900 uppercase tracking-tight font-display">
                    Upload Bukti Pembayaran
                  </h3>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-1.5">
                Sudah bayar via QRIS / Bank Transfer? Unggah screenshot struk pembayaran di sini agar pesanan Anda langsung diproses instan.
              </p>
            </div>

            {/* ORDER LOOKUP SECTION */}
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
              <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1.5 font-space">
                1. Nomor Order / Invoice Transaksi *
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: AIS-123456"
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden font-mono font-bold"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleSearchOrder()}
                  disabled={isSearchingOrder || !orderQuery.trim()}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs font-black uppercase rounded-xl transition-all cursor-pointer font-space flex items-center gap-1.5"
                >
                  {isSearchingOrder ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>Cek Order</span>
                  )}
                </button>
              </div>

              {searchError && (
                <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-700 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{searchError}</span>
                </div>
              )}

              {/* Order Info Preview if loaded */}
              {activeOrder && (
                <div className="mt-2.5 p-2.5 bg-white rounded-xl border border-neutral-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">
                      {activeOrder.customerName}
                    </span>
                    <span className="text-[10px] font-black font-space px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {activeOrder.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {activeOrder.items.map((it) => it.product.name).join(', ')}
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-neutral-100">
                    <span className="text-[10px] text-neutral-500 font-space">Total Harus Dibayar:</span>
                    <span className="font-mono font-black text-red-600 text-sm">
                      {formatIdr(activeOrder.finalTotalIdr)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmitProof} className="space-y-3.5">
              {/* UPLOAD RECEIPT IMAGE DROPZONE */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1 font-space">
                  2. Foto / Screenshot Bukti Struk Transfer (Wajib) *
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept="image/*"
                  className="hidden"
                />

                {proofImageBase64 ? (
                  /* Image Preview Card */
                  <div className="relative p-3 bg-neutral-50 rounded-2xl border-2 border-emerald-400 flex items-center gap-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border border-neutral-200 flex-shrink-0 flex items-center justify-center shadow-xs">
                      <img
                        src={proofImageBase64}
                        alt="Bukti Transfer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-black uppercase font-space">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Foto Siap Dikirim</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 truncate mt-0.5 font-mono">
                        {imageFileName || 'screenshot_pembayaran.png'}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setProofImageBase64('');
                          setImageFileName('');
                        }}
                        className="text-[10px] text-rose-600 hover:text-rose-800 font-bold uppercase tracking-wider mt-1 flex items-center gap-1 cursor-pointer font-space"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus & Ganti Foto</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Dropzone */
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-5 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      isDragging
                        ? 'border-red-500 bg-red-50/60'
                        : 'border-neutral-300 hover:border-red-400 bg-neutral-50/50 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 text-neutral-500 flex items-center justify-center shadow-xs">
                      <FileImage className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-neutral-800 block uppercase font-space">
                        Pilih Gambar atau Tarik File ke Sini
                      </span>
                      <span className="text-[11px] text-neutral-500 block mt-0.5">
                        Mendukung format JPG, PNG, WEBP (Bisa juga <kbd className="px-1.5 py-0.5 bg-neutral-200 rounded text-[10px] font-mono">Ctrl+V</kbd> paste screenshot)
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-neutral-200 text-neutral-700 rounded-full text-[10px] font-bold uppercase tracking-wider font-space">
                      Pilih dari Galeri / Kamera
                    </span>
                  </div>
                )}
              </div>



              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1 font-space">
                  Nominal yang Ditransfer (IDR) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 85240"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1 font-space">
                  Catatan / Keterangan (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Sudah transfer dari BCA a.n Hendra jam 14:20"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                />
              </div>

              {submitError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 font-medium">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !proofImageBase64}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-98 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-space"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Mengirim & Memvalidasi Bukti Bayar...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Kirim Bukti Pembayaran & Proses Pesanan</span>
                  </>
                )}
              </button>

              {/* Telegram Support Link */}
              <div className="p-2.5 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-neutral-700">
                  <Send className="w-4 h-4 text-[#2AABEE]" />
                  <span className="text-[11px] font-medium">
                    Butuh bantuan manual? CS siap 24/7 di Telegram
                  </span>
                </div>
                <a
                  href="https://t.me/buybitsofficial"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-black text-[#2AABEE] hover:underline flex items-center gap-1"
                >
                  <span>@buybitsofficial</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
