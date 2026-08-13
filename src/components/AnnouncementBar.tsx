import React from 'react';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Headphones,
  Tag,
  Lock,
  Award,
} from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const guarantees = [
    { title: 'Full Warranty', icon: ShieldCheck, desc: '100% Garansi Ganti Baru' },
    { title: 'Instant Delivery', icon: Zap, desc: 'Pengiriman Detik Itu Juga' },
    { title: 'Legal Accounts', icon: CheckCircle2, desc: 'Akun Resmi & Terverifikasi' },
    { title: 'Support 24/7', icon: Headphones, desc: 'Bantuan CS Non-Stop' },
    { title: 'Best Price', icon: Tag, desc: 'Harga Termurah Se-Indonesia' },
    { title: 'Secure Payment', icon: Lock, desc: 'QRIS & VA Otomatis Aman' },
    { title: 'Full Warranty', icon: Award, desc: 'Jaminan Uang Kembali' },
  ];

  return (
    <div className="w-full bg-[#1c1d22] text-white overflow-hidden border-b border-neutral-800">
      {/* Dynamic Animated Ticker for Mobile & Desktop */}
      <div className="py-2.5 bg-gradient-to-r from-neutral-900 via-indigo-950/80 to-neutral-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-white font-bold uppercase tracking-wider text-[11px]">
              PEMBERITAHUAN RESMI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[12px] font-medium text-neutral-300">
            <span>✨ Flash Sale Diskon 80% Berotasi Otomatis Setiap 12 Jam</span>
            <span className="text-neutral-600">•</span>
            <span>⚡ Pembayaran QRIS Otomatis Terdeteksi Real-Time</span>
            <span className="text-neutral-600">•</span>
            <span>⭐ Ulasan 100% Terverifikasi Pembeli Indonesia</span>
          </div>

          <div className="text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            Server Status: ONLINE (100%)
          </div>
        </div>
      </div>

      {/* Main Highlights Grid */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.title}-${index}`}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-600/30 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center mb-2 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-tight">
                  {item.title}
                </span>
                <span className="text-[10px] text-neutral-400 mt-0.5">
                  {item.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
