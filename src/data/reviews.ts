import { Review } from '../types';

export const INDONESIAN_REVIEWS_POOL: Review[] = [
  {
    id: 'rev-1',
    userName: 'Rian Pratama',
    userCity: 'Jakarta Selatan',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 jam yang lalu',
    comment: 'Gila cepet banget akunnya langsung dikirim via WhatsApp & Email! Claude Pro nya beneran private legal, batas prompt gede banget buat bantu skripsi coding machine learning saya.',
    isVerified: true,
    productVariant: 'Private 1 Bulan'
  },
  {
    id: 'rev-2',
    userName: 'Dewi Anggraini',
    userCity: 'Surabaya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '5 jam yang lalu',
    comment: 'Sudah langganan ke-3 kali disini. Bayar QRIS langsung otomatis terverifikasi detik itu juga tanpa perlu konfirmasi manual ribet. Recommended seller!',
    isVerified: true,
    productVariant: '1 Tahun Full Garansi'
  },
  {
    id: 'rev-3',
    userName: 'Fajar Nugroho',
    userCity: 'Bandung',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Kemarin',
    comment: 'Cursor Pro & Claude Max nya mantul abis. Fitur tab completion jalan mulus, response time kencang dan gak pernah kena limit token. Hemat jutaan rupiah!',
    isVerified: true,
    productVariant: 'Cursor Pro Edition'
  },
  {
    id: 'rev-4',
    userName: 'Bima Santoso',
    userCity: 'Yogyakarta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Kemarin',
    comment: 'Awalnya ragu karena harga promo flash sale nya gila murah 80%, ternyata beneran akun original official dan dipandu admin sampai login berhasil. Garansi amanah.',
    isVerified: true,
    productVariant: 'Promo Flash Sale 80%'
  },
  {
    id: 'rev-5',
    userName: 'Nadia Salsabila',
    userCity: 'Medan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 hari yang lalu',
    comment: 'ChatGPT Plus GPT-5.5 & fitur Sora nya aktif semua! Akses lancar gak ada kendala sama sekali. Terima kasih banyak admin support 24/7 nya ramah banget.',
    isVerified: true,
    productVariant: 'ChatGPT Plus Private'
  },
  {
    id: 'rev-6',
    userName: 'Hendra Wijaya',
    userCity: 'Semarang',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 hari yang lalu',
    comment: 'API Key OpenAI & DeepSeek saldo utuh tanpa expired. Langsung dipasang ke backend n8n dan bot Telegram langsung gaspol!',
    isVerified: true,
    productVariant: '10.000 Requests'
  },
  {
    id: 'rev-7',
    userName: 'Siti Nurhaliza',
    userCity: 'Malang',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '4 hari yang lalu',
    comment: 'Leonardo AI Pro Seedance 2.0 jalan lancar buat generate aset desain klien agensi saya. Kualitas gambar tajem dan kredit banyak.',
    isVerified: true,
    productVariant: 'Artisan Yearly'
  },
  {
    id: 'rev-8',
    userName: 'Aditya Permana',
    userCity: 'Tangerang',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    rating: 4,
    date: '5 hari yang lalu',
    comment: 'Proses cepat 1 menit langsung jadi. Sempat bingung cara ganti password, tapi dibantu admin via WhatsApp dalam hitungan menit.',
    isVerified: true,
    productVariant: 'Private • No Sharing'
  }
];

export function getRandomReviews(count: number = 3): Review[] {
  const shuffled = [...INDONESIAN_REVIEWS_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
