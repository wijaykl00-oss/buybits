import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Star,
  ShieldCheck,
  Zap,
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
  // Find Claude products or fallback to first products
  const claudePro = products.find((p) => p.name.toLowerCase().includes('claude pro')) || products[0];
  const claudeMax5x = products.find((p) => p.name.toLowerCase().includes('claude max 5x')) || products[1];
  const claudeMax20x = products.find((p) => p.name.toLowerCase().includes('claude max 20x')) || products[2];

  const heroCards = [
    {
      title: 'CLAUDE PRO',
      badge: '1 MONTH',
      bgStyle: 'bg-[#5451FF] text-white',
      iconStyle: 'bg-white/20 text-white',
      product: claudePro,
    },
    {
      title: 'CLAUDE PRO',
      badge: '3 MONTHS',
      bgStyle: 'bg-[#1E1E1E] text-white',
      iconStyle: 'text-[#D97757]',
      product: claudePro,
    },
    {
      title: 'CLAUDE MAX 5X',
      badge: 'PROMO',
      bgStyle: 'bg-[#5451FF] text-white',
      iconStyle: 'bg-white/20 text-white',
      product: claudeMax5x,
    },
    {
      title: 'CLAUDE MAX 5X',
      badge: 'EXCLUSIVE',
      bgStyle: 'bg-[#1E1E1E] text-white',
      iconStyle: 'text-[#D97757]',
      product: claudeMax5x,
    },
    {
      title: 'CLAUDE MAX 20X',
      badge: 'VIP',
      bgStyle: 'bg-[#5451FF] text-white',
      iconStyle: 'bg-white/20 text-white',
      product: claudeMax20x,
    },
  ];

  return (
    <div className="w-full bg-[#EFEFEA] pt-8 sm:pt-12 pb-10 border-b border-neutral-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag & Decorative Sparkle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* 8-pointed Indigo Star Icon */}
            <div className="text-[#5451FF]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="w-6 h-6 sm:w-7 sm:h-7"
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-black text-neutral-600 tracking-[0.2em] uppercase font-mono">
              TRUSTED DIGITAL PRODUCT MARKETPLACE
            </span>
          </div>

          {/* Right Decorative Star */}
          <div className="hidden sm:block text-neutral-800">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 opacity-70"
            >
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        </div>

        {/* Main Big Headline */}
        <div className="max-w-5xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-neutral-900 tracking-tight leading-[1.05] uppercase">
            ACCESS AI{' '}
            <span className="inline-flex items-center justify-center align-middle mx-1 sm:mx-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#CCFF00] text-neutral-950 rounded-full border-2 border-neutral-900 shadow-sm">
              <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 stroke-[3]" />
            </span>{' '}
            & PREMIUM <br />
            SOFTWARE AT THE BEST <br />
            PRICE
          </h1>
        </div>

        {/* Stats and Action Buttons Row */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
          {/* Left Stats Counter */}
          <div className="flex items-center gap-6 sm:gap-8 divide-x divide-neutral-300">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">
                3K+
              </div>
              <div className="text-xs text-neutral-500 font-medium">Customers</div>
            </div>

            <div className="pl-6 sm:pl-8">
              <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">
                2K+
              </div>
              <div className="text-xs text-neutral-500 font-medium">Transactions</div>
            </div>

            <div className="pl-6 sm:pl-8">
              <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono flex items-center gap-1">
                <span>4.9</span>
              </div>
              <div className="text-xs text-neutral-500 font-medium">Store Rating</div>
            </div>
          </div>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onShopNow}
              id="hero-btn-shop-now"
              className="px-6 sm:px-8 py-3.5 rounded-full bg-[#5451FF] hover:bg-[#4338ca] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-98 transition-all cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onClick={onHowToOrder}
              id="hero-btn-how-to-order"
              className="px-5 sm:px-6 py-3.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-400 text-neutral-900 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              <span>How to Order</span>
            </button>
          </div>
        </div>

        {/* Showcase Cards (Exact Look from Uploaded Design) */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {heroCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => card.product && onSelectProduct(card.product)}
              className={`${card.bgStyle} rounded-2xl sm:rounded-3xl p-5 sm:p-6 aspect-[4/5] flex flex-col items-center justify-between text-center cursor-pointer shadow-md hover:-translate-y-1.5 transition-all duration-200 group relative border border-black/10`}
            >
              {/* Star Logo in Middle / Top */}
              <div className="w-full flex-1 flex items-center justify-center">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${card.iconStyle} group-hover:scale-110 transition-transform`}>
                  {/* 8-pointed Asterisk / Star */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="w-9 h-9 sm:w-10 sm:h-10"
                  >
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                  </svg>
                </div>
              </div>

              {/* Card Label Bottom */}
              <div className="w-full pt-2">
                <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase block">
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
