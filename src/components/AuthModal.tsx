import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, User as UserIcon, Phone, Sparkles } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: name.trim() || (isRegister ? 'Pelanggan Baru' : email.split('@')[0] || 'Member AI Store'),
        email: email.trim() || 'user@aistore.id',
        phone: phone.trim() || '081234567890',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || email || 'random')}`,
        isVerifiedBuyer: true,
      };

      onLoginSuccess(newUser);
      setIsLoading(false);
      onClose();
    }, 600);
  };

  const handleSelectGoogleAccount = (gName: string, gEmail: string, gAvatar: string) => {
    setIsLoading(true);
    setShowGooglePicker(false);
    setTimeout(() => {
      const googleUser: User = {
        id: `user-google-${Date.now()}`,
        name: gName,
        email: gEmail,
        phone: '081298765432',
        avatar: gAvatar,
        isVerifiedBuyer: true,
      };
      onLoginSuccess(googleUser);
      setIsLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">
            {isRegister ? 'Daftar Akun Terverifikasi' : 'Masuk Akun Buybits'}
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
            Masuk dengan akun terverifikasi untuk kemudahan transaksi, riwayat akun, dan lencana <span className="font-bold text-emerald-600">Verified Buyer</span>.
          </p>
        </div>

        {showGooglePicker ? (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-center pb-2 border-b border-neutral-100">
              <svg className="w-8 h-8 mx-auto mb-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <h4 className="text-base font-black text-neutral-900">
                Pilih Akun Google
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                untuk melanjutkan ke <span className="font-bold text-neutral-800">BUYBITS.ID</span>
              </p>
            </div>

            <div className="space-y-2 py-2">
              <button
                type="button"
                onClick={() =>
                  handleSelectGoogleAccount(
                    'Bayu Saputra',
                    'bayu.saputra@gmail.com',
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
                  )
                }
                className="w-full flex items-center gap-3 p-3 rounded-2xl border border-neutral-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left group cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                  alt="Bayu Saputra"
                  className="w-10 h-10 rounded-full object-cover border border-neutral-300 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors">
                    Bayu Saputra
                  </p>
                  <p className="text-[11px] text-neutral-500 truncate">
                    bayu.saputra@gmail.com
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Terverifikasi
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSelectGoogleAccount(
                    'Rian Pratama',
                    'rian.pratama@gmail.com',
                    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80'
                  )
                }
                className="w-full flex items-center gap-3 p-3 rounded-2xl border border-neutral-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left group cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
                  alt="Rian Pratama"
                  className="w-10 h-10 rounded-full object-cover border border-neutral-300 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors">
                    Rian Pratama
                  </p>
                  <p className="text-[11px] text-neutral-500 truncate">
                    rian.pratama@gmail.com
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Terverifikasi
                </span>
              </button>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowGooglePicker(false)}
                className="text-xs font-bold text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
              >
                ← Kembali ke Form
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSelectGoogleAccount(
                    'Pengguna Google',
                    'user.google@gmail.com',
                    'https://api.dicebear.com/7.x/bottts/svg?seed=google'
                  )
                }
                className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Gunakan Akun Google Lain
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Quick Google Login */}
            <button
              type="button"
              onClick={() => setShowGooglePicker(true)}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-[0.99] text-neutral-800 text-xs font-bold flex items-center justify-center gap-3 transition-all shadow-xs mb-4 cursor-pointer hover:border-neutral-400"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Masuk dengan Google (1-Klik)</span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-neutral-200" />
              <span className="px-3 text-[10px] font-bold text-neutral-400 uppercase">
                atau gunakan email
              </span>
              <div className="flex-1 border-t border-neutral-200" />
            </div>
          </>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Pratama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                No. WhatsApp (Pengiriman Akun)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="0812xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-[#1c1d22] hover:bg-neutral-900 text-white text-xs font-black uppercase tracking-wider transition-all mt-4 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>{isRegister ? 'Buat Akun & Verifikasi' : 'Masuk Akun'}</span>
              </>
            )}
          </button>
        </form>

        {/* Switch between Login and Register */}
        <div className="text-center mt-5 pt-4 border-t border-neutral-100 text-xs text-neutral-600">
          {isRegister ? (
            <p>
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Masuk disini
              </button>
            </p>
          ) : (
            <p>
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Daftar sekarang
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
