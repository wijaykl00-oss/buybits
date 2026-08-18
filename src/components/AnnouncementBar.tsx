import React from 'react';

export const AnnouncementBar: React.FC = () => {
  const items = [
    'FULL WARRANTY',
    'INSTANT DELIVERY',
    'LEGAL ACCOUNTS',
    'SUPPORT 24/7',
    'BEST PRICE',
    'SECURE PAYMENT',
    'FULL WARRANTY',
    'INSTANT DELIVERY',
    'LEGAL ACCOUNTS',
    'SUPPORT 24/7',
  ];

  return (
    <div className="w-full bg-[#181818] text-white py-3.5 border-b border-neutral-800 overflow-hidden relative select-none">
      <div className="flex items-center gap-6 sm:gap-8 whitespace-nowrap animate-marquee">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-black tracking-widest uppercase">
            {/* Lime Green Asterisk 8-point */}
            <span className="text-[#CCFF00] font-black text-base sm:text-lg">
              ✳
            </span>
            <span className="text-white/90 hover:text-white transition-colors">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
