import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Zap,
  Download,
  Key,
  Mail,
  Lock,
  Send,
  MessageCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '../types';
import { formatIdr } from '../data/products';

interface OrderSuccessModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && order) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const handleCopyCredential = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const telegramUrl = `https://t.me/buybitsofficial`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-neutral-200 relative my-auto">
        {/* Top Success Header */}
        <div className="text-center pb-4 border-b border-neutral-100">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Pembayaran Berhasil Dikonfirmasi (PAID)
          </span>
          <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight mt-1">
            Akun AI Anda Siap Digunakan!
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            No. Invoice: <span className="font-bold text-neutral-800 font-mono">{order.orderNumber}</span> • {order.createdAt}
          </p>
        </div>

        {/* PROMINENT TELEGRAM REDIRECTION BANNER */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#2AABEE]/15 via-[#229ED9]/10 to-indigo-50 border border-[#2AABEE]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#2AABEE] text-white flex items-center justify-center shadow-md flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-[-1px] translate-y-[1px]">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-black text-neutral-900 block uppercase">
                Bantuan & Garansi di Telegram
              </span>
              <p className="text-[11px] text-neutral-600">
                Hubungi <b>@buybitsofficial</b> untuk panduan aktivasi atau klaim garansi 24/7.
              </p>
            </div>
          </div>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 flex-shrink-0 cursor-pointer"
          >
            <span>Buka Telegram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Credentials Delivery List */}
        <div className="my-4 space-y-4 max-h-[42vh] overflow-y-auto pr-1">
          {order.credentials?.map((cred, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#f8f9fc] border border-indigo-100 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-black text-neutral-900 uppercase">
                    {cred.serviceName}
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Status: AKTIF
                </span>
              </div>

              {/* Account Credentials Box */}
              <div className="bg-white p-3 rounded-xl border border-neutral-200 space-y-2 text-xs">
                {cred.licenseKey ? (
                  <div>
                    <span className="text-[10px] font-bold text-neutral-500 block uppercase">
                      API Secret Key:
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-0.5 bg-neutral-50 p-2 rounded-lg font-mono text-[11px] font-bold text-neutral-900 overflow-x-auto">
                      <span>{cred.licenseKey}</span>
                      <button
                        onClick={() =>
                          handleCopyCredential(cred.licenseKey!, idx)
                        }
                        className="p-1 rounded hover:bg-neutral-200 text-neutral-600 flex-shrink-0"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 block uppercase">
                        Email Login:
                      </span>
                      <div className="flex items-center justify-between gap-2 mt-0.5 bg-neutral-50 p-2 rounded-lg font-mono text-xs font-bold text-neutral-900">
                        <span>{cred.accountEmail}</span>
                        <button
                          onClick={() =>
                            handleCopyCredential(cred.accountEmail || '', idx * 10 + 1)
                          }
                          className="p-1 rounded hover:bg-neutral-200 text-neutral-600"
                        >
                          {copiedIndex === idx * 10 + 1 ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 block uppercase">
                        Password Akun:
                      </span>
                      <div className="flex items-center justify-between gap-2 mt-0.5 bg-neutral-50 p-2 rounded-lg font-mono text-xs font-bold text-neutral-900">
                        <span>{cred.accountPassword}</span>
                        <button
                          onClick={() =>
                            handleCopyCredential(cred.accountPassword || '', idx * 10 + 2)
                          }
                          className="p-1 rounded hover:bg-neutral-200 text-neutral-600"
                        >
                          {copiedIndex === idx * 10 + 2 ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-neutral-100 text-[11px]">
                  <span className="text-neutral-500">Masa Garansi:</span>
                  <span className="font-bold text-neutral-800">
                    {cred.expiresAt}
                  </span>
                </div>

                <a
                  href={cred.loginUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors mt-2"
                >
                  <span>Buka Halaman Login Resmi</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-[10px] text-neutral-500 leading-tight">
                ℹ️ {cred.instructions}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Delivery Notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2.5 text-xs text-emerald-900 mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            Salinan kredensial juga otomatis dikirim ke Email <b>{order.customerEmail}</b>.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Hubungi Telegram @buybitsofficial</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-full bg-[#1c1d22] hover:bg-neutral-900 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            Selesai & Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
