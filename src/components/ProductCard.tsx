import React from 'react';
import { ArrowUpRight, ShoppingCart, Star, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../types';
import { BrandLogo } from './BrandLogo';
import { formatUsd, convertUsdToIdr, formatIdr } from '../data/products';

interface ProductCardProps {
  product: Product;
  isFlashSaleActive?: boolean;
  onQuickView: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  currencyMode?: 'USD' | 'IDR';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFlashSaleActive = false,
  onQuickView,
  onBuyNow,
  onAddToCart,
  currencyMode = 'USD',
}) => {
  // Use explicit flash sale price if defined, otherwise 80% off if batch active, or normal price
  const effectivePriceUsd =
    product.flashSalePriceUsd ??
    (isFlashSaleActive
      ? Number((product.priceUsd * 0.20).toFixed(2))
      : product.priceUsd);

  const displayPrice =
    currencyMode === 'IDR'
      ? formatIdr(convertUsdToIdr(effectivePriceUsd))
      : formatUsd(effectivePriceUsd);

  const rawOriginalPrice =
    product.originalPriceUsd ||
    (isFlashSaleActive ? product.priceUsd : 0);

  const originalDisplayPrice =
    currencyMode === 'IDR'
      ? formatIdr(convertUsdToIdr(rawOriginalPrice))
      : formatUsd(rawOriginalPrice);

  const hasDiscount =
    isFlashSaleActive ||
    !!product.discountPercent ||
    !!product.originalPriceUsd;

  const discountPercentValue =
    product.discountPercent || (isFlashSaleActive ? 80 : 0);
  const discountLabel = discountPercentValue ? `-${discountPercentValue}%` : null;

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-[24px] p-5 border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group hover:border-neutral-300 overflow-hidden"
    >
      {/* Top Right Blue Discount Tag */}
      {hasDiscount && discountLabel && (
        <div className="absolute top-0 right-0 bg-[#4f46e5] text-white text-[11px] font-black px-3.5 py-1.5 rounded-bl-2xl z-10 shadow-sm uppercase tracking-wider">
          {discountLabel}
        </div>
      )}

      {/* Top Row: Icon + Badges / Quick View */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <BrandLogo brand={product.brand} size="md" />

            <span className="border border-neutral-800 text-neutral-800 text-[10px] sm:text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
              {product.categoryBadgeText || product.category}
            </span>
          </div>

          <button
            type="button"
            id={`btn-view-${product.id}`}
            onClick={() => onQuickView(product)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer ml-auto"
            title="Lihat Detail Produk"
          >
            <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-lg sm:text-[19px] font-black text-neutral-900 tracking-tight leading-tight uppercase cursor-pointer hover:text-indigo-600 transition-colors mt-2"
        >
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-2.5">
          <span className="text-2xl sm:text-[28px] font-black text-[#4f46e5] tracking-tight">
            {displayPrice}
          </span>
          {hasDiscount && rawOriginalPrice > 0 && (
            <span className="text-xs sm:text-sm font-bold text-neutral-400 line-through">
              {originalDisplayPrice}
            </span>
          )}
        </div>

        {/* Stock & Lime Progress Bar Section */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
            <span className="text-[#4f46e5]">
              Almost gone! {product.flashSaleAlmostGoneCount ?? product.soldCount ?? 300}
            </span>
            <span className="text-neutral-400 font-medium">
              Left {product.flashSaleLeftCount ?? 0}
            </span>
          </div>

          <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-neutral-200/60">
            <div
              className="bg-[#c3f53b] h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${product.flashSaleStockPercent || 85}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-2">
        <button
          type="button"
          id={`btn-buynow-${product.id}`}
          onClick={() => onBuyNow(product)}
          className="flex-1 bg-[#242424] hover:bg-black active:scale-[0.98] text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-full transition-all duration-150 text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 fill-white text-white" />
          <span>Buy Deal</span>
        </button>

        <button
          type="button"
          id={`btn-cart-${product.id}`}
          onClick={() => onAddToCart(product)}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] active:scale-95 text-white flex items-center justify-center flex-shrink-0 transition-all duration-150 cursor-pointer shadow-sm"
          title="Tambah ke Keranjang"
        >
          <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>
      </div>
    </div>
  );
};
