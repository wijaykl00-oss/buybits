import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Star,
  Users,
} from 'lucide-react';
import { Product, CartItem, User, Order, Review } from './types';
import { ALL_PRODUCTS, getFlashSaleCycleInfo } from './data/products';
import { Header } from './components/Header';
import { AnnouncementBar } from './components/AnnouncementBar';
import { FlashSaleSection } from './components/FlashSaleSection';
import { MenuView } from './components/MenuView';
import { AboutView } from './components/AboutView';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aistore_products_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ALL_PRODUCTS;
      }
    }
    return ALL_PRODUCTS;
  });

  const [activeTab, setActiveTab] = useState<'HOME' | 'MENU' | 'FLASH SALE' | 'ABOUT'>('HOME');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aistore_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aistore_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'IDR'>('USD');
  const [cycleInfo, setCycleInfo] = useState(getFlashSaleCycleInfo());

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('aistore_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save user to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aistore_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aistore_user');
    }
  }, [currentUser]);

  // Save products when reviews are added
  useEffect(() => {
    localStorage.setItem('aistore_products_v3', JSON.stringify(products));
  }, [products]);

  // Periodically check 12h flash sale rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleInfo(getFlashSaleCycleInfo());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product: Product) => {
    const isFlashSale = product.inFlashSaleBatch === cycleInfo.currentBatch;
    const finalPriceUsd = isFlashSale
      ? Number((product.priceUsd * 0.20).toFixed(2))
      : product.priceUsd;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          isFlashSale,
          finalPriceUsd,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    const isFlashSale = product.inFlashSaleBatch === cycleInfo.currentBatch;
    const finalPriceUsd = isFlashSale
      ? Number((product.priceUsd * 0.20).toFixed(2))
      : product.priceUsd;

    setCartItems([
      {
        product,
        quantity: 1,
        isFlashSale,
        finalPriceUsd,
      },
    ]);

    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleAddReview = (productId: string, newReview: Review) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...p.reviews];
          const newAvgRating = Number(
            (
              updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
              updatedReviews.length
            ).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: newAvgRating,
            soldCount: p.soldCount + 1,
          };
        }
        return p;
      })
    );

    if (selectedQuickViewProduct?.id === productId) {
      setSelectedQuickViewProduct((prev) =>
        prev
          ? {
              ...prev,
              reviews: [newReview, ...prev.reviews],
              soldCount: prev.soldCount + 1,
            }
          : null
      );
    }
  };

  const handleOrderSuccess = (order: Order) => {
    setActiveOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Top trending products for home showcase
  const topTrendingProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f4f0] text-neutral-900 selection:bg-indigo-500 selection:text-white">
      {/* Header with Navigation & Controls */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={() => setCurrentUser(null)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q && activeTab !== 'MENU') {
            setActiveTab('MENU');
          }
        }}
        currencyMode={currencyMode}
        onToggleCurrency={() =>
          setCurrencyMode((prev) => (prev === 'USD' ? 'IDR' : 'USD'))
        }
      />

      {/* BERANDA AWAL GUARANTEE ANNOUNCEMENT BANNER */}
      {activeTab === 'HOME' && <AnnouncementBar />}

      {/* MAIN VIEW CONTENT ACCORDING TO ACTIVE TAB */}
      <main className="flex-1">
        {/* 1. HOME VIEW */}
        {activeTab === 'HOME' && (
          <div>
            {/* FLASH SALE ROTATING SECTION IN BERANDA AWAL */}
            <FlashSaleSection
              products={products}
              onQuickView={(p) => setSelectedQuickViewProduct(p)}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
              onViewAllFlashSale={() => {
                setActiveTab('FLASH SALE');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currencyMode={currencyMode}
              compactMode={true}
            />

            {/* Popular Catalog Grid on Home */}
            <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-wider mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Paling Banyak Digunakan di Indonesia</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight">
                    PRODUK UNGGULAN & TERLARIS
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Claude 3.7 Sonnet, ChatGPT Plus, Cursor Pro, Google AI Ultra & OpenAI API Keys.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('MENU');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-900 font-bold text-xs shadow-xs transition-colors cursor-pointer w-fit"
                >
                  <span>Lihat Semua 56 Produk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* 8 Featured Exact Matching Product Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {topTrendingProducts.map((product) => (
                  <ProductCard
                    key={`home-${product.id}`}
                    product={product}
                    isFlashSaleActive={
                      product.inFlashSaleBatch === cycleInfo.currentBatch
                    }
                    onQuickView={(p) => setSelectedQuickViewProduct(p)}
                    onBuyNow={handleBuyNow}
                    onAddToCart={handleAddToCart}
                    currencyMode={currencyMode}
                  />
                ))}
              </div>
            </section>

            {/* Live Indonesian Trust & Customer Testimonials Bar */}
            <section className="py-12 bg-white border-t border-neutral-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-8">
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Ulasan Asli Pembeli Terverifikasi
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-tight mt-2">
                    Dipercaya Lebih Dari 10.000+ Developer & Profesional
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-[#faf9f5] rounded-3xl p-5 border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                          alt="Rian Pratama"
                          className="w-9 h-9 rounded-full object-cover border border-neutral-300"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900">
                            Rian Pratama
                          </h4>
                          <p className="text-[10px] text-neutral-500">
                            Jakarta Selatan • Verified Buyer
                          </p>
                        </div>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                      "Claude Pro nya beneran private legal, batas prompt luas banget buat bantu skripsi coding machine learning saya. QRIS otomatis langsung masuk!"
                    </p>
                  </div>

                  <div className="bg-[#faf9f5] rounded-3xl p-5 border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
                          alt="Fajar Nugroho"
                          className="w-9 h-9 rounded-full object-cover border border-neutral-300"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900">
                            Fajar Nugroho
                          </h4>
                          <p className="text-[10px] text-neutral-500">
                            Bandung • Verified Buyer
                          </p>
                        </div>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                      "Cursor Pro & Claude Max nya mantul abis. Fitur tab completion jalan mulus, response time kencang dan gak pernah kena limit token. Hemat jutaan rupiah!"
                    </p>
                  </div>

                  <div className="bg-[#faf9f5] rounded-3xl p-5 border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                          alt="Dewi Anggraini"
                          className="w-9 h-9 rounded-full object-cover border border-neutral-300"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900">
                            Dewi Anggraini
                          </h4>
                          <p className="text-[10px] text-neutral-500">
                            Surabaya • Verified Buyer
                          </p>
                        </div>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                      "Sudah langganan ke-3 kali disini. Bayar QRIS langsung otomatis terverifikasi detik itu juga tanpa perlu konfirmasi manual ribet. Recommended seller!"
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. MENU CATALOG VIEW */}
        {activeTab === 'MENU' && (
          <MenuView
            products={products}
            onQuickView={(p) => setSelectedQuickViewProduct(p)}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            currencyMode={currencyMode}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentFlashSaleBatch={cycleInfo.currentBatch}
          />
        )}

        {/* 3. FLASH SALE FULL VIEW */}
        {activeTab === 'FLASH SALE' && (
          <FlashSaleSection
            products={products}
            onQuickView={(p) => setSelectedQuickViewProduct(p)}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            currencyMode={currencyMode}
            compactMode={false}
          />
        )}

        {/* 4. ABOUT VIEW */}
        {activeTab === 'ABOUT' && <AboutView />}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1c1d22] text-white border-t border-neutral-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-lg font-black tracking-tight">
                  BUYBITS<span className="text-indigo-400">.ID</span>
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Platform penyedia akun AI resmi terlengkap di Indonesia dengan sistem pembayaran QRIS otomatis dan pengiriman kredensial instan.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-neutral-300 mb-3">
                Menu Utama
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <button
                    onClick={() => setActiveTab('HOME')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    HOME
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('MENU')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    MENU (Semua Produk)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('FLASH SALE')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    FLASH SALE (Diskon 80%)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('ABOUT')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    ABOUT (Tentang & Garansi)
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-neutral-300 mb-3">
                Jaminan Keamanan
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Full Warranty Replace</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Instant Delivery via WA/Email</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Legal & Private Accounts</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>QRIS & Virtual Account Aman</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-neutral-300 mb-3">
                Layanan Pelanggan 24/7
              </h4>
              <p className="text-xs text-neutral-400 mb-3">
                Ada pertanyaan atau butuh bantuan aktivasi? Hubungi kami kapan saja.
              </p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>WhatsApp Support 24/7</span>
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
            <p>© {new Date().getFullYear()} BUYBITS.ID. All rights reserved.</p>
            <p>
              Kurs Referensi: $1 = Rp 13.948 • QRIS Standar Bank Indonesia
            </p>
          </div>
        </div>
      </footer>

      {/* POPUP MODALS */}
      {/* 1. Product Detail Modal */}
      <ProductDetailModal
        product={selectedQuickViewProduct}
        isOpen={!!selectedQuickViewProduct}
        onClose={() => setSelectedQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onAddReview={handleAddReview}
        currencyMode={currencyMode}
        isFlashSaleActive={
          selectedQuickViewProduct?.inFlashSaleBatch === cycleInfo.currentBatch
        }
      />

      {/* 2. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        currencyMode={currencyMode}
      />

      {/* 3. Checkout Modal with Real-time QRIS IDR Conversion */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currentUser={currentUser}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 4. Order Success & Credentials Delivery Modal */}
      <OrderSuccessModal
        order={activeOrder}
        isOpen={!!activeOrder}
        onClose={() => setActiveOrder(null)}
      />

      {/* 5. User Auth (Login/Register) Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    </div>
  );
}
