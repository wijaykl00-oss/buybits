import React from 'react';
import {
  ShieldAlert,
  Clock,
  Send,
  Lock,
  Sparkles,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F4F3EE] text-neutral-900 flex flex-col justify-between selection:bg-red-600 selection:text-white relative overflow-hidden">
      {/* Top Background Subtle Glow / Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Minimal */}
      <header className="w-full border-b border-neutral-300 bg-[#F4F3EE]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-600/30 p-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-neutral-900 leading-none font-display">
                buybits<span className="text-red-600 font-black">official</span>
              </span>
              <span className="text-[9px] font-bold text-neutral-500 tracking-wider uppercase mt-0.5 font-space">
                AI & Software Market
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-space">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="hidden xs:inline">System Status:</span>
            <span className="font-black uppercase text-[10px] sm:text-xs">Maintenance</span>
          </div>
        </div>
      </header>

      {/* Main Hero Maintenance Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="max-w-2xl w-full bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 border border-neutral-300 shadow-xl relative text-center space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Maintenance Icon Badge */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-red-50 border-2 border-red-200 text-red-600 flex items-center justify-center shadow-inner mb-4">
              <ShieldAlert className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider font-space">
              <Clock className="w-3.5 h-3.5" />
              <span>Temporary System Notice</span>
            </div>
          </div>

          {/* Exact Required Maintenance Title */}
          <div className="space-y-3">
            <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight leading-tight sm:leading-tight">
              Website Temporary Unavailable - Under Scheduled Maintenance / Administrative Verification
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
              Mohon maaf atas ketidaknyamanannya. Website saat ini sedang menjalani proses pemeliharaan sistem terjadwal dan verifikasi administrasi berkala. Layanan katalog dan pemesanan otomatis akan segera kembali aktif.
            </p>
          </div>

          {/* Safe Customer Notice Box */}
          <div className="bg-[#F8F7F3] rounded-2xl p-4 sm:p-5 border border-neutral-200 text-left space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-black text-neutral-800 uppercase font-space">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Keamanan Data & Pesanan Aktif Pelanggan:</span>
            </div>
            <ul className="text-[11px] sm:text-xs text-neutral-600 space-y-1.5 list-disc list-inside">
              <li>Seluruh data akun, lisensi, dan transaksi pesanan yang telah dibeli tetap <b>100% aman dan aktif</b>.</li>
              <li>Garansi akun tetap berjalan normal tanpa terpengaruh proses pemeliharaan ini.</li>
            </ul>
          </div>

          {/* Official Telegram CTA for Inquiries & Ongoing Support */}
          <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left text-xs">
              <span className="font-bold text-neutral-800 block">
                Butuh bantuan darurat atau konfirmasi pesanan?
              </span>
              <span className="text-[11px] text-neutral-500">
                Hubungi Customer Support resmi kami 24/7 di Telegram.
              </span>
            </div>

            <a
              href="https://t.me/buybitsofficial"
              target="_blank"
              rel="noreferrer"
              id="maintenance-telegram-btn"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-400/25 transition-all hover:scale-105 active:scale-95 cursor-pointer font-space flex-shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Hubungi @buybitsofficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="w-full border-t border-neutral-300 py-5 bg-[#F4F3EE] text-center text-xs text-neutral-500 font-space">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <p>© {new Date().getFullYear()} buybitsofficial. All rights reserved.</p>
          <p>Official Support: Telegram @buybitsofficial</p>
        </div>
      </footer>
    </div>
  );
}
