import React from 'react';
import {
  ShieldCheck,
  Zap,
  Headphones,
  CreditCard,
  Award,
  Lock,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const faqs = [
    {
      q: 'Apakah akun yang dijual disini resmi dan legal?',
      a: 'Ya, 100% legal dan resmi. Semua akun didaftarkan melalui pembayaran internasional legal tanpa metode ilegal (carding/crack). Privasi terjamin dan tidak dibagi dengan orang lain (Private • No Sharing).',
    },
    {
      q: 'Bagaimana cara kerja Flash Sale 80% yang berotasi 12 jam?',
      a: 'Katalog produk kami memiliki 56 item. Setiap 12 jam, sistem secara otomatis merotasi 26 produk untuk mendapatkan potongan harga spesial 80%. Batch 1 dan Batch 2 bergantian secara live realtime.',
    },
    {
      q: 'Bagaimana proses pembayaran QRIS otomatis?',
      a: 'Sistem kami mengkonversi nominal USD ke Rupiah secara realtime dengan kurs terupdate. Anda akan mendapatkan kode unik 3 digit agar mutasi pembayaran dapat diverifikasi otomatis dalam 1-5 detik tanpa perlu konfirmasi manual.',
    },
    {
      q: 'Bagaimana jika akun terkena kendala sebelum masa aktif habis?',
      a: 'Kami memberikan Full Warranty 100%. Jika terjadi kendala login atau limit sebelum masa langganan habis, kami akan mengganti akun baru secara instan melalui customer service WhatsApp 24/7 kami.',
    },
    {
      q: 'Bagaimana cara memberikan ulasan atau review produk?',
      a: 'Untuk menjaga keaslian ulasan, setiap pengguna wajib masuk/login terlebih dahulu. Setelah login, Anda dapat memberikan rating bintang dan ulasan yang langsung ditandai dengan lencana Verified Buyer.',
    },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Platform Penyedia Akun AI #1 di Indonesia</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
          TENTANG BUYBITS.ID
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Kami adalah penyedia layanan langganan akun kecerdasan buatan (Artificial Intelligence) terlengkap dan terpercaya dengan sistem otomatisasi pengiriman instan.
        </p>
      </div>

      {/* Guarantees Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-neutral-900 uppercase">
            Full Warranty 100%
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Semua produk dilindungi garansi penggantian baru selama masa aktif. Tim support kami siap merespon dalam hitungan menit.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-neutral-900 uppercase">
            Instant Delivery
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Sistem pengiriman kredensial bot otomatis mengirim email, password, dan panduan login ke layar, WhatsApp, serta Email detik itu juga.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-neutral-900 uppercase">
            Legal & Private Account
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Bukan akun sharing bersama. Anda mendapatkan akses personal eksklusif bebas ganti password dan pengaturan profil penuh.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-black text-neutral-900 uppercase tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div className="divide-y divide-neutral-200 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="pt-4 first:pt-0 space-y-1.5">
              <h4 className="text-xs sm:text-sm font-black text-neutral-900">
                {faq.q}
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Support CTA Card */}
      <div className="bg-[#1c1d22] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
            Layanan Pelanggan 24/7
          </span>
          <h3 className="text-xl font-black uppercase">
            Butuh Bantuan atau Akun Khusus Enterprise?
          </h3>
          <p className="text-xs text-neutral-400 max-w-md">
            Hubungi admin customer support kami melalui WhatsApp atau Telegram untuk konsultasi cepat.
          </p>
        </div>

        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat WhatsApp CS 24/7</span>
        </a>
      </div>
    </div>
  );
};
