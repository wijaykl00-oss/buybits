import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  ShoppingCart,
  MessageSquare,
  Sparkles,
  Send,
  UserCheck,
} from 'lucide-react';
import { Product, Review, User } from '../types';
import { BrandLogo } from './BrandLogo';
import { formatUsd, formatIdr, convertUsdToIdr } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  currentUser: User | null;
  onOpenAuthModal: () => void;
  onAddReview: (productId: string, newReview: Review) => void;
  currencyMode: 'USD' | 'IDR';
  isFlashSaleActive?: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  currentUser,
  onOpenAuthModal,
  onAddReview,
  currencyMode,
  isFlashSaleActive = false,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [userRating, setUserRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  if (!isOpen || !product) return null;

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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !reviewComment.trim()) return;

    setIsSubmittingReview(true);
    setTimeout(() => {
      const newRev: Review = {
        id: `rev-${Date.now()}`,
        userName: currentUser.name,
        userCity: 'Indonesia',
        avatar: currentUser.avatar,
        rating: userRating,
        date: 'Baru saja',
        comment: reviewComment.trim(),
        isVerified: true,
        productVariant: product.durationBadge,
      };

      onAddReview(product.id, newRev);
      setReviewComment('');
      setIsSubmittingReview(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden relative">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-3">
            <BrandLogo brand={product.brand} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-neutral-900 text-white uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="bg-[#c3f53b] text-neutral-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {product.durationBadge}
                </span>
                {isFlashSaleActive && (
                  <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase animate-pulse">
                    FLASH SALE -80%
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 uppercase tracking-tight mt-0.5">
                {product.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs (Details / Reviews) */}
        <div className="flex border-b border-neutral-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'details'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Spesifikasi & Garansi
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ulasan Pembeli ({product.reviews.length})</span>
            <span className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              ★ {product.rating}
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'details' ? (
            <>
              {/* Highlight Guarantee Box */}
              <div className="bg-[#f8f9ff] border border-indigo-100 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-indigo-950 uppercase tracking-tight">
                    Jaminan Akun Private & Legal 100%
                  </h4>
                  <p className="text-xs text-indigo-800/80 mt-0.5 leading-relaxed">
                    Akun personal langsung dari kami dengan email dan password eksklusif milik Anda. Tanpa sharing, tanpa limit gangguan dari pengguna lain, dan bergaransi penuh penggantian akun baru selama periode aktif.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-2">
                  Deskripsi Layanan
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {product.description} Langganan ini mencakup akses langsung ke antarmuka web, API, atau IDE sesuai paket yang Anda pilih. Nikmati kecepatan komputasi server prioritas tertinggi tanpa antre.
                </p>
              </div>

              {/* Key Features List */}
              <div>
                <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-2.5">
                  Fitur Unggulan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Table */}
              <div>
                <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-2.5">
                  Spesifikasi Teknis
                </h4>
                <div className="bg-neutral-50 rounded-2xl p-3 border border-neutral-200 divide-y divide-neutral-200/60">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div
                      key={k}
                      className="py-2 px-1 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-neutral-500">{k}</span>
                      <span className="font-black text-neutral-900">{v}</span>
                    </div>
                  ))}
                  <div className="py-2 px-1 flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-500">
                      Metode Pengiriman
                    </span>
                    <span className="font-bold text-indigo-600 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> {product.deliveryTime}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Reviews Tab */
            <div className="space-y-6">
              {/* Rating Summary Header */}
              <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-400 text-neutral-950 flex flex-col items-center justify-center font-black">
                    <span className="text-lg leading-none">{product.rating}</span>
                    <span className="text-[9px] uppercase">/ 5.0</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-amber-500 fill-amber-500"
                        />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-amber-950 mt-1">
                      Berdasarkan {product.soldCount} pembelian terverifikasi di Indonesia
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                {product.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.avatar}
                          alt={rev.userName}
                          className="w-7 h-7 rounded-full object-cover border border-neutral-300"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-neutral-900">
                              {rev.userName}
                            </span>
                            {rev.isVerified && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                                <UserCheck className="w-2.5 h-2.5" />
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400">
                            {rev.userCity} • {rev.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-current"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                      "{rev.comment}"
                    </p>

                    {rev.productVariant && (
                      <span className="inline-block text-[10px] font-semibold text-neutral-500 bg-white px-2 py-0.5 rounded border border-neutral-200">
                        Varian: {rev.productVariant}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Review Box / Gate for Logged In User */}
              <div className="bg-white rounded-2xl border-2 border-dashed border-neutral-300 p-4">
                <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Tulis Ulasan & Rating Anda</span>
                </h4>

                {currentUser ? (
                  <form onSubmit={handleSubmitReview} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-700">
                        Rating:
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setUserRating(star)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= userRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-neutral-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      required
                      rows={3}
                      placeholder="Bagikan pengalaman Anda menggunakan akun AI ini (pengiriman, kestabilan, kecepatan)..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full text-xs p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Posting sebagai <b>{currentUser.name}</b> (Terverifikasi)
                      </span>
                      <button
                        type="submit"
                        disabled={isSubmittingReview || !reviewComment.trim()}
                        className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim Ulasan</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-4 space-y-2">
                    <p className="text-xs text-neutral-600">
                      Anda harus login terlebih dahulu agar ulasan Anda dapat diverifikasi sebagai pembeli asli.
                    </p>
                    <button
                      type="button"
                      onClick={onOpenAuthModal}
                      className="px-5 py-2 rounded-full bg-[#1c1d22] hover:bg-neutral-900 text-white text-xs font-black uppercase tracking-wider shadow-sm cursor-pointer"
                    >
                      Masuk untuk Tulis Ulasan
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer (Sticky Price & Action Buttons) */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <div>
              <span className="text-[10px] block font-bold text-neutral-400 uppercase tracking-wider">
                Total Harga
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-neutral-900">
                  {displayPrice}
                </span>
                <span className="text-xs font-bold text-neutral-500">
                  {product.priceUnit}
                </span>
                {(isFlashSaleActive || product.discountPercent) && (
                  <span className="text-xs text-neutral-400 line-through">
                    {originalDisplayPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-3 rounded-full border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-indigo-600" />
              <span>+ Keranjang</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onBuyNow(product);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#1c1d22] hover:bg-neutral-900 active:scale-95 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Beli Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
