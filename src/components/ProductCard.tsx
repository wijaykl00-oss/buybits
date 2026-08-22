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
  const isFlashSaleEligible = isFlashSaleActive && product.category !== 'PRODUK AKUN';
  const effectivePriceUsd =
    product.flashSalePriceUsd ??
    (isFlashSaleEligible
      ? Number((product.priceUsd * 0.20).toFixed(2))
      : product.priceUsd);

  const displayPrice =
    currencyMode === 'IDR'
      ? (product.priceIdr ? formatIdr(product.priceIdr) : formatIdr(convertUsdToIdr(effectivePriceUsd)))
      : formatUsd(effectivePriceUsd);

  const rawOriginalPrice =
    product.originalPriceUsd ||
    (isFlashSaleEligible ? product.priceUsd : 0);

  const originalDisplayPrice =
    currencyMode === 'IDR'
      ? formatIdr(convertUsdToIdr(rawOriginalPrice))
      : formatUsd(rawOriginalPrice);

  const hasDiscount =
    product.category !== 'PRODUK AKUN' &&
    (isFlashSaleEligible ||
    !!product.discountPercent ||
    !!product.originalPriceUsd);

  const discountPercentValue =
    product.discountPercent || (isFlashSaleEligible ? 80 : 0);
  const discountLabel = hasDiscount && discountPercentValue ? `-${discountPercentValue}%` : null;

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 border border-neutral-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group hover:border-neutral-400 overflow-hidden"
    >
      {/* Top Right Red Discount Tag */}
      {hasDiscount && discountLabel && (
        <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] sm:text-[11px] font-black px-3 py-1 rounded-bl-2xl z-10 shadow-sm uppercase tracking-wider font-space">
          {discountLabel}
        </div>
      )}

      {/* Top Row: Icon + Badges / Quick View */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
          <div className="flex items-center gap-2">
            <BrandLogo brand={product.brand} size="md" />

            <span className="border border-neutral-800 text-neutral-800 text-[9px] sm:text-[11px] font-black px-2.5 sm:px-3 py-0.5 rounded-full uppercase tracking-wider font-space">
              {product.categoryBadgeText || product.category}
            </span>
          </div>

          <button
            type="button"
            id={`btn-view-${product.id}`}
            onClick={() => onQuickView(product)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer ml-auto"
            title="Lihat Detail Produk"
          >
            <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Title with font-display */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-base sm:text-[18px] font-black text-neutral-900 tracking-tight leading-tight uppercase cursor-pointer hover:text-red-600 transition-colors mt-2 font-display"
        >
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-xl sm:text-[26px] font-black text-red-600 tracking-tight font-space">
            {displayPrice}
          </span>
          {hasDiscount && (
            <span className="text-xs sm:text-sm text-neutral-400 line-through font-space">
              {originalDisplayPrice}
            </span>
          )}
        </div>

        {/* Stock / Sale Progress */}
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-[10px] sm:text-[11px] font-bold">
            <span className="text-neutral-500">
              Terjual: <span className="text-neutral-800">{product.soldCount}</span>
            </span>
            <span className="text-emerald-700">
              Ready Stock
            </span>
          </div>
          <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-red-600 h-full rounded-full"
              style={{
                width: `${Math.min(100, Math.max(20, (product.soldCount % 50) * 2 + 30))}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="pt-4 mt-2 border-t border-neutral-100 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onBuyNow(product)}
          className="flex-1 py-2.5 sm:py-3 rounded-full bg-[#111111] hover:bg-black active:scale-95 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer font-space"
        >
          <Zap className="w-3.5 h-3.5 text-red-500 fill-current" />
          <span>Beli</span>
        </button>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="p-2.5 sm:p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-95 text-neutral-800 transition-colors shadow-2xs cursor-pointer flex-shrink-0"
          title="Tambah ke Keranjang"
        >
          <ShoppingCart className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};
