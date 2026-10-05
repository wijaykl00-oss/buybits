import React, { useEffect } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen && order) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const whatsappUrl = `https://wa.me/6285124935573?text=${encodeURIComponent(
    `Halo Admin, saya sudah membayar pesanan #${order.orderNumber}. Mau ambil akun saya.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-neutral-200 relative my-auto">
        {/* Top Success Header */}
        <div className="text-center pb-4 border-b border-neutral-100">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Pembayaran Berhasil Dikonfirmasi (PAID)
          </span>
          <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight mt-1">
            Akun AI Anda Siap Digunakan!
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            No. Invoice: <span className="font-bold text-neutral-800 font-mono">{order.orderNumber}</span> • {order.createdAt}
          </p>
        </div>

        {/* Claim Account via WhatsApp Section */}
        <div className="my-5 p-6 rounded-3xl bg-emerald-50/80 border-2 border-emerald-300 text-center flex flex-col items-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 mb-3">
            <MessageCircle className="w-7 h-7" />
          </div>
          <h4 className="text-base sm:text-lg font-black text-neutral-900 uppercase font-space">
            Ambil Akun Anda Sekarang
          </h4>
          <p className="text-xs text-neutral-600 max-w-sm mt-1 mb-5">
            Pembayaran telah berhasil diverifikasi. Silakan klik tombol di bawah untuk mengambil detail akun & panduan login via WhatsApp resmi kami.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer font-space"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Ambil Akun</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-[11px] text-neutral-500 mt-2 font-mono">
            WhatsApp: 085124935573
          </span>
        </div>

        {/* Bottom Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-center font-space"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Ambil Akun</span>
          </a>

          <button
            onClick={onClose}
            className="w-full px-5 py-3.5 rounded-full bg-[#1c1d22] hover:bg-neutral-900 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer text-center font-space"
          >
            Selesai & Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
