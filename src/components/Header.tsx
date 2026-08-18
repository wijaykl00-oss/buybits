import React, { useState } from 'react';
import {
  ShoppingCart,
  Zap,
  Search,
  User as UserIcon,
  Menu as MenuIcon,
  X,
  Shield,
  DollarSign,
  Package,
  Globe,
  LogIn,
  Send,
} from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  activeTab: 'HOME' | 'MENU' | 'FLASH SALE' | 'ABOUT';
  onSelectTab: (tab: 'HOME' | 'MENU' | 'FLASH SALE' | 'ABOUT') => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: User | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currencyMode: 'USD' | 'IDR';
  onToggleCurrency: () => void;
  onOpenOrderLookup: () => void;
  onOpenAdminDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  currentUser,
  onOpenAuthModal,
  onLogout,
  searchQuery,
  onSearchChange,
  currencyMode,
  onToggleCurrency,
  onOpenOrderLookup,
  onOpenAdminDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F4F3EE]/95 backdrop-blur-md border-b border-neutral-300 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand: buybitsofficial with Red Star Icon */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('HOME')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              {/* Red Star Logo */}
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform p-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full text-white"
                >
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-neutral-900 leading-none font-display">
                  buybits<span className="text-red-600 font-black">official</span>
                </span>
                <span className="text-[9px] font-bold text-neutral-500 tracking-wider uppercase mt-0.5 font-space">
                  AI & Software Market
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Tabs: Home, Store, Flash Sale (HOT), About */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-bold text-neutral-800 font-space">
            <button
              onClick={() => onSelectTab('HOME')}
              className={`relative py-1.5 transition-colors cursor-pointer ${
                activeTab === 'HOME'
                  ? 'text-red-600 font-black'
                  : 'text-neutral-700 hover:text-neutral-950'
              }`}
            >
              <span>Home</span>
              {activeTab === 'HOME' && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-red-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('MENU')}
              className={`relative py-1.5 transition-colors cursor-pointer ${
                activeTab === 'MENU'
                  ? 'text-red-600 font-black'
                  : 'text-neutral-700 hover:text-neutral-950'
              }`}
            >
              <span>Store</span>
              {activeTab === 'MENU' && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-red-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('FLASH SALE')}
              className={`relative py-1.5 transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'FLASH SALE'
                  ? 'text-red-600 font-black'
                  : 'text-neutral-700 hover:text-neutral-950'
              }`}
            >
              <span>Flash Sale</span>
              <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs leading-none">
                HOT
              </span>
              {activeTab === 'FLASH SALE' && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-red-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('ABOUT')}
              className={`relative py-1.5 transition-colors cursor-pointer ${
                activeTab === 'ABOUT'
                  ? 'text-red-600 font-black'
                  : 'text-neutral-700 hover:text-neutral-950'
              }`}
            >
              <span>About</span>
              {activeTab === 'ABOUT' && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-red-600 rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency / Language Toggle Pill (EN / ID) */}
            <button
              onClick={onToggleCurrency}
              id="header-currency-btn"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-800 transition-colors shadow-2xs cursor-pointer"
              title="Ganti mata uang / bahasa"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-600" />
              <span>{currencyMode === 'USD' ? 'EN ($)' : 'ID (Rp)'}</span>
              <span className="text-[10px] text-neutral-400">▾</span>
            </button>

            {/* Cart Pill with Count Badge */}
            <button
              onClick={onOpenCart}
              id="header-cart-btn"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-900 transition-transform active:scale-95 shadow-2xs cursor-pointer"
              title="Buka Keranjang"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-neutral-700" />
              <span>Cart</span>
              <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
                {cartCount}
              </span>
            </button>

            {/* Telegram Button linking to @buybitsofficial */}
            <a
              href="https://t.me/buybitsofficial"
              target="_blank"
              rel="noreferrer"
              id="header-telegram-btn"
              className="w-9 h-9 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer"
              title="Hubungi Admin Telegram @buybitsofficial"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 translate-x-[-1px] translate-y-[1px]"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>

            {/* Cek Pesanan */}
            <button
              onClick={onOpenOrderLookup}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-800 transition-colors shadow-2xs cursor-pointer"
              title="Lacak Pesanan"
            >
              <Package className="w-3.5 h-3.5 text-neutral-600" />
              <span>Cek Pesanan</span>
            </button>

            {/* Admin Dashboard */}
            <button
              onClick={onOpenAdminDashboard}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 bg-[#141414] hover:bg-black text-xs font-bold text-white transition-colors shadow-2xs cursor-pointer"
              title="Admin Panel"
            >
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span>Admin</span>
            </button>

            {/* User Login / Profile Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-300 text-neutral-900 text-xs font-bold hover:bg-neutral-50 transition-colors cursor-pointer shadow-2xs"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-red-500"
                  />
                  <span className="hidden sm:inline max-w-[80px] truncate">
                    {currentUser.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 border-b border-neutral-100">
                      <p className="text-xs font-bold text-neutral-900">{currentUser.name}</p>
                      <p className="text-[11px] text-neutral-500 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenOrderLookup();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
                    >
                      Riwayat & Kredensial Saya
                    </button>
                    <a
                      href="https://t.me/buybitsofficial"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-left px-3 py-2 text-xs font-bold text-[#2AABEE] hover:bg-sky-50 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <span>Support @buybitsofficial</span>
                    </a>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="btn-open-login"
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#141414] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-red-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-200/60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-300 space-y-3">
            <div className="grid grid-cols-2 gap-2 font-space">
              <button
                onClick={() => {
                  onSelectTab('HOME');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-white text-xs font-bold text-left border border-neutral-300"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onSelectTab('MENU');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-white text-xs font-bold text-left border border-neutral-300"
              >
                Store
              </button>
              <button
                onClick={() => {
                  onSelectTab('FLASH SALE');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-white text-xs font-bold text-left border border-neutral-300 flex items-center justify-between"
              >
                <span>Flash Sale</span>
                <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  HOT
                </span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('ABOUT');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-white text-xs font-bold text-left border border-neutral-300"
              >
                About
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-300">
              <a
                href="https://t.me/buybitsofficial"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-[#2AABEE] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Chat Telegram @buybitsofficial</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderLookup();
                }}
                className="w-full py-2.5 bg-white border border-neutral-300 text-neutral-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Package className="w-3.5 h-3.5" />
                <span>Cek Status Pesanan</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminDashboard();
                }}
                className="w-full py-2.5 bg-[#141414] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-red-400" />
                <span>Admin Control Panel</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
