import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Send, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TopBarProps {
  currencyMode: 'USD' | 'IDR';
  onSetCurrency: (curr: 'USD' | 'IDR') => void;
  onOpenOrderLookup?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currencyMode,
  onSetCurrency,
  onOpenOrderLookup,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (lang: 'id' | 'en') => {
    setLanguage(lang);
    if (lang === 'id' && currencyMode !== 'IDR') {
      onSetCurrency('IDR');
    } else if (lang === 'en' && currencyMode !== 'USD') {
      onSetCurrency('USD');
    }
    setDropdownOpen(false);
  };

  return (
    <div className="w-full bg-[#0f0f11] text-neutral-300 text-[11px] sm:text-xs border-b border-neutral-800/90 z-50 select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
        {/* Left Side: Guarantees & Notice */}
        <div className="flex items-center gap-2 sm:gap-4 truncate">
          <div className="flex items-center gap-1.5 text-neutral-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="font-semibold text-white tracking-wide truncate">
              {t('topbar.trust_badge')}
            </span>
          </div>

          <span className="hidden md:inline text-neutral-700">|</span>

          <a
            href="https://t.me/buybitsofficial"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-neutral-400 hover:text-[#2AABEE] transition-colors"
          >
            <Send className="w-3 h-3 text-[#2AABEE]" />
            <span>{t('topbar.telegram_support')}</span>
          </a>
        </div>

        {/* Right Side: Quick Action & Clickable Language Menu */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Quick Order Lookup shortcut */}
          {onOpenOrderLookup && (
            <button
              onClick={onOpenOrderLookup}
              className="hidden sm:inline-flex text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer mr-1"
            >
              {language === 'id' ? 'Lacak Pesanan' : 'Track Order'}
            </button>
          )}

          {/* Quick Dual Pill Toggle for 1-Click Fast Switch */}
          <div className="hidden xs:flex items-center bg-neutral-900 border border-neutral-800 rounded-full p-0.5">
            <button
              onClick={() => handleSelectLanguage('id')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                language === 'id'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Ganti ke Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>

            <button
              onClick={() => handleSelectLanguage('en')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Switch to English"
            >
              <span>🇺🇸</span>
              <span>EN</span>
            </button>
          </div>

          {/* Interactive Click Dropdown Menu at the Very Top */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="top-language-menu-btn"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-white text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-500"
              aria-label="Pilih Bahasa / Select Language"
              aria-expanded={dropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span className="flex items-center gap-1 font-semibold">
                {language === 'id' ? (
                  <>
                    <span>🇮🇩</span>
                    <span className="hidden sm:inline">Bahasa Indonesia</span>
                    <span className="sm:hidden">ID</span>
                  </>
                ) : (
                  <>
                    <span>🇺🇸</span>
                    <span className="hidden sm:inline">English</span>
                    <span className="sm:hidden">EN</span>
                  </>
                )}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180 text-red-400' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu Container */}
            {dropdownOpen && (
              <div
                id="top-language-dropdown"
                className="absolute right-0 mt-1.5 w-56 sm:w-60 bg-[#16161a] border border-neutral-700 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 font-space">
                  {t('topbar.select_language')}
                </div>

                <div className="mt-1 space-y-1">
                  {/* Option 1: Bahasa Indonesia */}
                  <button
                    onClick={() => handleSelectLanguage('id')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                      language === 'id'
                        ? 'bg-red-600/15 border border-red-500/40 text-white font-bold'
                        : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">🇮🇩</span>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Bahasa Indonesia</span>
                          {language === 'id' && (
                            <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                              AKTIF
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          IDR (Rupiah • Rp)
                        </div>
                      </div>
                    </div>
                    {language === 'id' && <Check className="w-4 h-4 text-red-400" />}
                  </button>

                  {/* Option 2: English */}
                  <button
                    onClick={() => handleSelectLanguage('en')}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                      language === 'en'
                        ? 'bg-red-600/15 border border-red-500/40 text-white font-bold'
                        : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">🇺🇸</span>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>English</span>
                          {language === 'en' && (
                            <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          USD (US Dollar • $)
                        </div>
                      </div>
                    </div>
                    {language === 'en' && <Check className="w-4 h-4 text-red-400" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
