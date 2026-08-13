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
  // If flash sale active for this product, apply 80% discount
  const effectivePriceUsd = isFlashSaleActive
    ? Number((product.priceUsd * 0.20).toFixed(2))
    : product.priceUsd;

  const displayPrice =
    currencyMode === 'IDR'
      ? formatIdr(convertUsdToIdr(effectivePriceUsd))
      : formatUsd(effectivePriceUsd);

  const originalDisplayPrice =
    currencyMode === 'IDR'
      ? formatIdr(
          convertUsdToIdr(
            isFlashSaleActive ? product.priceUsd : product.originalPriceUsd || 0
          )
        )
      : formatUsd(
          isFlashSaleActive ? product.priceUsd : product.originalPriceUsd || 0
        );

  const hasDiscount = isFlashSaleActive || !!product.discountPercent;
  const discountLabel = isFlashSaleActive
    ? '-80%'
    : product.discountPercent
    ? `-${product.discountPercent}%`
    : null;

  const isPromoSolid =
    product.category === 'PROMO' || product.badgeStyle === 'purple-solid';

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-[22px] p-4 sm:p-5 border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group hover:border-neutral-300"
    >
      {/* Flash Sale Tag if active */}
      {isFlashSaleActive && (
        <div className="absolute -top-2.5 left-4 z-10 bg-gradient-to-r from-red-600 to-rose-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm animate-pulse">
          <Zap className="w-3 h-3 fill-yellow-300 text-yellow-300" />
          FLASH SALE 80% OFF
        </div>
      )}

      {/* Top Row: Icon + Arrow Detail Trigger */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <BrandLogo brand={product.brand} size="md" />
          <button
            type="button"
            id={`btn-view-${product.id}`}
            onClick={() => onQuickView(product)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            title="Lihat Detail Produk"
          >
            <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          <span
            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap ${
              isPromoSolid
                ? 'bg-[#4f46e5] text-white'
                : 'bg-white border border-neutral-800 text-neutral-900'
            }`}
          >
            {product.categoryBadgeText || product.category}
          </span>

          <span className="bg-[#c3f53b] text-neutral-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
            {product.durationBadge}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-base sm:text-[17px] font-black text-neutral-900 tracking-tight leading-tight uppercase cursor-pointer hover:text-indigo-600 transition-colors"
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed min-h-[34px]">
          {product.description}
        </p>

        {/* Private / No Sharing Tag */}
        {product.isPrivate && (
          <div className="mt-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f3f0ff] border border-[#e0d7fe] text-[#6b46c1] text-[11px] font-medium tracking-tight">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6b46c1]" />
              Private • No Sharing
            </span>
          </div>
        )}

        {/* Rating & Sold Counter */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium mt-3">
          <div className="flex items-center gap-1 text-neutral-900 font-bold">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{product.rating}</span>
          </div>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-500">{product.soldCount} sold</span>
        </div>

        {/* Flash Sale Progress bar if applicable */}
        {isFlashSaleActive && product.flashSaleStockPercent && (
          <div className="mt-2">
            <div className="flex justify-between text-[10px] font-bold text-rose-600 mb-0.5">
              <span>Terjual {product.flashSaleStockPercent}%</span>
              <span>Stok Menipis</span>
            </div>
            <div className="w-full bg-rose-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-red-600 h-full rounded-full transition-all"
                style={{ width: `${product.flashSaleStockPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section: Price + Action Buttons */}
      <div className="mt-4 pt-3 border-t border-neutral-100">
        {/* Price display */}
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-xl sm:text-[22px] font-black text-neutral-900 tracking-tight">
              {displayPrice}
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              {product.priceUnit}
            </span>
          </div>

          {hasDiscount && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-neutral-400 line-through">
                {originalDisplayPrice}
              </span>
              <span className="bg-[#c3f53b] text-neutral-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                {discountLabel}
              </span>
            </div>
          )}
        </div>

        {/* Buttons: Buy Now + Cart Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            id={`btn-buynow-${product.id}`}
            onClick={() => onBuyNow(product)}
            className="flex-1 bg-[#1c1d22] hover:bg-neutral-900 active:scale-[0.98] text-white font-bold text-xs sm:text-sm py-2.5 px-3 rounded-full transition-all duration-150 text-center flex items-center justify-center cursor-pointer shadow-sm"
          >
            Buy Now
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
    </div>
  );
};
