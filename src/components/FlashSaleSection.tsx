import React, { useState, useEffect } from 'react';
import { Zap, Clock, Sparkles, Flame, CheckCircle2, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { getFlashSaleCycleInfo } from '../data/products';

interface FlashSaleSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAllFlashSale?: () => void;
  currencyMode: 'USD' | 'IDR';
  compactMode?: boolean;
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({
  products,
  onQuickView,
  onBuyNow,
  onAddToCart,
  onViewAllFlashSale,
  currencyMode,
  compactMode = false,
}) => {
  const [cycleInfo, setCycleInfo] = useState(getFlashSaleCycleInfo());
  const [timeLeft, setTimeLeft] = useState(cycleInfo.secondsRemaining);
  const [selectedBatchTab, setSelectedBatchTab] = useState<1 | 2>(cycleInfo.currentBatch);

  // Update countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const fresh = getFlashSaleCycleInfo();
          setCycleInfo(fresh);
          setSelectedBatchTab(fresh.currentBatch);
          return fresh.secondsRemaining;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const format2Digit = (num: number) => num.toString().padStart(2, '0');

  // Filter products for the selected batch tab
  const batch1Products = products.filter((p) => p.inFlashSaleBatch === 1).slice(0, 26);
  const batch2Products = products.filter((p) => p.inFlashSaleBatch === 2).slice(0, 26);

  const displayedProducts =
    selectedBatchTab === 1 ? batch1Products : batch2Products;

  const isLiveBatch = selectedBatchTab === cycleInfo.currentBatch;

  return (
    <section id="flash-sale-section" className="py-8 sm:py-12 bg-[#222222] border-y border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Sale Banner Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          {/* Background Decorative Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-yellow-300 text-xs font-black uppercase tracking-wider">
                <Flame className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-bounce" />
                <span>ROTASI 12 JAM SEKALI • DISKON FLAT 80%</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase leading-none">
                MEGA FLASH SALE 80% OFF
              </h2>
              <p className="text-sm text-rose-100 font-medium leading-relaxed">
                26 produk pertama aktif selama 12 jam, kemudian 26 produk berikutnya berotasi otomatis. 
                Semua akun 100% Private, Legal & Bergaransi Penuh.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 flex flex-col items-center flex-shrink-0 w-full lg:w-auto">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-200 mb-2 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-yellow-300 animate-spin" />
                <span>Sisa Waktu Batch Saat Ini:</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="bg-neutral-900 text-yellow-300 font-mono text-2xl sm:text-3xl font-black px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    {format2Digit(hours)}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-300 uppercase mt-1">
                    Jam
                  </span>
                </div>
                <span className="text-2xl font-black text-white/60 -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="bg-neutral-900 text-yellow-300 font-mono text-2xl sm:text-3xl font-black px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    {format2Digit(minutes)}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-300 uppercase mt-1">
                    Menit
                  </span>
                </div>
                <span className="text-2xl font-black text-white/60 -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="bg-neutral-900 text-yellow-300 font-mono text-2xl sm:text-3xl font-black px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
                    {format2Digit(seconds)}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-300 uppercase mt-1">
                    Detik
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Batch Selector Tabs */}
          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedBatchTab(1)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  selectedBatchTab === 1
                    ? 'bg-white text-neutral-900 shadow-md scale-105'
                    : 'bg-black/30 hover:bg-black/40 text-white'
                }`}
              >
                <span>Batch 1 (26 Produk)</span>
                {cycleInfo.currentBatch === 1 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
                {cycleInfo.currentBatch === 1 ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded">
                    LIVE
                  </span>
                ) : (
                  <span className="text-[10px] bg-neutral-700 text-neutral-200 px-1.5 py-0.2 rounded">
                    Next
                  </span>
                )}
              </button>

              <button
                onClick={() => setSelectedBatchTab(2)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  selectedBatchTab === 2
                    ? 'bg-white text-neutral-900 shadow-md scale-105'
                    : 'bg-black/30 hover:bg-black/40 text-white'
                }`}
              >
                <span>Batch 2 (26 Produk)</span>
                {cycleInfo.currentBatch === 2 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
                {cycleInfo.currentBatch === 2 ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded">
                    LIVE
                  </span>
                ) : (
                  <span className="text-[10px] bg-neutral-700 text-neutral-200 px-1.5 py-0.2 rounded">
                    Next
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-rose-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Semua produk di bawah otomatis dipotong 80% saat checkout</span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid (Matching screenshot layout: 4 columns on lg, 2 on sm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(compactMode ? displayedProducts.slice(0, 8) : displayedProducts).map(
            (product) => (
              <ProductCard
                key={`flash-${product.id}`}
                product={product}
                isFlashSaleActive={isLiveBatch}
                onQuickView={onQuickView}
                onBuyNow={onBuyNow}
                onAddToCart={onAddToCart}
                currencyMode={currencyMode}
              />
            )
          )}
        </div>

        {compactMode && onViewAllFlashSale && (
          <div className="mt-8 text-center">
            <button
              onClick={onViewAllFlashSale}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <span>Lihat Semua 56 Produk Flash Sale (Batch 1 & 2)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
