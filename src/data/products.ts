import { Product } from '../types';
import { INDONESIAN_REVIEWS_POOL } from './reviews';

export const ALL_PRODUCTS: Product[] = [
  // ==========================================
  // FLASH SALE / PROMO SPECIALS (BATCH 1)
  // ==========================================
  {
    id: "gemini-pro-1-month-promo",
    name: "GEMINI PRO",
    category: "PROMO",
    categoryBadgeText: "PROMO",
    durationBadge: "1 MONTH",
    description: "Gemini 3 Pro Advanced with 2M token context window & Google Workspace integration.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 300,
    priceUsd: 3.07,
    originalPriceUsd: 9.20,
    discountPercent: 67,
    flashSalePriceUsd: 3.07,
    priceUnit: "/mo",
    brand: "google",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 85,
    flashSaleAlmostGoneCount: 300,
    flashSaleLeftCount: 0,
    features: [
      "Gemini 3 Pro Advanced model access",
      "2,000,000 token context window",
      "Google Workspace integration (Docs, Gmail)",
      "2TB Cloud Storage included",
      "Private Dedicated Account"
    ],
    specs: {
      "Model": "Gemini 3 Pro",
      "Context": "2M Tokens",
      "Tipe": "Private 100%",
      "Garansi": "30 Hari Full"
    },
    warrantyText: "Garansi 30 Hari penuh penggantian instan.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "gemini-pro-3-month-promo",
    name: "GEMINI PRO",
    category: "PROMO",
    categoryBadgeText: "PROMO",
    durationBadge: "3 MONTHS",
    description: "Gemini 3 Pro Extended Access with 2M context and full AI capabilities.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 353,
    priceUsd: 4.91,
    originalPriceUsd: 17.79,
    discountPercent: 72,
    flashSalePriceUsd: 4.91,
    priceUnit: "",
    brand: "google",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 88,
    flashSaleAlmostGoneCount: 353,
    flashSaleLeftCount: 0,
    features: [
      "3 Bulan Aktif Gemini 3 Pro Resmi",
      "2TB Google Cloud Storage",
      "Integrasi Google Workspace & Deep Research",
      "Garansi Full Replace 90 Hari"
    ],
    specs: {
      "Model": "Gemini 3 Pro",
      "Durasi": "90 Hari",
      "Storage": "2TB",
      "Garansi": "Full Warranty"
    },
    warrantyText: "Garansi 90 Hari Replace.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "gemini-ultra-1-month-promo",
    name: "GEMINI ULTRA",
    category: "PROMO",
    categoryBadgeText: "PROMO",
    durationBadge: "1 MONTH",
    description: "Top Gemini limits + Veo 2 video generation, Deep Think, and agentic tools.",
    isPrivate: true,
    rating: 5,
    soldCount: 406,
    priceUsd: 15.34,
    originalPriceUsd: 46.01,
    discountPercent: 67,
    flashSalePriceUsd: 15.34,
    priceUnit: "",
    brand: "google",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 92,
    flashSaleAlmostGoneCount: 406,
    flashSaleLeftCount: 0,
    features: [
      "Gemini Ultra Tier tertinggi",
      "Veo 2 AI Video Generation 4K",
      "Deep Think reasoning model",
      "Agentic workflow execution"
    ],
    specs: {
      "Model": "Gemini 3 Ultra + Veo 2",
      "Durasi": "30 Hari",
      "Akun": "Private Dedicated"
    },
    warrantyText: "Garansi 30 Hari penuh.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "chatgpt-plus-1-month-promo",
    name: "CHATGPT PLUS",
    category: "PROMO",
    categoryBadgeText: "PROMO",
    durationBadge: "1 MONTH",
    description: "GPT-5.5 & GPT-4o high limit access with Sora video generator and Advanced Voice.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 459,
    priceUsd: 1.84,
    originalPriceUsd: 6.75,
    discountPercent: 73,
    flashSalePriceUsd: 1.84,
    priceUnit: "",
    brand: "chatgpt",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 95,
    flashSaleAlmostGoneCount: 459,
    flashSaleLeftCount: 0,
    features: [
      "GPT-5.5 & GPT-4o high limit usage",
      "Sora AI Video generator access",
      "Advanced Voice Mode with realistic speech",
      "DALL-E 3 & Custom GPTs store"
    ],
    specs: {
      "Model": "GPT-5.5 / GPT-4o / o3",
      "Voice": "Advanced Voice Mode",
      "Durasi": "30 Hari",
      "Garansi": "30 Hari Penuh"
    },
    warrantyText: "Garansi 30 Hari penuh ganti baru.",
    deliveryTime: "Instant 1-2 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "chatgpt-pro-1-month-promo",
    name: "CHATGPT PRO",
    category: "PROMO",
    categoryBadgeText: "PROMO",
    durationBadge: "1 MONTH",
    description: "Unlimited GPT-5.5, o1/o3 Pro reasoning models, and maximum compute capacity.",
    isPrivate: true,
    rating: 5,
    soldCount: 512,
    priceUsd: 4.91,
    originalPriceUsd: 14.72,
    discountPercent: 67,
    flashSalePriceUsd: 4.91,
    priceUnit: "",
    brand: "chatgpt",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 90,
    flashSaleAlmostGoneCount: 512,
    flashSaleLeftCount: 0,
    features: [
      "Tanpa batas limit pesan untuk GPT-5.5 & o3 Pro",
      "Akses prioritas server compute tercepat OpenAI",
      "Sora 4K Video Generation tanpa kuota",
      "Dedicated IP Private Account"
    ],
    specs: {
      "Tier": "Pro Enterprise ($200 value)",
      "Reasoning": "o1/o3 Pro Unlimited",
      "Durasi": "30 Hari",
      "Garansi": "30 Hari Full"
    },
    warrantyText: "Garansi 30 Hari Penuh Replace.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-pro-1-month-promo",
    name: "CLAUDE PRO",
    category: "PROMO",
    categoryBadgeText: "PROMO",
    durationBadge: "1 MONTH",
    description: "The smartest AI assistant for research, coding, and writing with Claude 3.7 Sonnet.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 565,
    priceUsd: 4.91,
    originalPriceUsd: 17.79,
    discountPercent: 72,
    flashSalePriceUsd: 4.91,
    priceUnit: "",
    brand: "claude",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 88,
    flashSaleAlmostGoneCount: 565,
    flashSaleLeftCount: 0,
    features: [
      "Claude 3.7 Sonnet & Opus full access",
      "5x more usage limit than free tier",
      "Extended context window (200k tokens)",
      "Direct Artifacts & code execution"
    ],
    specs: {
      "Model": "Claude 3.7 Sonnet / Opus",
      "Context": "200,000 tokens",
      "Durasi": "30 Hari",
      "Garansi": "30 Hari Full Replace"
    },
    warrantyText: "Garansi 30 Hari penuh replace baru jika terjadi kendala.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "gemini-pro-promo-12-month",
    name: "GEMINI PRO",
    category: "PROMO",
    durationBadge: "12 MONTH",
    badgeStyle: "purple-solid",
    description: "Gemini 3 Pro with full Google ecosystem integration.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 463,
    priceUsd: 3.07,
    priceUnit: "/12 mo",
    brand: "google",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 98,
    flashSalePriceUsd: 3.07,
    flashSaleAlmostGoneCount: 463,
    flashSaleLeftCount: 0,
    features: [
      "Promo Spesial 12 Bulan Aktif",
      "Akses Gemini Advanced & Google Drive 2TB",
      "Super hemat untuk pelajar & profesional"
    ],
    specs: {
      "Durasi": "12 Bulan",
      "Harga Promo": "$3.07 total"
    },
    warrantyText: "Full Garansi 12 Bulan.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "gemini-pro-promo-18-month",
    name: "GEMINI PRO",
    category: "PROMO",
    durationBadge: "18 MONTH",
    badgeStyle: "purple-solid",
    description: "Gemini 3 Pro with full Google ecosystem integration.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 468,
    priceUsd: 4.91,
    priceUnit: "/18 mo",
    brand: "google",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 94,
    flashSalePriceUsd: 4.91,
    flashSaleAlmostGoneCount: 468,
    flashSaleLeftCount: 0,
    features: [
      "18 Bulan Akses Gemini Advanced",
      "Paket Super Hemat Best Seller",
      "Private 100% tanpa batas waktu harian"
    ],
    specs: {
      "Durasi": "18 Bulan Penuh",
      "Garansi": "18 Bulan"
    },
    warrantyText: "Garansi 18 Bulan Penggantian.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "gemini-ultra-promo-1-month",
    name: "GEMINI ULTRA",
    category: "PROMO",
    durationBadge: "1 MONTH",
    badgeStyle: "purple-solid",
    description: "Top Gemini limits + Veo, Deep Think, and agentic tools.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 163,
    priceUsd: 15.34,
    priceUnit: "/mo",
    brand: "google",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 88,
    flashSalePriceUsd: 15.34,
    flashSaleAlmostGoneCount: 163,
    flashSaleLeftCount: 0,
    features: [
      "Promo Gemini Ultra Edition",
      "Termasuk Veo 2 Video Creator",
      "Deep Reasoning Mode"
    ],
    specs: {
      "Durasi": "30 Hari",
      "Harga Promo": "$15.34/mo"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "chatgpt-plus-promo-1-month",
    name: "CHATGPT PLUS",
    category: "PROMO",
    durationBadge: "1 MONTH",
    badgeStyle: "purple-solid",
    description: "GPT-5.5 access with high limits, Sora, and Agent Mode.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 483,
    priceUsd: 1.84,
    priceUnit: "/mo",
    brand: "chatgpt",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 99,
    flashSalePriceUsd: 1.84,
    flashSaleAlmostGoneCount: 483,
    flashSaleLeftCount: 0,
    features: [
      "Harga Flash Sale Tergila Hanya $1.84",
      "GPT-5.5 & Sora Video Generator",
      "Advanced Voice Mode Aktif",
      "Akun Private langsung pakai"
    ],
    specs: {
      "Model": "GPT-5.5 / Voice Mode",
      "Durasi": "1 Bulan",
      "Promo": "Flash Deal Diskon 90%"
    },
    warrantyText: "Garansi 30 Hari penuh.",
    deliveryTime: "Instant 1 Detik",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "chatgpt-pro-promo-1-month",
    name: "CHATGPT PRO",
    category: "PROMO",
    durationBadge: "1 MONTH",
    badgeStyle: "purple-solid",
    description: "GPT-5.5 Pro for the most complex professional work.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 200,
    priceUsd: 4.91,
    priceUnit: "/mo",
    brand: "chatgpt",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 96,
    flashSalePriceUsd: 4.91,
    flashSaleAlmostGoneCount: 200,
    flashSaleLeftCount: 0,
    features: [
      "Promo ChatGPT Pro High Compute",
      "Akses o3 Unlimited Reasoning",
      "Super cepat tanpa antre"
    ],
    specs: {
      "Durasi": "1 Bulan",
      "Harga": "$4.91/mo"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-pro-promo-1-month",
    name: "CLAUDE PRO",
    category: "PROMO",
    durationBadge: "1 MONTH",
    badgeStyle: "purple-solid",
    description: "The smartest AI assistant for research, coding, and writing.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 457,
    priceUsd: 4.91,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 97,
    flashSalePriceUsd: 4.91,
    flashSaleAlmostGoneCount: 457,
    flashSaleLeftCount: 0,
    features: [
      "Claude 3.7 Sonnet & Opus Private",
      "Harga Promo Spesial $4.91",
      "Artifacts & 200k Context Window"
    ],
    specs: {
      "Durasi": "30 Hari",
      "Garansi": "30 Hari Replace"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant 1-2 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-max-5x-promo-1-month",
    name: "CLAUDE MAX 5X",
    category: "PROMO",
    durationBadge: "1 MONTH",
    badgeStyle: "purple-solid",
    description: "5x the capacity of Claude Pro for intensive users.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 437,
    priceUsd: 15.34,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 93,
    flashSalePriceUsd: 15.34,
    features: [
      "5x Capacity Claude Pro Promo",
      "Unlimited coding & thinking mode",
      "Private account guaranteed"
    ],
    specs: {
      "Kapasitas": "5x Limits",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-max-20x-promo-1-month",
    name: "CLAUDE MAX 20X",
    category: "PROMO",
    durationBadge: "1 MONTH",
    badgeStyle: "purple-solid",
    description: "Power-user class — 20x the capacity of Claude Pro.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 231,
    priceUsd: 61.35,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 78,
    flashSalePriceUsd: 61.35,
    features: [
      "20x Capacity Claude Pro Promo Diskon",
      "Enterprise server response time"
    ],
    specs: {
      "Durasi": "30 Hari",
      "Kapasitas": "20X"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "kiro-ide-promo-8000",
    name: "KIRO IDE",
    category: "PROMO",
    durationBadge: "8.000 CREDITS",
    badgeStyle: "purple-solid",
    description: "Spec-driven AI IDE powered by Opus 4.8 from AWS.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 329,
    priceUsd: 3.07,
    priceUnit: "/pack",
    brand: "kiro",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 92,
    flashSalePriceUsd: 3.07,
    flashSaleAlmostGoneCount: 329,
    flashSaleLeftCount: 0,
    features: [
      "8,000 Opus 4.8 Credits Murah Meriah",
      "Full IDE integration AWS cloud",
      "Super hemat untuk mahasiswa TI"
    ],
    specs: {
      "Credits": "8,000 Credits",
      "Harga": "$3.07/pack"
    },
    warrantyText: "Garansi saldo penuh.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "cursor-pro-promo-standard",
    name: "CURSOR PRO",
    category: "PROMO",
    durationBadge: "STANDARD",
    badgeStyle: "purple-solid",
    description: "The fastest AI code editor with smart Agent & tab completion.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 448,
    priceUsd: 3.07,
    priceUnit: "/mo",
    brand: "cursor",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 99,
    flashSalePriceUsd: 3.07,
    flashSaleAlmostGoneCount: 448,
    flashSaleLeftCount: 0,
    features: [
      "Cursor Pro Promo Hanya $3.07",
      "Tab completion & Claude 3.7 Composer",
      "Full garansi 30 hari no banned"
    ],
    specs: {
      "Durasi": "30 Hari",
      "Promo": "Flash Deal"
    },
    warrantyText: "Garansi 30 Hari penuh.",
    deliveryTime: "Instant 1 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "cursor-pro-plus-promo",
    name: "CURSOR PRO+",
    category: "PROMO",
    durationBadge: "PRO+",
    badgeStyle: "purple-solid",
    description: "The fastest AI code editor with smart Agent & tab completion.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 291,
    priceUsd: 6.13,
    priceUnit: "/mo",
    brand: "cursor",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 90,
    flashSalePriceUsd: 6.13,
    features: [
      "Cursor Pro+ 1,500 Fast Requests",
      "Diskon Promo Spesial $6.13"
    ],
    specs: {
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "cursor-ultra-promo",
    name: "CURSOR ULTRA",
    category: "PROMO",
    durationBadge: "ULTRA",
    badgeStyle: "purple-solid",
    description: "The fastest AI code editor with smart Agent & tab completion.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 220,
    priceUsd: 15.34,
    priceUnit: "/mo",
    brand: "cursor",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 85,
    flashSalePriceUsd: 15.34,
    features: [
      "Cursor Ultra Unlimited Fast Requests",
      "Harga Promo $15.34/mo"
    ],
    specs: {
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-pro-promo-3-month",
    name: "CLAUDE PRO",
    category: "PROMO",
    durationBadge: "3 MONTH",
    badgeStyle: "purple-solid",
    description: "The smartest AI assistant for research, coding, and writing.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 349,
    priceUsd: 7.67,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 91,
    flashSalePriceUsd: 7.67,
    features: [
      "3 Bulan Claude Pro Private",
      "Harga promo hemat 60%",
      "Garansi 90 hari replace"
    ],
    specs: {
      "Durasi": "3 Bulan (90 Hari)"
    },
    warrantyText: "Garansi 90 Hari replace.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "chatgpt-plus-promo-3-month",
    name: "CHATGPT PLUS",
    category: "PROMO",
    durationBadge: "3 MONTH",
    badgeStyle: "purple-solid",
    description: "GPT-5.5 access with high limits, Sora, and Agent Mode.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 204,
    priceUsd: 7.36,
    priceUnit: "/mo",
    brand: "chatgpt",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 89,
    flashSalePriceUsd: 7.36,
    features: [
      "3 Bulan ChatGPT Plus Private Legal",
      "Sora video & Advanced Voice Mode"
    ],
    specs: {
      "Durasi": "3 Bulan (90 Hari)"
    },
    warrantyText: "Garansi 90 Hari.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "chatgpt-pro-promo-3-month",
    name: "CHATGPT PRO",
    category: "PROMO",
    durationBadge: "3 MONTH",
    badgeStyle: "purple-solid",
    description: "GPT-5.5 Pro for the most complex professional work.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 105,
    priceUsd: 9.20,
    priceUnit: "/mo",
    brand: "chatgpt",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 82,
    flashSalePriceUsd: 9.20,
    features: [
      "3 Bulan ChatGPT Pro High Compute",
      "Akses o3 super reasoning"
    ],
    specs: {
      "Durasi": "3 Bulan (90 Hari)"
    },
    warrantyText: "Garansi 90 Hari.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-max-5x-promo-3-month",
    name: "CLAUDE MAX 5X",
    category: "PROMO",
    durationBadge: "3 MONTH",
    badgeStyle: "purple-solid",
    description: "5x the capacity of Claude Pro for intensive users.",
    isPrivate: true,
    rating: 5,
    soldCount: 252,
    priceUsd: 15.34,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 88,
    flashSalePriceUsd: 15.34,
    features: [
      "3 Bulan 5X Kapasitas Claude Pro",
      "Bebas rate limit"
    ],
    specs: {
      "Durasi": "90 Hari",
      "Kapasitas": "5X Pro"
    },
    warrantyText: "Garansi 90 Hari Penuh.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "chatgpt-pro-promo-4-month",
    name: "CHATGPT PRO",
    category: "PROMO",
    durationBadge: "4 MONTH",
    badgeStyle: "purple-solid",
    description: "GPT-5.5 Pro for the most complex professional work.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 230,
    priceUsd: 20.25,
    priceUnit: "/mo",
    brand: "chatgpt",
    inFlashSaleBatch: 1,
    flashSaleStockPercent: 84,
    flashSalePriceUsd: 20.25,
    features: [
      "Paket 4 Bulan ChatGPT Pro",
      "Super stabil dan hemat"
    ],
    specs: {
      "Durasi": "4 Bulan (120 Hari)"
    },
    warrantyText: "Garansi 120 Hari.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },

  // ==========================================
  // AI ASSISTANT (REGULAR CATALOG - BATCH 2)
  // ==========================================
  {
    id: "claude-pro-1-month",
    name: "CLAUDE PRO",
    category: "AI ASSISTANT",
    durationBadge: "1 MONTH",
    description: "The smartest AI assistant for research, coding, and writing.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 466,
    priceUsd: 20.00,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 88,
    features: [
      "Claude 3.7 Sonnet & Opus full access",
      "5x more usage limit than free tier",
      "Extended context window (200k tokens)",
      "Direct Artifacts & code execution",
      "Priority access during peak traffic",
      "Private account (Email & Password)"
    ],
    specs: {
      "Model": "Claude 3.7 Sonnet / Opus",
      "Context Window": "200,000 tokens",
      "Tipe Akun": "Private 100% (No Sharing)",
      "Durasi": "30 Hari Penuh",
      "Garansi": "30 Hari Full Replace"
    },
    warrantyText: "Garansi 30 Hari penuh replace baru jika terjadi kendala.",
    deliveryTime: "Instant 1-3 Menit otomatis ke Email/WA",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-pro-1-year",
    name: "CLAUDE PRO",
    category: "AI ASSISTANT",
    durationBadge: "1 YEAR",
    description: "The smartest AI assistant for research, coding, and writing.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 272,
    priceUsd: 204.00,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 74,
    features: [
      "12 Bulan Langganan Claude Pro Resmi",
      "Hemat 15% dibanding bulanan",
      "Akses Sonnet 3.7 & Claude Artifacts",
      "Full Garansi 365 Hari Replace",
      "Email pribadi atau dari kami"
    ],
    specs: {
      "Model": "Claude 3.7 Sonnet / 3.5 Opus",
      "Durasi": "365 Hari (1 Tahun)",
      "Akun": "Private Personal Account",
      "Garansi": "365 Hari Full Warranty"
    },
    warrantyText: "Full Garansi 1 Tahun 365 Hari penggantian akun baru.",
    deliveryTime: "Instant 1-5 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-max-5x-1-month",
    name: "CLAUDE MAX 5X",
    category: "AI ASSISTANT",
    durationBadge: "1 MONTH",
    description: "5x the capacity of Claude Pro for intensive users.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 281,
    priceUsd: 100.00,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 91,
    features: [
      "500 pesan per 5 jam (5x lipat Pro standard)",
      "Tanpa batas rate limit untuk power users",
      "Claude 3.7 Sonnet Extended Thinking mode",
      "Private account dedicated IP support"
    ],
    specs: {
      "Kapasitas": "5x Limits Claude Pro",
      "Model": "Claude 3.7 Sonnet High-Tier",
      "Durasi": "30 Hari",
      "Garansi": "30 Hari Penuh"
    },
    warrantyText: "Garansi 30 Hari penuh penggantian instan.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-max-5x-1-year",
    name: "CLAUDE MAX 5X",
    category: "AI ASSISTANT",
    durationBadge: "1 YEAR",
    description: "5x the capacity of Claude Pro for intensive users.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 336,
    priceUsd: 1080.00,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 65,
    features: [
      "Annual 5X Claude High Capacity Account",
      "Cocok untuk Agensi, Developer & Peneliti",
      "Dedicated Customer Support VIP 24/7"
    ],
    specs: {
      "Durasi": "12 Bulan",
      "Kapasitas": "5x Claude Pro",
      "Garansi": "1 Tahun Full"
    },
    warrantyText: "Garansi 1 Tahun penuh replace & VIP support.",
    deliveryTime: "Instant 1-5 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-max-20x-1-month",
    name: "CLAUDE MAX 20X",
    category: "AI ASSISTANT",
    durationBadge: "1 MONTH",
    description: "Power-user class — 20x the capacity of Claude Pro.",
    isPrivate: true,
    rating: 5,
    soldCount: 453,
    priceUsd: 200.00,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 82,
    features: [
      "20x Unlimited Claude Usage Capacity",
      "Enterprise speed server cluster",
      "Mendukung coding script puluhan ribu baris",
      "Akses fitur eksperimental Anthropic lebih awal"
    ],
    specs: {
      "Kapasitas": "20x Pro tier",
      "Durasi": "30 Hari",
      "Akun": "Enterprise Dedicated"
    },
    warrantyText: "Garansi 30 Hari penuh.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "claude-max-20x-1-year",
    name: "CLAUDE MAX 20X",
    category: "AI ASSISTANT",
    durationBadge: "1 YEAR",
    description: "Power-user class — 20x the capacity of Claude Pro.",
    isPrivate: true,
    rating: 5,
    soldCount: 454,
    priceUsd: 2160.00,
    priceUnit: "/mo",
    brand: "claude",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 78,
    features: [
      "Paket Tahunan Ultimate Claude 20X",
      "Hemat jutaan rupiah untuk tim profesional",
      "Garansi 365 Hari tanpa downtime"
    ],
    specs: {
      "Durasi": "1 Tahun (365 Hari)",
      "Tipe": "20X Tier Enterprise"
    },
    warrantyText: "Garansi 365 Hari Penggantian Baru.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "google-ai-pro-12-month",
    name: "GOOGLE AI PRO",
    category: "AI ASSISTANT",
    durationBadge: "12 MONTH",
    description: "Gemini 3 Pro with full Google ecosystem integration.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 255,
    priceUsd: 216.00,
    priceUnit: "/12 mo",
    brand: "google",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 86,
    features: [
      "Gemini 3 Pro Advanced with 2M token context",
      "Google Workspace integration (Docs, Gmail, Sheets)",
      "2TB Cloud Storage Google One included",
      "Full 12 Bulan Garansi Resmi"
    ],
    specs: {
      "Model": "Gemini 3 Pro / Ultra",
      "Storage": "2TB Google One",
      "Durasi": "12 Bulan"
    },
    warrantyText: "Garansi 12 Bulan penuh.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "google-ai-pro-18-month",
    name: "GOOGLE AI PRO",
    category: "AI ASSISTANT",
    durationBadge: "18 MONTH",
    description: "Gemini 3 Pro with full Google ecosystem integration.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 118,
    priceUsd: 309.00,
    priceUnit: "/12 mo",
    brand: "google",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 60,
    features: [
      "18 Bulan Aktif Gemini Pro AI",
      "Ekosistem Google lengkap + Drive 2TB",
      "Akses model audio, video, teks Gemini 3 Pro"
    ],
    specs: {
      "Durasi": "18 Bulan",
      "Garansi": "18 Bulan"
    },
    warrantyText: "Garansi 18 Bulan.",
    deliveryTime: "Instant 1-5 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "google-ai-ultra-1-month",
    name: "GOOGLE AI ULTRA",
    category: "AI ASSISTANT",
    durationBadge: "1 MONTH",
    description: "Top Gemini limits + Veo, Deep Think, and agentic tools.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 258,
    priceUsd: 100.00,
    priceUnit: "/mo",
    brand: "google",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 94,
    features: [
      "Gemini Ultra Tier tertinggi",
      "Veo 2 AI Video Generation 4K",
      "Deep Think reasoning model",
      "Agentic workflow execution"
    ],
    specs: {
      "Model": "Gemini 3 Ultra + Veo 2",
      "Durasi": "30 Hari",
      "Akun": "Private Dedicated"
    },
    warrantyText: "Garansi 30 Hari penuh.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "google-ai-ultra-1-year",
    name: "GOOGLE AI ULTRA",
    category: "AI ASSISTANT",
    durationBadge: "1 YEAR",
    description: "Top Gemini limits + Veo, Deep Think, and agentic tools.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 409,
    priceUsd: 1079.00,
    priceUnit: "/mo",
    brand: "google",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 72,
    features: [
      "Paket 1 Tahun Google AI Ultra",
      "Unlimited video generator Veo",
      "Akses Deep Research & Google Ecosystem VIP"
    ],
    specs: {
      "Durasi": "1 Tahun",
      "Garansi": "1 Tahun Full"
    },
    warrantyText: "Garansi 1 Tahun 365 Hari.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "chatgpt-plus-1-month",
    name: "CHATGPT PLUS",
    category: "AI ASSISTANT",
    durationBadge: "1 MONTH",
    description: "GPT-5.5 access with high limits, Sora, and Agent Mode.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 436,
    priceUsd: 20.00,
    priceUnit: "/mo",
    brand: "chatgpt",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 89,
    features: [
      "GPT-5.5 & GPT-4o high limit usage",
      "Sora AI Video generator access",
      "Advanced Voice Mode with realistic speech",
      "DALL-E 3 & Custom GPTs store",
      "Private account (Email & Password milik anda)"
    ],
    specs: {
      "Model": "GPT-5.5 / GPT-4o / o3",
      "Voice": "Advanced Voice Mode",
      "Durasi": "30 Hari",
      "Garansi": "30 Hari Penuh"
    },
    warrantyText: "Garansi 30 Hari penuh ganti baru.",
    deliveryTime: "Instant 1-2 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "chatgpt-plus-1-year",
    name: "CHATGPT PLUS",
    category: "AI ASSISTANT",
    durationBadge: "1 YEAR",
    description: "GPT-5.5 access with high limits, Sora, and Agent Mode.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 144,
    priceUsd: 216.00,
    priceUnit: "/mo",
    brand: "chatgpt",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 80,
    features: [
      "12 Bulan ChatGPT Plus Legal Resmi",
      "Garansi 365 hari penuh tanpa banned",
      "Dapat email original fresh"
    ],
    specs: {
      "Durasi": "12 Bulan",
      "Tipe": "Personal Private"
    },
    warrantyText: "Garansi 1 Tahun penuh.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "chatgpt-pro-1-month",
    name: "CHATGPT PRO",
    category: "AI ASSISTANT",
    durationBadge: "1 MONTH",
    description: "GPT-5.5 Pro for the most complex professional work.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 302,
    priceUsd: 200.00,
    priceUnit: "/mo",
    brand: "chatgpt",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 93,
    features: [
      "Unlimited o3-mini & GPT-5.5 High Reasoning",
      "Dedicated compute infrastructure",
      "Operator autonomous browser agent",
      "Unlimited image & file processing"
    ],
    specs: {
      "Model": "o3-high / GPT-5.5 Pro",
      "Durasi": "30 Hari",
      "Compute": "Pro Dedicated Server"
    },
    warrantyText: "Garansi 30 Hari resmi.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },

  // ==========================================
  // DEVELOPER (REGULAR CATALOG - BATCH 2)
  // ==========================================
  {
    id: "kiro-ai-pro-1000",
    name: "KIRO AI",
    category: "DEVELOPER",
    durationBadge: "PRO — 1.000 CREDITS",
    description: "Spec-driven AI IDE powered by Opus 4.8 from AWS.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 480,
    priceUsd: 20.00,
    priceUnit: "/mo",
    brand: "kiro",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 96,
    features: [
      "1,000 High-Speed Opus 4.8 Credits",
      "Automated spec generation & code tests",
      "AWS cloud development container hook",
      "Full codebase indexing & live debug"
    ],
    specs: {
      "Credits": "1,000 Opus Credits",
      "Engine": "Opus 4.8 / Claude Engine",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari replace kredit.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "kiro-ai-pro-plus-2000",
    name: "KIRO AI",
    category: "DEVELOPER",
    durationBadge: "PRO+ — 2.000 CREDITS",
    description: "Spec-driven AI IDE powered by Opus 4.8 from AWS.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 430,
    priceUsd: 40.00,
    priceUnit: "/mo",
    brand: "kiro",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 85,
    features: [
      "2,000 High-Speed Opus 4.8 Credits",
      "Multi-repo support & CI/CD agent",
      "Fast terminal agent"
    ],
    specs: {
      "Credits": "2,000 Credits",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "kiro-ai-power-10000",
    name: "KIRO AI",
    category: "DEVELOPER",
    durationBadge: "POWER — 10.000 CREDITS",
    description: "Spec-driven AI IDE powered by Opus 4.8 from AWS.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 243,
    priceUsd: 200.00,
    priceUnit: "/mo",
    brand: "kiro",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 70,
    features: [
      "10,000 Credits untuk software studio",
      "Priority fast queue AWS cluster",
      "Full architecture generation"
    ],
    specs: {
      "Credits": "10,000 Credits",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "cursor-pro",
    name: "CURSOR",
    category: "DEVELOPER",
    durationBadge: "PRO",
    description: "The fastest AI code editor with smart Agent & tab completion.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 244,
    priceUsd: 20.00,
    priceUnit: "/mo",
    brand: "cursor",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 92,
    features: [
      "500 Fast Premium Claude 3.7 / GPT-4o requests/mo",
      "Unlimited slow requests",
      "Cursor Tab instant multi-line completion",
      "Composer agent with full codebase edits",
      "Private account (Bukan share)"
    ],
    specs: {
      "Tipe": "Cursor Pro Official",
      "Fast Requests": "500 / month",
      "Durasi": "30 Hari",
      "Garansi": "30 Hari Replace"
    },
    warrantyText: "Garansi 30 Hari penuh.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "cursor-pro-plus",
    name: "CURSOR",
    category: "DEVELOPER",
    durationBadge: "PRO+",
    description: "The fastest AI code editor with smart Agent & tab completion.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 207,
    priceUsd: 60.00,
    priceUnit: "/mo",
    brand: "cursor",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 88,
    features: [
      "1,500 Fast Premium requests per month",
      "Ultra low latency tab autocomplete",
      "Multi-file refactoring agent"
    ],
    specs: {
      "Fast Requests": "1,500 / mo",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "cursor-ultra",
    name: "CURSOR",
    category: "DEVELOPER",
    durationBadge: "ULTRA",
    description: "The fastest AI code editor with smart Agent & tab completion.",
    isPrivate: true,
    rating: 4.9,
    soldCount: 425,
    priceUsd: 200.00,
    priceUnit: "/mo",
    brand: "cursor",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 77,
    features: [
      "Unlimited Fast Premium Requests",
      "Priority compute server routing",
      "Maximum context window support"
    ],
    specs: {
      "Fast Requests": "Unlimited",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant 1-2 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "qoder-pro",
    name: "QODER",
    category: "DEVELOPER",
    durationBadge: "PRO",
    description: "Agentic coding platform with Quest Mode & Repo Wiki.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 393,
    priceUsd: 20.00,
    priceUnit: "/mo",
    brand: "qoder",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 84,
    features: [
      "Qoder Quest Mode autonomy",
      "Repo Wiki auto-generation",
      "Full git integration & test runner"
    ],
    specs: {
      "Tier": "Qoder Pro",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "qoder-pro-plus",
    name: "QODER",
    category: "DEVELOPER",
    durationBadge: "PRO+",
    description: "Agentic coding platform with Quest Mode & Repo Wiki.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 428,
    priceUsd: 60.00,
    priceUnit: "/mo",
    brand: "qoder",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 79,
    features: [
      "Qoder Pro+ 3x Agent Concurrency",
      "Large Enterprise Repositories index",
      "Automated Bug hunting bot"
    ],
    specs: {
      "Tier": "Qoder Pro+",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "qoder-ultra",
    name: "QODER",
    category: "DEVELOPER",
    durationBadge: "ULTRA",
    description: "Agentic coding platform with Quest Mode & Repo Wiki.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 132,
    priceUsd: 200.00,
    priceUnit: "/mo",
    brand: "qoder",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 62,
    features: [
      "Unlimited Quest Mode execution",
      "Private cloud sandbox runner",
      "Priority agent execution"
    ],
    specs: {
      "Tier": "Qoder Ultra",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },

  // ==========================================
  // API (REGULAR CATALOG - BATCH 2)
  // ==========================================
  {
    id: "api-key-openai-1000",
    name: "API KEY OPENAI",
    category: "API",
    durationBadge: "1.000 REQUESTS",
    description: "Pay per request — save with cached input & OpenAI Batch API.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 288,
    priceUsd: 6.00,
    priceUnit: "/pack",
    brand: "openai",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 86,
    features: [
      "1,000 Requests OpenAI API Official",
      "Format sk-... langsung pakai"
    ],
    specs: {
      "Requests": "1,000 Calls"
    },
    warrantyText: "Garansi saldo penuh.",
    deliveryTime: "Instant 1 Detik",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "api-key-openai-5000",
    name: "API KEY OPENAI",
    category: "API",
    durationBadge: "5.000 REQUESTS",
    description: "Pay per request — save with cached input & OpenAI Batch API.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 130,
    priceUsd: 12.00,
    priceUnit: "/pack",
    brand: "openai",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 91,
    features: [
      "5,000 API Requests Saldo Aktif",
      "Mendukung GPT-4o, GPT-4o mini, Embeddings, DALL-E",
      "Tanpa masa kadaluarsa (No Expiration)",
      "High Rate Limit Tier 2/3"
    ],
    specs: {
      "Requests": "5,000 Requests",
      "Format": "API Secret Key (sk-...)",
      "Masa Aktif": "Selamanya (Sampai habis)"
    },
    warrantyText: "Garansi saldo utuh sampai habis.",
    deliveryTime: "Instant 1 Detik di Layar",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "api-key-openai-10000",
    name: "API KEY OPENAI",
    category: "API",
    durationBadge: "10.000 REQUESTS",
    description: "Pay per request — save with cached input & OpenAI Batch API.",
    isPrivate: true,
    rating: 4.8,
    soldCount: 445,
    priceUsd: 23.00,
    priceUnit: "/pack",
    brand: "openai",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 95,
    features: [
      "10,000 API Requests Saldo Penuh",
      "Akses GPT-5.5, GPT-4o, Whisper & TTS",
      "Dapat langsung dicopy dan dipasang di Next.js, Python, n8n"
    ],
    specs: {
      "Requests": "10,000 Requests",
      "Format": "API Key sk-...",
      "Garansi": "Full Saldo Replace"
    },
    warrantyText: "Garansi saldo utuh 100%.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "api-key-deepseek-1000",
    name: "API KEY DEEPSEEK",
    category: "API",
    durationBadge: "1.000 REQUESTS",
    description: "Pay per request — cheapest API, follows DeepSeek off-peak discounts.",
    isPrivate: true,
    rating: 4.7,
    soldCount: 135,
    priceUsd: 4.00,
    priceUnit: "/pack",
    brand: "deepseek",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 90,
    features: [
      "1,000 DeepSeek V3 / R1 Requests",
      "DeepSeek Reasoning Model super murah",
      "Compatible OpenAI standard endpoint"
    ],
    specs: {
      "Model": "DeepSeek R1 / V3",
      "Requests": "1,000 Calls"
    },
    warrantyText: "Garansi saldo aktif.",
    deliveryTime: "Instant 1 Detik",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "api-key-deepseek-5000",
    name: "API KEY DEEPSEEK",
    category: "API",
    durationBadge: "5.000 REQUESTS",
    description: "Pay per request — cheapest API, follows DeepSeek off-peak discounts.",
    isPrivate: true,
    rating: 4.7,
    soldCount: 232,
    priceUsd: 7.00,
    priceUnit: "/pack",
    brand: "deepseek",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 88,
    features: [
      "5,000 DeepSeek R1 & V3 API Calls",
      "Mendukung streaming response super cepat"
    ],
    specs: {
      "Requests": "5,000 Calls"
    },
    warrantyText: "Garansi saldo aktif.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "api-key-deepseek-10000",
    name: "API KEY DEEPSEEK",
    category: "API",
    durationBadge: "10.000 REQUESTS",
    description: "Pay per request — cheapest API, follows DeepSeek off-peak discounts.",
    isPrivate: true,
    rating: 4.7,
    soldCount: 355,
    priceUsd: 12.00,
    priceUnit: "/pack",
    brand: "deepseek",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 94,
    features: [
      "10,000 DeepSeek R1 & V3 API Calls",
      "Pilihan paling hemat untuk bot AI dan backend"
    ],
    specs: {
      "Requests": "10,000 Calls"
    },
    warrantyText: "Garansi saldo penuh.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },

  // ==========================================
  // AI IMAGE (REGULAR CATALOG - BATCH 2)
  // ==========================================
  {
    id: "leonardo-ai-pro-artisan-1-month",
    name: "LEONARDO AI PRO",
    category: "AI IMAGE",
    durationBadge: "ARTISAN — 1 MONTH",
    description: "Pro-class image generation + Seedance 2.0 access.",
    isPrivate: true,
    rating: 4.7,
    soldCount: 134,
    priceUsd: 30.00,
    priceUnit: "/mo",
    brand: "leonardo",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 83,
    features: [
      "8,500 Fast Tokens per bulan",
      "Seedance 2.0 Motion Video AI",
      "PhotoReal v2 & Alchemy upscaler",
      "Private generation mode"
    ],
    specs: {
      "Tokens": "8,500 / month",
      "Tier": "Artisan Pro",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari replace.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "leonardo-ai-pro-artisan-yearly",
    name: "LEONARDO AI PRO",
    category: "AI IMAGE",
    durationBadge: "ARTISAN — YEARLY",
    description: "Pro-class image generation + Seedance 2.0 access.",
    isPrivate: true,
    rating: 4.7,
    soldCount: 201,
    priceUsd: 24.00,
    priceUnit: "/mo",
    brand: "leonardo",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 87,
    features: [
      "Artisan Yearly Subscription",
      "Hemat 20% biaya bulanan",
      "Unlimited Relaxed Generations"
    ],
    specs: {
      "Durasi": "1 Tahun",
      "Tier": "Artisan Annual"
    },
    warrantyText: "Garansi 1 Tahun penuh.",
    deliveryTime: "Instant Delivery",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  },
  {
    id: "leonardo-ai-pro-maestro-1-month",
    name: "LEONARDO AI PRO",
    category: "AI IMAGE",
    durationBadge: "MAESTRO — 1 MONTH",
    description: "Pro-class image generation + Seedance 2.0 access.",
    isPrivate: true,
    rating: 4.7,
    soldCount: 268,
    priceUsd: 60.00,
    priceUnit: "/mo",
    brand: "leonardo",
    inFlashSaleBatch: 2,
    flashSaleStockPercent: 81,
    features: [
      "25,000 Fast Tokens per bulan",
      "Simultaneous 5 Generations",
      "Maximum Resolution 4K Upscale"
    ],
    specs: {
      "Tokens": "25,000 Tokens",
      "Durasi": "30 Hari"
    },
    warrantyText: "Garansi 30 Hari.",
    deliveryTime: "Instant 1-3 Menit",
    reviews: [INDONESIAN_REVIEWS_POOL[0]]
  }
];

export const USD_TO_IDR_RATE = 13948;

export function convertUsdToIdr(amountUsd: number): number {
  return Math.round(amountUsd * USD_TO_IDR_RATE);
}

export function formatUsd(amountUsd: number): string {
  return `$${amountUsd.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Format an IDR amount (already in Rupiah) as "Rp xxx.xxx" */
export function formatIdr(amountIdr: number): string {
  return `Rp ${Math.round(amountIdr).toLocaleString('id-ID')}`;
}

/** Convert USD to IDR and format */
export function formatUsdAsIdr(amountUsd: number): string {
  return formatIdr(convertUsdToIdr(amountUsd));
}

export function getFlashSaleCycleInfo() {
  const CYCLE_DURATION_HOURS = 12;
  const CYCLE_DURATION_MS = CYCLE_DURATION_HOURS * 60 * 60 * 1000;

  const now = Date.now();
  const currentBatch: 1 | 2 = Math.floor(now / CYCLE_DURATION_MS) % 2 === 0 ? 1 : 2;

  const msIntoCurrentCycle = now % CYCLE_DURATION_MS;
  const msRemaining = CYCLE_DURATION_MS - msIntoCurrentCycle;
  const secondsRemaining = Math.floor(msRemaining / 1000);

  return {
    currentBatch,
    secondsRemaining,
  };
}
