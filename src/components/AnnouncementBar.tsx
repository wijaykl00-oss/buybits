import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const AnnouncementBar: React.FC = () => {
  const { language } = useLanguage();

  const items =
    language === 'id'
      ? [
          'GARANSI PENUH 100%',
          'PENGIRIMAN INSTAN',
          'AKUN LEGAL & RESMI',
          'BANTUAN 24/7',
          'HARGA TERBAIK',
          'PEMBAYARAN AMAN QRIS',
          'GARANSI PENUH 100%',
          'PENGIRIMAN INSTAN',
          'AKUN LEGAL & RESMI',
          'BANTUAN 24/7',
        ]
      : [
          'FULL WARRANTY 100%',
          'INSTANT DELIVERY',
          'LEGAL & PRIVATE ACCOUNTS',
          '24/7 FAST SUPPORT',
          'BEST PRICE GUARANTEE',
          'SECURE AUTOMATED PAYMENT',
          'FULL WARRANTY 100%',
          'INSTANT DELIVERY',
          'LEGAL & PRIVATE ACCOUNTS',
          '24/7 FAST SUPPORT',
        ];

  return (
    <div className="w-full bg-[#111111] text-white py-3.5 border-b border-neutral-800 overflow-hidden relative select-none">
      <div className="flex items-center gap-6 sm:gap-8 whitespace-nowrap animate-marquee">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-black tracking-widest uppercase font-space">
            {/* Red Asterisk 8-point */}
            <span className="text-red-500 font-black text-base sm:text-lg">
              ✳
            </span>
            <span className="text-white/95 hover:text-white transition-colors">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
