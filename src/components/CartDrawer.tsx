import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { formatUsd, formatIdr, formatUsdAsIdr, convertUsdToIdr } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  currencyMode: 'USD' | 'IDR';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currencyMode,
}) => {
  if (!isOpen) return null;

  const totalUsd = items.reduce(
    (sum, item) => sum + item.finalPriceUsd * item.quantity,
    0
  );
  const totalIdr = convertUsdToIdr(totalUsd);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Cart Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-neutral-900 uppercase tracking-tight">
                  Keranjang Belanja
                </h3>
                <p className="text-[11px] text-neutral-500 font-medium">
                  {items.length} item dipilih
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-neutral-800">
                  Keranjang Masih Kosong
                </h4>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Pilih produk akun AI favorit Anda dan dapatkan diskon flash sale hingga 80%.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-[#1c1d22] text-white text-xs font-bold uppercase tracking-wider shadow-sm mt-2"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice =
                  currencyMode === 'IDR'
                    ? formatUsdAsIdr(item.finalPriceUsd)
                    : formatUsd(item.finalPriceUsd);

                return (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-3 relative group"
                  >
                    <BrandLogo brand={item.product.brand} size="sm" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-black text-neutral-900 uppercase truncate">
                          {item.product.name}
                        </h4>
                        {item.isFlashSale && (
                          <span className="text-[9px] font-black bg-rose-500 text-white px-1.5 py-0.2 rounded">
                            -80%
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-semibold text-neutral-500 block">
                        {item.product.durationBadge}
                      </span>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-black text-neutral-900">
                          {itemPrice}
                        </span>

                        {/* Quantity Counter */}
                        <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-neutral-100 text-neutral-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-neutral-100 text-neutral-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-neutral-400 hover:text-rose-600 p-1.5 transition-colors"
                      title="Hapus item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal USD:</span>
                  <span className="font-bold">{formatUsd(totalUsd)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Kurs Konversi ($1 = Rp 16.250):</span>
                  <span className="font-bold text-emerald-600">Otomatis QRIS</span>
                </div>
                <div className="flex justify-between text-neutral-900 text-sm font-black pt-2 border-t border-neutral-200">
                  <span>Total Bayar (IDR):</span>
                  <span className="text-base text-indigo-600">
                    {formatIdr(totalIdr)}
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Instant Delivery ke Email & WhatsApp setelah bayar.</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 rounded-full bg-[#1c1d22] hover:bg-neutral-900 text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
              >
                <span>Lanjut ke Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
