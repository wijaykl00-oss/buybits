import React, { useState } from 'react';
import {
  ShoppingCart,
  Zap,
  Sparkles,
  Search,
  User as UserIcon,
  Menu as MenuIcon,
  X,
  Shield,
  DollarSign,
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
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: Array<'HOME' | 'MENU' | 'FLASH SALE' | 'ABOUT'> = [
    'HOME',
    'MENU',
    'FLASH SALE',
    'ABOUT',
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('HOME')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-neutral-900 flex items-center gap-1.5">
                  AISTORE<span className="text-indigo-600">.ID</span>
                </span>
                <span className="text-[10px] block font-semibold text-neutral-500 tracking-wider uppercase">
                  Official AI Accounts
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Tabs: HOME, MENU, FLASH SALE, ABOUT */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100/90 p-1.5 rounded-full border border-neutral-200/80">
            {navItems.map((tab) => {
              const isActive = activeTab === tab;
              const isFlash = tab === 'FLASH SALE';

              return (
                <button
                  key={tab}
                  id={`nav-tab-${tab.toLowerCase().replace(' ', '-')}`}
                  onClick={() => onSelectTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-black tracking-wider transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? isFlash
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm'
                        : 'bg-[#1c1d22] text-white shadow-sm'
                      : isFlash
                      ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/80'
                  }`}
                >
                  {isFlash && (
                    <Zap className="w-3.5 h-3.5 fill-current animate-bounce" />
                  )}
                  {tab}
                  {isFlash && (
                    <span className="bg-amber-400 text-neutral-950 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                      -80%
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Search, Currency Toggle, User, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input on Desktop */}
            <div className="hidden lg:flex items-center relative w-56">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari AI (Claude, Cursor...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-100 border border-neutral-200 rounded-full focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-neutral-800 placeholder:text-neutral-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 text-neutral-400 hover:text-neutral-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Currency Toggle (USD / IDR) */}
            <button
              onClick={onToggleCurrency}
              id="currency-toggle-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-bold text-neutral-800 transition-colors shadow-2xs cursor-pointer"
              title="Ganti mata uang tampilan (USD / IDR)"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currencyMode}</span>
              <span className="text-[10px] text-neutral-400 font-normal">
                {currencyMode === 'USD' ? '($)' : '(Rp)'}
              </span>
            </button>

            {/* User Account / Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-indigo-400"
                  />
                  <span className="hidden sm:inline max-w-[90px] truncate">
                    {currentUser.name}
                  </span>
                  <span className="bg-emerald-500 w-2 h-2 rounded-full" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 border-b border-neutral-100">
                      <p className="text-xs font-bold text-neutral-900">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-neutral-500 truncate">
                        {currentUser.email}
                      </p>
                      <div className="flex items-center gap-1 mt-1.5 text-[10px] font-bold text-emerald-600">
                        <Shield className="w-3 h-3" />
                        <span>Pembeli Terverifikasi</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1"
                    >
                      Keluar / Ganti Akun
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="btn-open-login"
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-neutral-600" />
                <span>Masuk / Ulasan</span>
              </button>
            )}

            {/* Cart Button with Count Badge */}
            <button
              id="btn-header-cart"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white transition-transform active:scale-95 shadow-sm cursor-pointer"
              title="Buka Keranjang Belanja"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200 space-y-2">
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari AI accounts..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-100 border border-neutral-200 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      onSelectTab(tab);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider text-left flex items-center justify-between ${
                      isActive
                        ? 'bg-[#1c1d22] text-white'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    <span>{tab}</span>
                    {tab === 'FLASH SALE' && (
                      <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">
                        80% OFF
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
