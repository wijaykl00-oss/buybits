import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CategoryType, Product, BrandType } from '../types';
import { ProductCard } from './ProductCard';
import { BrandLogo } from './BrandLogo';

interface MenuViewProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  currencyMode: 'USD' | 'IDR';
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentFlashSaleBatch: 1 | 2;
}

export const MenuView: React.FC<MenuViewProps> = ({
  products,
  onQuickView,
  onBuyNow,
  onAddToCart,
  currencyMode,
  searchQuery,
  onSearchChange,
  currentFlashSaleBatch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<BrandType | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'sold' | 'rating'>('recommended');

  const categories: CategoryType[] = [
    'ALL',
    'AI ASSISTANT',
    'DEVELOPER',
    'AI IMAGE',
    'API',
    'PROMO',
  ];

  const brands: { id: BrandType | 'ALL'; name: string }[] = [
    { id: 'ALL', name: 'Semua Brand' },
    { id: 'claude', name: 'Claude' },
    { id: 'chatgpt', name: 'ChatGPT' },
    { id: 'google', name: 'Google AI' },
    { id: 'cursor', name: 'Cursor' },
    { id: 'kiro', name: 'Kiro AI' },
    { id: 'qoder', name: 'Qoder' },
    { id: 'leonardo', name: 'Leonardo AI' },
    { id: 'deepseek', name: 'DeepSeek' },
    { id: 'openai', name: 'OpenAI API' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'ALL' && p.category !== selectedCategory) {
          return false;
        }
        // Brand filter
        if (selectedBrand !== 'ALL' && p.brand !== selectedBrand) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchBrand) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.priceUsd - b.priceUsd;
        if (sortBy === 'price_high') return b.priceUsd - a.priceUsd;
        if (sortBy === 'sold') return b.soldCount - a.soldCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Katalog Lengkap 56 Akun AI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 uppercase tracking-tight">
          MENU PRODUK & LAYANAN AI
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl leading-relaxed">
          Pilih akun AI resmi personal private untuk kebutuhan coding, riset skripsi, copywriting, image generator, hingga token API backend.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200 shadow-xs mb-8 space-y-4">
        {/* Category Buttons */}
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
            Kategori Produk
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1c1d22] text-white shadow-sm'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand Selector and Sort Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          {/* Brand Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-2xl no-scrollbar">
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBrand(b.id)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedBrand === b.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-neutral-100 border border-neutral-200 rounded-xl px-3 py-1.5 font-bold text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="recommended">Rekomendasi Teratas</option>
              <option value="sold">Terlaris (Paling Banyak Dijual)</option>
              <option value="rating">Rating Tertinggi (★ 5.0)</option>
              <option value="price_low">Harga: Termurah ke Termahal</option>
              <option value="price_high">Harga: Termahal ke Termurah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Stats */}
      <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold mb-4 px-1">
        <span>Menampilkan {filteredProducts.length} dari {products.length} produk AI</span>
        {searchQuery && (
          <span>
            Filter pencarian: <b>"{searchQuery}"</b>
          </span>
        )}
      </div>

      {/* Products Grid (All 56 products exact match!) */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-3">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-neutral-800">
            Produk Tidak Ditemukan
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Tidak ada produk yang cocok dengan pencarian "{searchQuery}". Silakan coba kata kunci lain seperti Claude, ChatGPT, Cursor, atau OpenAI.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedBrand('ALL');
              onSearchChange('');
            }}
            className="px-5 py-2 bg-neutral-900 text-white text-xs font-bold rounded-full cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFlashSaleActive={product.inFlashSaleBatch === currentFlashSaleBatch}
              onQuickView={onQuickView}
              onBuyNow={onBuyNow}
              onAddToCart={onAddToCart}
              currencyMode={currencyMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
