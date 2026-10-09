export type Language = 'id' | 'en';

export interface Translations {
  [key: string]: {
    id: string;
    en: string;
  };
}

export const translations: Translations = {
  // TopBar
  'topbar.trust_badge': {
    id: '⚡ Garansi 100% Akun Legal • Pengiriman Instan 24/7',
    en: '⚡ 100% Legal Accounts Guarantee • 24/7 Instant Delivery',
  },
  'topbar.telegram_support': {
    id: 'Bantuan Telegram: @buybitsofficial',
    en: 'Telegram Support: @buybitsofficial',
  },
  'topbar.language': {
    id: 'Bahasa',
    en: 'Language',
  },
  'topbar.select_language': {
    id: 'Pilih Bahasa',
    en: 'Select Language',
  },
  'topbar.indonesian': {
    id: 'Bahasa Indonesia',
    en: 'Bahasa Indonesia',
  },
  'topbar.english': {
    id: 'English',
    en: 'English',
  },
  'topbar.indonesian_sub': {
    id: 'ID (Rupiah)',
    en: 'ID (Rupiah)',
  },
  'topbar.english_sub': {
    id: 'EN (US Dollar)',
    en: 'EN (US Dollar)',
  },

  // Header Navigation
  'nav.home': {
    id: 'Home',
    en: 'Home',
  },
  'nav.account_products': {
    id: 'Produk Akun',
    en: 'Account Products',
  },
  'nav.store': {
    id: 'Store',
    en: 'Store',
  },
  'nav.flash_sale': {
    id: 'Flash Sale',
    en: 'Flash Sale',
  },
  'nav.about': {
    id: 'About',
    en: 'About Us',
  },
  'nav.cart': {
    id: 'Keranjang',
    en: 'Cart',
  },
  'nav.sign_in': {
    id: 'Sign In',
    en: 'Sign In',
  },
  'nav.my_orders': {
    id: 'Riwayat & Kredensial Saya',
    en: 'My Orders & Credentials',
  },
  'nav.logout': {
    id: 'Keluar',
    en: 'Sign Out',
  },
  'nav.support_chat': {
    id: 'Chat Telegram @buybitsofficial',
    en: 'Chat Telegram @buybitsofficial',
  },

  // Announcement Bar
  'announcement.full_warranty': {
    id: 'GARANSI PENUH 100%',
    en: 'FULL WARRANTY 100%',
  },
  'announcement.instant_delivery': {
    id: 'PENGIRIMAN INSTAN',
    en: 'INSTANT DELIVERY',
  },
  'announcement.legal_accounts': {
    id: 'AKUN RESMI & LEGAL',
    en: 'LEGAL & PRIVATE ACCOUNTS',
  },
  'announcement.support_247': {
    id: 'BANTUAN 24/7',
    en: '24/7 FAST SUPPORT',
  },
  'announcement.best_price': {
    id: 'HARGA TERBAIK',
    en: 'BEST PRICE GUARANTEE',
  },
  'announcement.secure_payment': {
    id: 'PEMBAYARAN AMAN QRIS',
    en: 'SECURE AUTOMATED PAYMENT',
  },

  // Hero Section
  'hero.trusted_marketplace': {
    id: 'MARKETPLACE PRODUK DIGITAL & AI TERPERCAYA',
    en: 'TRUSTED DIGITAL PRODUCT MARKETPLACE',
  },
  'hero.title_part1': {
    id: 'AKSES AI',
    en: 'ACCESS AI',
  },
  'hero.title_part2': {
    id: '& SOFTWARE PREMIUM DENGAN HARGA TERBAIK',
    en: '& PREMIUM SOFTWARE AT THE BEST PRICE',
  },
  'hero.customers': {
    id: 'Pelanggan',
    en: 'Customers',
  },
  'hero.orders': {
    id: 'Pesanan Sukses',
    en: 'Orders',
  },
  'hero.rating': {
    id: 'Penilaian',
    en: 'Rating',
  },
  'hero.shop_now': {
    id: 'Belanja Sekarang',
    en: 'Shop Now',
  },
  'hero.how_to_order': {
    id: 'Cara Order',
    en: 'How to Order',
  },

  // Flash Sale Section
  'flash.badge': {
    id: 'ROTASI 12 JAM SEKALI • DISKON FLAT 80%',
    en: '12-HOUR ROTATION • FLAT 80% OFF',
  },
  'flash.title': {
    id: 'MEGA FLASH SALE 80% OFF',
    en: 'MEGA FLASH SALE 80% OFF',
  },
  'flash.time_remaining': {
    id: 'Sisa Waktu Batch Saat Ini:',
    en: 'Current Batch Time Remaining:',
  },
  'flash.hours': {
    id: 'Jam',
    en: 'Hours',
  },
  'flash.minutes': {
    id: 'Menit',
    en: 'Minutes',
  },
  'flash.seconds': {
    id: 'Detik',
    en: 'Seconds',
  },
  'flash.batch1_title': {
    id: 'Batch 1 (26 Produk)',
    en: 'Batch 1 (26 Products)',
  },
  'flash.batch2_title': {
    id: 'Batch 2 (26 Produk)',
    en: 'Batch 2 (26 Products)',
  },
  'flash.active_now': {
    id: 'SEDANG AKTIF',
    en: 'ACTIVE NOW',
  },
  'flash.upcoming': {
    id: 'BERIKUTNYA',
    en: 'UPCOMING',
  },
  'flash.view_all': {
    id: 'Lihat Semua Flash Sale',
    en: 'View All Flash Sale',
  },

  // Best Seller & Home Showcase
  'home.bestseller_badge': {
    id: 'Produk Terlaris di Indonesia',
    en: 'Best Seller in Indonesia',
  },
  'home.bestseller_title': {
    id: 'PRODUK UNGGULAN & TERLARIS',
    en: 'FEATURED & BEST-SELLER PRODUCTS',
  },
  'home.bestseller_subtitle': {
    id: 'Claude 3.7 Sonnet, ChatGPT Pro, Cursor Pro, Google AI Ultra & OpenAI API Keys.',
    en: 'Claude 3.7 Sonnet, ChatGPT Pro, Cursor Pro, Google AI Ultra & OpenAI API Keys.',
  },
  'home.view_all_products': {
    id: 'Lihat Semua Produk',
    en: 'View All Products',
  },
  'home.reviews_badge': {
    id: 'Ulasan Asli Pembeli Terverifikasi',
    en: 'Verified Customer Reviews',
  },
  'home.reviews_title': {
    id: 'Dipercaya Lebih Dari 10.000+ Developer & Profesional',
    en: 'Trusted by Over 10,000+ Developers & Professionals',
  },

  // Product Card
  'product.buy': {
    id: 'Beli',
    en: 'Buy Now',
  },
  'product.add_cart': {
    id: 'Tambah ke Keranjang',
    en: 'Add to Cart',
  },
  'product.sold': {
    id: 'Terjual:',
    en: 'Sold:',
  },
  'product.ready_stock': {
    id: 'Ready Stock',
    en: 'In Stock',
  },
  'product.view_details': {
    id: 'Lihat Detail Produk',
    en: 'View Product Details',
  },

  // Produk Akun View
  'produk_akun.title': {
    id: 'PRODUK AKUN RESMI & PREMIUM',
    en: 'OFFICIAL & PREMIUM ACCOUNT PRODUCTS',
  },
  'produk_akun.subtitle': {
    id: 'Akun streaming film, musik, video editor & sosial media bergaransi penuh',
    en: 'Premium streaming movies, music, video editors & social media accounts with full warranty',
  },
  'produk_akun.all': {
    id: 'Semua Produk',
    en: 'All Products',
  },
  'produk_akun.streaming': {
    id: 'Streaming & Video',
    en: 'Streaming & Video',
  },
  'produk_akun.sosmed': {
    id: 'Sosial Media',
    en: 'Social Media',
  },
  'produk_akun.search_placeholder': {
    id: 'Cari akun Netflix, Spotify, CapCut, WeTV, TikTok, Instagram...',
    en: 'Search Netflix, Spotify, CapCut, WeTV, TikTok, Instagram accounts...',
  },

  // Store / Menu View
  'store.search_placeholder': {
    id: 'Cari Claude, ChatGPT, Cursor, Netflix, Gemini...',
    en: 'Search Claude, ChatGPT, Cursor, Netflix, Gemini...',
  },
  'store.all_categories': {
    id: 'Semua Kategori',
    en: 'All Categories',
  },
  'store.all_brands': {
    id: 'Semua Brand',
    en: 'All Brands',
  },
  'store.sort_by': {
    id: 'Urutkan:',
    en: 'Sort by:',
  },
  'store.sort_recommended': {
    id: 'Rekomendasi',
    en: 'Recommended',
  },
  'store.sort_price_low': {
    id: 'Harga Terendah',
    en: 'Lowest Price',
  },
  'store.sort_price_high': {
    id: 'Harga Tertinggi',
    en: 'Highest Price',
  },
  'store.sort_sold': {
    id: 'Paling Laris',
    en: 'Best Selling',
  },
  'store.sort_rating': {
    id: 'Rating Tertinggi',
    en: 'Highest Rating',
  },
  'store.showing_products': {
    id: 'Menampilkan {count} produk',
    en: 'Showing {count} products',
  },

  // Product Detail Modal
  'detail.features': {
    id: 'Fitur Utama & Keunggulan',
    en: 'Key Features & Benefits',
  },
  'detail.specs': {
    id: 'Spesifikasi Akun',
    en: 'Account Specifications',
  },
  'detail.reviews': {
    id: 'Ulasan Pembeli',
    en: 'Customer Reviews',
  },
  'detail.warranty_title': {
    id: 'Garansi Penuh 100%',
    en: '100% Full Warranty',
  },
  'detail.delivery_title': {
    id: 'Pengiriman Instan Otomatis',
    en: 'Instant Automated Delivery',
  },
  'detail.write_review': {
    id: 'Tulis Ulasan Anda',
    en: 'Write Your Review',
  },
  'detail.submit_review': {
    id: 'Kirim Ulasan',
    en: 'Submit Review',
  },
  'detail.submitting': {
    id: 'Mengirim...',
    en: 'Submitting...',
  },
  'detail.need_login': {
    id: 'Masuk / Login terlebih dahulu untuk memberikan ulasan produk ini.',
    en: 'Please Sign In to leave a review for this product.',
  },

  // Cart Drawer
  'cart.title': {
    id: 'Keranjang Belanja',
    en: 'Shopping Cart',
  },
  'cart.selected_items': {
    id: '{count} item dipilih',
    en: '{count} items selected',
  },
  'cart.empty_title': {
    id: 'Keranjang Masih Kosong',
    en: 'Your Cart is Empty',
  },
  'cart.empty_desc': {
    id: 'Pilih produk akun AI favorit Anda dan dapatkan diskon flash sale hingga 80%.',
    en: 'Choose your favorite AI accounts and enjoy up to 80% off flash sales.',
  },
  'cart.start_shopping': {
    id: 'Mulai Belanja',
    en: 'Start Shopping',
  },
  'cart.total': {
    id: 'Total Pembayaran:',
    en: 'Total Amount:',
  },
  'cart.checkout_btn': {
    id: 'Lanjut ke Pembayaran',
    en: 'Proceed to Checkout',
  },

  // Checkout Modal
  'checkout.title': {
    id: 'Checkout & Pembayaran',
    en: 'Checkout & Payment',
  },
  'checkout.step_info': {
    id: 'Informasi Pemesan',
    en: 'Customer Information',
  },
  'checkout.step_payment': {
    id: 'Metode Pembayaran',
    en: 'Payment Method',
  },
  'checkout.full_name': {
    id: 'Nama Lengkap',
    en: 'Full Name',
  },
  'checkout.email': {
    id: 'Alamat Email (Untuk Pengiriman Kredensial)',
    en: 'Email Address (To Receive Credentials)',
  },
  'checkout.whatsapp': {
    id: 'Nomor WhatsApp (Opsional, Notifikasi Instan)',
    en: 'WhatsApp Number (Optional, Instant Alert)',
  },
  'checkout.order_summary': {
    id: 'Ringkasan Pesanan',
    en: 'Order Summary',
  },
  'checkout.continue_payment': {
    id: 'Lanjut ke Pembayaran',
    en: 'Continue to Payment',
  },
  'checkout.qris_instruction': {
    id: 'Scan QRIS Dinamis melalui aplikasi perbankan atau e-wallet Anda.',
    en: 'Scan the Dynamic QRIS with any mobile banking or e-wallet app.',
  },
  'checkout.payment_status_waiting': {
    id: 'Menunggu Pembayaran...',
    en: 'Awaiting Payment...',
  },

  // About View
  'about.badge': {
    id: 'Platform Penyedia Akun AI #1 di Indonesia',
    en: '#1 AI & Software Provider in Indonesia',
  },
  'about.title': {
    id: 'TENTANG BUYBITS.ID',
    en: 'ABOUT BUYBITS.ID',
  },
  'about.desc': {
    id: 'Kami adalah penyedia layanan langganan akun kecerdasan buatan (Artificial Intelligence) terlengkap dan terpercaya dengan sistem otomatisasi pengiriman instan.',
    en: 'We are Indonesia’s most trusted artificial intelligence subscription provider, featuring automated instant credential delivery and 24/7 support.',
  },
  'about.card1_title': {
    id: 'Full Warranty 100%',
    en: '100% Full Warranty',
  },
  'about.card1_desc': {
    id: 'Semua produk dilindungi garansi penggantian baru selama masa aktif. Tim support kami siap merespon dalam hitungan menit.',
    en: 'All products include replacement warranty throughout the active period. Fast support response within minutes.',
  },
  'about.card2_title': {
    id: 'Instant Delivery',
    en: 'Instant Delivery',
  },
  'about.card2_desc': {
    id: 'Sistem pengiriman kredensial bot otomatis mengirim email, password, dan panduan login ke layar, WhatsApp, serta Email detik itu juga.',
    en: 'Automated delivery bot instantly sends your login email, password, and instructions on screen and via email.',
  },
  'about.card3_title': {
    id: 'Legal & Private',
    en: 'Legal & Private',
  },
  'about.card3_desc': {
    id: 'Akun didaftarkan secara legal dengan metode pembayaran resmi internasional tanpa carding atau trik ilegal lainnya.',
    en: 'Accounts registered legally using official international payment methods without carding or illegal tricks.',
  },
  'about.faq_title': {
    id: 'Pertanyaan yang Sering Diajukan (FAQ)',
    en: 'Frequently Asked Questions (FAQ)',
  },

  // Footer
  'footer.description': {
    id: 'Platform penyedia akun AI resmi & software premium terpercaya di Indonesia dengan Dynamic QRIS instan dan bantuan Telegram 24/7.',
    en: 'Trusted platform for official AI subscriptions & premium software with instant automated delivery and 24/7 Telegram support.',
  },
  'footer.quick_menu': {
    id: 'Menu Utama',
    en: 'Quick Menu',
  },
  'footer.security_guarantee': {
    id: 'Jaminan Keamanan',
    en: 'Security Guarantee',
  },
  'footer.warranty_badge': {
    id: '100% Full Warranty Replace',
    en: '100% Full Replacement Warranty',
  },
  'footer.delivery_badge': {
    id: 'Instant Delivery via Web & Email',
    en: 'Instant Delivery via Web & Email',
  },
  'footer.legal_badge': {
    id: 'Legal & Private Accounts',
    en: 'Legal & Private Accounts',
  },
  'footer.copyright': {
    id: 'Hak cipta dilindungi undang-undang.',
    en: 'All rights reserved.',
  },

  // Order Lookup Modal
  'order_lookup.badge': {
    id: 'Layanan Mandiri Pelanggan',
    en: 'Customer Self-Service',
  },
  'order_lookup.title': {
    id: 'Lacak Pesanan & Kredensial AI',
    en: 'Track Order & AI Credentials',
  },
  'order_lookup.subtitle': {
    id: 'Masukkan Nomor Pesanan (Invoice) atau Email Anda untuk mengecek status dan mengambil kredensial akun AI.',
    en: 'Enter your Invoice / Order ID or Email to check status and retrieve your AI credentials.',
  },
  'order_lookup.order_id_label': {
    id: 'Nomor Pesanan / Order ID *',
    en: 'Order Number / Order ID *',
  },
  'order_lookup.order_id_placeholder': {
    id: 'Contoh: AIS-123456',
    en: 'e.g. AIS-123456',
  },
  'order_lookup.email_label': {
    id: 'Email Pelanggan',
    en: 'Customer Email',
  },
  'order_lookup.btn_search': {
    id: 'Cari Status Pesanan',
    en: 'Search Order Status',
  },
  'order_lookup.btn_searching': {
    id: 'Mencari Data Pesanan...',
    en: 'Searching Order Data...',
  },
  'order_lookup.status_fulfilled': {
    id: 'PRODUK DIKIRIM (FULFILLED)',
    en: 'DELIVERED (FULFILLED)',
  },
  'order_lookup.status_paid': {
    id: 'SUDAH DIBAYAR (PAID)',
    en: 'PAYMENT RECEIVED (PAID)',
  },
  'order_lookup.status_pending': {
    id: 'MENUNGGU PEMBAYARAN',
    en: 'AWAITING PAYMENT',
  },
  'order_lookup.status_expired': {
    id: 'KEDALUWARSA (EXPIRED)',
    en: 'EXPIRED',
  },
  'order_lookup.invoice_number': {
    id: 'Nomor Invoice',
    en: 'Invoice Number',
  },
  'order_lookup.buyer': {
    id: 'Pembeli',
    en: 'Customer',
  },
  'order_lookup.total_paid': {
    id: 'Total Bayar',
    en: 'Total Paid',
  },
  'order_lookup.ordered_products': {
    id: 'Produk yang Dipesan',
    en: 'Ordered Products',
  },
  'order_lookup.already_paid_q': {
    id: 'Sudah melakukan pembayaran?',
    en: 'Already completed your payment?',
  },
  'order_lookup.already_paid_desc': {
    id: 'Upload bukti transfer Anda agar sistem langsung mengirim akun AI Anda.',
    en: 'Upload your payment receipt so our system can deliver your credentials immediately.',
  },
  'order_lookup.upload_proof_btn': {
    id: 'Upload Bukti Sekarang',
    en: 'Upload Receipt Now',
  },
  'order_lookup.claim_now_title': {
    id: 'Ambil Akun Anda Sekarang',
    en: 'Claim Your Account Now',
  },
  'order_lookup.claim_whatsapp_btn': {
    id: 'Ambil Akun (WhatsApp)',
    en: 'Claim Account (WhatsApp)',
  },

  // Order Success Modal
  'order_success.paid_badge': {
    id: 'Pembayaran Berhasil Dikonfirmasi (PAID)',
    en: 'Payment Successfully Confirmed (PAID)',
  },
  'order_success.title': {
    id: 'Akun AI Anda Siap Digunakan!',
    en: 'Your AI Account Is Ready to Use!',
  },
  'order_success.claim_title': {
    id: 'Ambil Akun Anda Sekarang',
    en: 'Claim Your Account Now',
  },
  'order_success.claim_desc': {
    id: 'Klik tombol di bawah ini untuk terhubung langsung dengan Admin WhatsApp kami dan menerima akun Anda.',
    en: 'Click below to instantly connect with our WhatsApp admin and receive your login credentials.',
  },
  'order_success.claim_btn': {
    id: 'Ambil Akun via WhatsApp',
    en: 'Claim Account via WhatsApp',
  },
  'order_success.auto_check': {
    id: 'Atau cek status di menu Lacak Pesanan sewaktu-waktu.',
    en: 'Or check status anytime in the Track Order menu.',
  },

  // Auth Modal
  'auth.signin_title': {
    id: 'Masuk ke Akun Anda',
    en: 'Sign In to Your Account',
  },
  'auth.register_title': {
    id: 'Daftar Akun Baru',
    en: 'Create a New Account',
  },
  'auth.signin_subtitle': {
    id: 'Akses riwayat pesanan, lisensi akun AI, dan diskon flash sale member.',
    en: 'Access order history, AI account licenses, and exclusive member discounts.',
  },
  'auth.register_subtitle': {
    id: 'Daftar dalam 10 detik untuk kemudahan checkout & garansi pesanan.',
    en: 'Sign up in seconds for faster checkout and warranty tracking.',
  },
  'auth.google_login': {
    id: 'Masuk Cepat dengan Google',
    en: 'Quick Sign In with Google',
  },
  'auth.or': {
    id: 'atau dengan email',
    en: 'or with email',
  },
  'auth.name_label': {
    id: 'Nama Lengkap',
    en: 'Full Name',
  },
  'auth.email_label': {
    id: 'Alamat Email',
    en: 'Email Address',
  },
  'auth.phone_label': {
    id: 'Nomor WhatsApp / HP',
    en: 'WhatsApp / Phone Number',
  },
  'auth.password_label': {
    id: 'Password',
    en: 'Password',
  },
  'auth.signin_btn': {
    id: 'Masuk Sekarang',
    en: 'Sign In Now',
  },
  'auth.register_btn': {
    id: 'Daftar Akun',
    en: 'Register Account',
  },
  'auth.have_account': {
    id: 'Sudah punya akun? Masuk',
    en: 'Already have an account? Sign In',
  },
  'auth.no_account': {
    id: 'Belum punya akun? Daftar gratis',
    en: "Don't have an account? Register free",
  },

  // Upload Proof Modal
  'proof.title': {
    id: 'Upload Bukti Pembayaran',
    en: 'Upload Payment Receipt',
  },
  'proof.subtitle': {
    id: 'Unggah screenshot atau foto struk bukti transfer untuk verifikasi otomatis.',
    en: 'Upload a screenshot or photo of your transfer receipt for instant verification.',
  },
  'proof.order_id': {
    id: 'Nomor Pesanan / Order ID',
    en: 'Order Number / Order ID',
  },
  'proof.sender_name': {
    id: 'Nama Pemilik Rekening / Akun Pengirim',
    en: 'Sender Account Holder Name',
  },
  'proof.bank_source': {
    id: 'Bank / E-Wallet Pengirim',
    en: 'Sender Bank / E-Wallet',
  },
  'proof.dropzone': {
    id: 'Klik atau seret struk transfer ke sini',
    en: 'Click or drop receipt image here',
  },
  'proof.dropzone_sub': {
    id: 'Mendukung format PNG, JPG, JPEG, WEBP (Bisa juga tekan CTRL+V / Paste)',
    en: 'Supports PNG, JPG, JPEG, WEBP (You can also press CTRL+V to paste)',
  },
  'proof.submit_btn': {
    id: 'Kirim Bukti Pembayaran',
    en: 'Submit Payment Receipt',
  },
  'proof.submitting': {
    id: 'Memproses Bukti...',
    en: 'Processing Receipt...',
  },
};
