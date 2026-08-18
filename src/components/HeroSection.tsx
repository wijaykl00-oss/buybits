import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Star,
} from 'lucide-react';
import { Product } from '../types';

interface HeroSectionProps {
  onShopNow: () => void;
  onSelectProduct: (product: Product) => void;
  onHowToOrder: () => void;
  products: Product[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onSelectProduct,
  onHowToOrder,
  products,
}) => {
  // Find Claude products or fallback
  const claudePro = products.find((p) => p.name.toLowerCase().includes('claude pro')) || products[0];
  const claudeMax5x = products.find((p) => p.name.toLowerCase().includes('claude max 5x')) || products[1];
  const claudeMax20x = products.find((p) => p.name.toLowerCase().includes('claude max 20x')) || products[2];

  // Red, Black, White alternating theme
  const heroCards = [
    {
      title: 'CLAUDE PRO',
      badge: '1 MONTH',
      bgStyle: 'bg-[#DC2626] text-white shadow-red-900/20',
      iconStyle: 'bg-white/20 text-white',
      product: claudePro,
    },
    {
      title: 'CLAUDE PRO',
      badge: '3 MONTHS',
      bgStyle: 'bg-[#141414] text-white shadow-black/30 border border-neutral-800',
      iconStyle: 'text-[#DC2626]',
      product: claudePro,
    },
    {
      title: 'CLAUDE MAX 5X',
      badge: 'PROMO',
      bgStyle: 'bg-[#DC2626] text-white shadow-red-900/20',
      iconStyle: 'bg-white/20 text-white',
      product: claudeMax5x,
    },
    {
      title: 'CLAUDE MAX 5X',
      badge: 'EXCLUSIVE',
      bgStyle: 'bg-[#141414] text-white shadow-black/30 border border-neutral-800',
      iconStyle: 'text-[#DC2626]',
      product: claudeMax5x,
    },
    {
      title: 'CLAUDE MAX 20X',
      badge: 'VIP',
      bgStyle: 'bg-[#DC2626] text-white shadow-red-900/20',
      iconStyle: 'bg-white/20 text-white',
      product: claudeMax20x,
    },
  ];

  return (
    <div className="w-full bg-[#F4F3EE] pt-6 sm:pt-12 pb-10 sm:pb-12 border-b border-neutral-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Top Tag & Decorative Sparkle */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* 8-pointed Red Star Icon */}
            <div className="text-red-600 flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse"
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
              </svg>
            </div>
            <span className="text-[10px] xs:text-xs sm:text-sm font-black text-neutral-700 tracking-[0.15em] sm:tracking-[0.2em] uppercase font-space truncate">
              TRUSTED DIGITAL PRODUCT MARKETPLACE
            </span>
          </div>

          {/* Right Decorative Star */}
          <div className="hidden sm:block text-neutral-800 flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 text-red-600"
            >
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        </div>

        {/* Main Responsive Distinctive Headline */}
        <div className="max-w-5xl">
          <h1 className="font-display text-[26px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight leading-[1.08] sm:leading-[1.03] uppercase break-words">
            ACCESS AI{' '}
            <span className="inline-flex items-center justify-center align-middle mx-1 px-2.5 py-0.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded-full border border-neutral-900 sm:border-2 shadow-sm transform hover:rotate-6 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 sm:w-6 sm:h-6 stroke-[3]" />
            </span>{' '}
            & PREMIUM <br className="hidden xs:inline" />
            SOFTWARE AT THE BEST <br className="hidden xs:inline" />
            PRICE
          </h1>
        </div>

        {/* Stats and Action Buttons Row */}
        <div className="mt-6 sm:mt-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 pt-1 sm:pt-2">
          {/* Left Stats Counter (Responsive Grid on Mobile) */}
          <div className="grid grid-cols-3 sm:flex items-center gap-2 xs:gap-4 sm:gap-8 divide-x divide-neutral-300 bg-white/60 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-neutral-200 sm:border-0 shadow-xs sm:shadow-none">
            <div className="text-center sm:text-left">
              <div className="text-xl xs:text-2xl sm:text-3xl font-black text-neutral-900 font-space leading-none">
                3K+
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-500 font-semibold uppercase tracking-wider mt-1">Customers</div>
            </div>

            <div className="text-center sm:text-left pl-2 xs:pl-4 sm:pl-8">
              <div className="text-xl xs:text-2xl sm:text-3xl font-black text-neutral-900 font-space leading-none">
                2K+
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-500 font-semibold uppercase tracking-wider mt-1">Orders</div>
            </div>

            <div className="text-center sm:text-left pl-2 xs:pl-4 sm:pl-8">
              <div className="text-xl xs:text-2xl sm:text-3xl font-black text-neutral-900 font-space flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1 leading-none">
                <span>4.9</span>
                <span className="text-red-600 text-xs sm:text-sm">★</span>
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-500 font-semibold uppercase tracking-wider mt-1">Rating</div>
            </div>
          </div>

          {/* Right Action CTA Buttons (Full Width on Small Phones) */}
          <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <button
              onClick={onShopNow}
              id="hero-btn-shop-now"
              className="flex-1 md:flex-none px-5 sm:px-8 py-3 sm:py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-red-600/30 active:scale-98 transition-all cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onClick={onHowToOrder}
              id="hero-btn-how-to-order"
              className="flex-1 md:flex-none px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-neutral-100 border-2 border-neutral-800 text-neutral-900 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer shadow-xs"
            >
              <span>How to Order</span>
            </button>
          </div>
        </div>

        {/* Showcase Cards: Touch Swipe Snap on Mobile & Grid on Desktop */}
        <div className="mt-8 sm:mt-10 flex md:grid md:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto md:overflow-visible pb-3 md:pb-0 no-scrollbar snap-x">
          {heroCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => card.product && onSelectProduct(card.product)}
              className={`${card.bgStyle} min-w-[130px] xs:min-w-[150px] md:min-w-0 snap-center rounded-2xl sm:rounded-3xl p-4 sm:p-6 aspect-[4/5] flex flex-col items-center justify-between text-center cursor-pointer shadow-md hover:-translate-y-1.5 transition-all duration-200 group relative flex-shrink-0 md:flex-shrink`}
            >
              {/* Star Logo in Middle / Top */}
              <div className="w-full flex-1 flex items-center justify-center">
                <div className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${card.iconStyle} group-hover:scale-110 transition-transform`}>
                  {/* 8-pointed Asterisk / Star */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="w-7 h-7 xs:w-9 xs:h-9 sm:w-10 sm:h-10"
                  >
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                  </svg>
                </div>
              </div>

              {/* Card Label Bottom */}
              <div className="w-full pt-1.5 sm:pt-2">
                <span className="text-[10px] xs:text-[11px] sm:text-xs font-black tracking-wider xs:tracking-widest uppercase block font-space truncate">
                  {card.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
