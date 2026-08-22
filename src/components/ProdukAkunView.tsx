import React, { useState, useMemo } from 'react';
import {
  Search,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Sparkles,
  Info,
  CheckCircle2,
  Tv,
  Film,
  Music,
  Share2,
  Mail,
  SlidersHorizontal,
} from 'lucide-react';
import { Product } from '../types';
import { BrandLogo } from './BrandLogo';
import { formatIdr, formatUsd } from '../data/products';

interface ProdukAkunViewProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  currencyMode: 'USD' | 'IDR';
}

interface SubCategoryGroup {
  id: string;
  title: string;
  badge?: string;
  icon?: React.ReactNode;
}

export const ProdukAkunView: React.FC<ProdukAkunViewProps> = ({
  products,
  onQuickView,
  onBuyNow,
  onAddToCart,
  currencyMode,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'STREAMING' | 'SOSMED' | 'GMAIL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract only PRODUK AKUN items
  const produkAkunList = useMemo(() => {
    return products.filter((p) => p.category === 'PRODUK AKUN');
  }, [products]);

  // Subcategories in exact order of the reference images
  const subCategoryGroups: SubCategoryGroup[] = [
    { id: 'NETFLIX', title: 'NETFLIX', badge: 'Streaming 4K' },
    { id: 'CAPCUT', title: 'CAPCUT', badge: 'Video Editor' },
    { id: 'SPOTIFY', title: 'SPOTIFY', badge: 'Music Premium' },
    { id: 'WETV', title: 'WETV', badge: 'Asian Drama VIP' },
    { id: 'AKUN INSTAGRAM (AKTIF)', title: 'AKUN INSTAGRAM (AKTIF)', badge: 'Real Active Followers' },
    { id: 'AKUN TIKTOK (AKTIF)', title: 'AKUN TIKTOK (AKTIF)', badge: 'Live Ready & Aktif' },
    { id: 'AKUN GMAIL', title: 'AKUN GMAIL', badge: 'Clean & Aged' },
  ];

  // Group products by subCategory
  const groupedProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return subCategoryGroups.map((group) => {
      const groupItems = produkAkunList.filter((p) => {
        const matchesSubCat = p.subCategory === group.id;
        if (!matchesSubCat) return false;

        // Filter tabs
        if (activeFilter === 'STREAMING') {
          if (!['NETFLIX', 'CAPCUT', 'SPOTIFY', 'WETV'].includes(group.id)) return false;
        } else if (activeFilter === 'SOSMED') {
          if (!['AKUN INSTAGRAM (AKTIF)', 'AKUN TIKTOK (AKTIF)'].includes(group.id)) return false;
        } else if (activeFilter === 'GMAIL') {
          if (group.id !== 'AKUN GMAIL') return false;
        }

        // Search query
        if (q) {
          const matchName = p.name.toLowerCase().includes(q);
          const matchSub = (p.subCategory || '').toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          return matchName || matchSub || matchDesc;
        }

        return true;
      });

      return {
        ...group,
        items: groupItems,
      };
    }).filter((group) => group.items.length > 0);
  }, [produkAkunList, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F4F3EE] text-neutral-900 py-8 sm:py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-60" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title Section (Red & White Theme) */}
        <div className="mb-8 sm:mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-black tracking-wider uppercase mb-3 font-space">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Katalog Resmi Produk Akun</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#111111] uppercase font-display">
            PRODUK <span className="text-red-600">AKUN</span>
          </h1>

          <p className="text-neutral-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Daftar harga akun streaming premium, media sosial aktif dengan followers riil, dan akun Gmail fresh/bekas berkualitas dengan garansi penuh.
          </p>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-4 text-xs font-semibold text-neutral-700">
            <div className="flex items-center gap-1.5 text-red-600 font-bold">
              <CheckCircle2 className="w-4 h-4 text-red-600" />
              <span>100% Private & Legal</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garansi Penuh Full Replace</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600 font-bold">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Pengiriman Instan 1-3 Menit</span>
            </div>
          </div>
        </div>

        {/* Filter Pills & Search Bar (White Card Container) */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-300 shadow-sm mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'ALL'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              Semua Akun
            </button>

            <button
              onClick={() => setActiveFilter('STREAMING')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'STREAMING'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              Streaming (Netflix, Spotify, WeTV, Capcut)
            </button>

            <button
              onClick={() => setActiveFilter('SOSMED')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'SOSMED'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              Sosmed (IG, TikTok)
            </button>

            <button
              onClick={() => setActiveFilter('GMAIL')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'GMAIL'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              Akun Gmail
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari akun..."
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3.5 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-red-500 focus:bg-white font-medium transition-colors"
            />
          </div>
        </div>

        {/* Grouped Product Sections */}
        {groupedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-neutral-300 space-y-3 shadow-xs">
            <Search className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-base font-bold text-neutral-900">Produk Akun Tidak Ditemukan</h3>
            <p className="text-xs text-neutral-500">
              Tidak ada produk yang cocok dengan pencarian "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('ALL');
              }}
              className="px-4 py-2 bg-red-600 text-white text-xs font-black rounded-full hover:bg-red-700 transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-12">
            {groupedProducts.map((group) => (
              <section key={group.id} className="space-y-4">
                {/* Red & White Category Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-red-200">
                  <h2 className="text-base sm:text-lg font-black tracking-wider text-red-600 uppercase font-display">
                    {group.title}
                  </h2>
                  {group.badge && (
                    <span className="text-[10px] font-bold text-neutral-600 bg-white px-2.5 py-0.5 rounded-full border border-neutral-300 shadow-2xs">
                      {group.badge}
                    </span>
                  )}
                </div>

                {/* Products Grid for this category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {group.items.map((product) => {
                    const displayPrice =
                      currencyMode === 'IDR'
                        ? (product.priceIdr ? formatIdr(product.priceIdr) : formatIdr(product.priceUsd * 13948))
                        : formatUsd(product.priceUsd);

                    return (
                      <div
                        key={product.id}
                        id={`produk-akun-card-${product.id}`}
                        className="bg-white rounded-2xl p-5 border border-neutral-300 hover:border-red-500 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
                      >
                        {/* Top Area: Title & Brand */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <BrandLogo brand={product.brand} size="sm" />
                            <button
                              onClick={() => onQuickView(product)}
                              className="p-1.5 rounded-lg bg-neutral-100 hover:bg-red-50 hover:text-red-600 text-neutral-500 transition-colors cursor-pointer"
                              title="Lihat Detail Produk"
                            >
                              <Info className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h3
                            onClick={() => onQuickView(product)}
                            className="text-sm sm:text-[15px] font-bold text-neutral-900 leading-snug cursor-pointer hover:text-red-600 transition-colors capitalize"
                          >
                            {product.name}
                          </h3>

                          {/* Price in Bold Red */}
                          <div className="mt-2.5">
                            <span className="text-lg sm:text-xl font-black text-red-600 tracking-tight font-space">
                              {displayPrice}
                            </span>
                          </div>

                          {/* Minimal Purchase Alert Box */}
                          {product.minOrderNote && (
                            <div className="mt-3 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-800">
                              {product.minOrderNote}
                            </div>
                          )}
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-4 mt-3 border-t border-neutral-200 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onBuyNow(product)}
                            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer font-space shadow-xs active:scale-95"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Beli Sekarang</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onAddToCart(product)}
                            className="p-2.5 rounded-xl bg-neutral-100 hover:bg-red-50 border border-neutral-300 hover:border-red-300 text-neutral-700 hover:text-red-600 transition-colors cursor-pointer"
                            title="Tambah ke Keranjang"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
