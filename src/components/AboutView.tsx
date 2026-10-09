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
import { useLanguage } from '../context/LanguageContext';

export const AboutView: React.FC = () => {
  const { language, t } = useLanguage();

  const faqs =
    language === 'id'
      ? [
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
            a: 'Kami memberikan Full Warranty 100%. Jika terjadi kendala login atau limit sebelum masa langganan habis, kami akan mengganti akun baru secara instan melalui customer service WhatsApp & Telegram 24/7 kami.',
          },
          {
            q: 'Bagaimana cara memberikan ulasan atau review produk?',
            a: 'Untuk menjaga keaslian ulasan, setiap pengguna wajib masuk/login terlebih dahulu. Setelah login, Anda dapat memberikan rating bintang dan ulasan yang langsung ditandai dengan lencana Verified Buyer.',
          },
        ]
      : [
          {
            q: 'Are the accounts sold here official and legal?',
            a: 'Yes, 100% legal and official. All subscriptions are registered through verified international payment methods without carding or cracks. Privacy is guaranteed (Private • No Sharing).',
          },
          {
            q: 'How does the 12-hour 80% rotating Flash Sale work?',
            a: 'Our catalog features 56 premium tools. Every 12 hours, 26 products are rotated automatically with an 80% special discount. Batch 1 and Batch 2 switch live in realtime.',
          },
          {
            q: 'How does automated payment work?',
            a: 'Our platform converts USD to IDR with realtime live rates. You receive a unique 3-digit verification code so payment confirmation is processed automatically within seconds.',
          },
          {
            q: 'What if an account encounters issues before the subscription ends?',
            a: 'We provide a 100% Full Replacement Warranty. If any login or subscription issue occurs during the active period, we replace it promptly via 24/7 support.',
          },
          {
            q: 'How do I leave a review or rating?',
            a: 'To guarantee review authenticity, users must sign in. Once signed in, you can leave star ratings and comments labeled with a Verified Buyer badge.',
          },
        ];

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-black uppercase tracking-wider font-space">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('about.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight font-display">
          {t('about.title')}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {t('about.desc')}
        </p>
      </div>

      {/* Guarantees Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-neutral-900 uppercase font-space">
            {t('about.card1_title')}
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            {t('about.card1_desc')}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-neutral-900 uppercase font-space">
            {t('about.card2_title')}
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            {t('about.card2_desc')}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-neutral-900 uppercase font-space">
            {t('about.card3_title')}
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            {t('about.card3_desc')}
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-red-600" />
          <h2 className="text-xl font-black text-neutral-900 uppercase tracking-tight font-display">
            {t('about.faq_title')}
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
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-space">
            {language === 'id' ? 'Layanan Pelanggan 24/7' : '24/7 Customer Support'}
          </span>
          <h3 className="text-xl font-black uppercase font-display">
            {language === 'id' ? 'Butuh Bantuan atau Akun Khusus Enterprise?' : 'Need Help or Custom Enterprise Subscriptions?'}
          </h3>
          <p className="text-xs text-neutral-400 max-w-md">
            {language === 'id'
              ? 'Hubungi admin customer support kami melalui Telegram untuk konsultasi cepat.'
              : 'Contact our Telegram admin support for quick assistance.'}
          </p>
        </div>

        <a
          href="https://t.me/buybitsofficial"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Telegram: @buybitsofficial</span>
        </a>
      </div>
    </div>
  );
};
