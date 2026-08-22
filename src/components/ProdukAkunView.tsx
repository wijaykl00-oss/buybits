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
    <div className="min-h-screen bg-[#07090E] text-white py-8 sm:py-12 relative overflow-hidden">
      {/* Subtle Background Glows & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00e5ff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title Section */}
        <div className="mb-8 sm:mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-black tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Resmi Produk Akun</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-display">
            PRODUK <span className="text-[#00E5FF] drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">AKUN</span>
          </h1>

          <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Daftar harga akun streaming premium, media sosial aktif dengan followers riil, dan akun Gmail fresh/bekas berkualitas dengan garansi penuh.
          </p>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-4 text-xs font-semibold text-neutral-300">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Private & Legal</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Garansi Penuh Full Replace</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <Zap className="w-4 h-4" />
              <span>Pengiriman Instan 1-3 Menit</span>
            </div>
          </div>
        </div>

        {/* Filter Pills & Search Bar */}
        <div className="bg-[#0e131d]/90 backdrop-blur-md rounded-2xl p-4 border border-neutral-800/80 shadow-xl mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'ALL'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-[#151b27] hover:bg-[#1f2738] text-neutral-300'
              }`}
            >
              Semua Akun
            </button>

            <button
              onClick={() => setActiveFilter('STREAMING')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'STREAMING'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-[#151b27] hover:bg-[#1f2738] text-neutral-300'
              }`}
            >
              Streaming (Netflix, Spotify, WeTV, Capcut)
            </button>

            <button
              onClick={() => setActiveFilter('SOSMED')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'SOSMED'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-[#151b27] hover:bg-[#1f2738] text-neutral-300'
              }`}
            >
              Sosmed (IG, TikTok)
            </button>

            <button
              onClick={() => setActiveFilter('GMAIL')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'GMAIL'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-[#151b27] hover:bg-[#1f2738] text-neutral-300'
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
              className="w-full bg-[#151b27] border border-neutral-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-cyan-400 font-medium"
            />
          </div>
        </div>

        {/* Grouped Product Sections Matching the Reference Images */}
        {groupedProducts.length === 0 ? (
          <div className="bg-[#0e131d] rounded-2xl p-12 text-center border border-neutral-800 space-y-3">
            <Search className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Produk Akun Tidak Ditemukan</h3>
            <p className="text-xs text-neutral-400">
              Tidak ada produk yang cocok dengan pencarian "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('ALL');
              }}
              className="px-4 py-2 bg-cyan-500 text-black text-xs font-black rounded-full"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-12">
            {groupedProducts.map((group) => (
              <section key={group.id} className="space-y-4">
                {/* Neon Cyan Category Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-cyan-500/20">
                  <h2 className="text-base sm:text-lg font-black tracking-wider text-[#00E5FF] uppercase drop-shadow-[0_0_12px_rgba(0,229,255,0.35)] font-display">
                    {group.title}
                  </h2>
                  {group.badge && (
                    <span className="text-[10px] font-bold text-neutral-400 bg-[#151b27] px-2.5 py-0.5 rounded-full border border-neutral-800">
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
                        className="bg-[#0d1117] rounded-2xl p-5 border border-neutral-800/90 hover:border-cyan-500/50 shadow-lg transition-all duration-200 flex flex-col justify-between group hover:shadow-cyan-950/40 relative overflow-hidden"
                      >
                        {/* Top Area: Title & Brand */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <BrandLogo brand={product.brand} size="sm" />
                            <button
                              onClick={() => onQuickView(product)}
                              className="p-1.5 rounded-lg bg-neutral-800/60 hover:bg-cyan-500/20 hover:text-cyan-300 text-neutral-400 transition-colors"
                              title="Lihat Detail Produk"
                            >
                              <Info className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h3
                            onClick={() => onQuickView(product)}
                            className="text-sm sm:text-[15px] font-bold text-white leading-snug cursor-pointer hover:text-cyan-300 transition-colors capitalize"
                          >
                            {product.name}
                          </h3>

                          {/* Price in Bright Neon Cyan */}
                          <div className="mt-2.5">
                            <span className="text-lg sm:text-xl font-black text-[#00E5FF] tracking-tight font-space drop-shadow-[0_0_10px_rgba(0,229,255,0.25)]">
                              {displayPrice}
                            </span>
                          </div>

                          {/* Minimal Purchase Alert Box (like in Gmail photo) */}
                          {product.minOrderNote && (
                            <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#1e1b10] border border-amber-500/40 text-[11px] font-bold text-amber-300">
                              {product.minOrderNote}
                            </div>
                          )}
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-4 mt-3 border-t border-neutral-800/60 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onBuyNow(product)}
                            className="flex-1 py-2.5 rounded-xl bg-[#161b22] hover:bg-cyan-500 hover:text-black border border-neutral-700 hover:border-cyan-400 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer font-space shadow-sm active:scale-95 group/btn"
                          >
                            <ShoppingCart className="w-3.5 h-3.5 group-hover/btn:text-black" />
                            <span>Beli Sekarang</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onAddToCart(product)}
                            className="p-2.5 rounded-xl bg-[#161b22] hover:bg-[#21262d] border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                            title="Tambah ke Keranjang"
                          >
                            <ShoppingCart className="w-4 h-4 text-cyan-400" />
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
