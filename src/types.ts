export interface Review {
  id: string;
  userName: string;
  userCity: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  isVerified: boolean;
  productVariant?: string;
}

export type BrandType =
  | 'claude'
  | 'google'
  | 'chatgpt'
  | 'kiro'
  | 'cursor'
  | 'qoder'
  | 'leonardo'
  | 'deepseek'
  | 'openai';

export type CategoryType =
  | 'ALL'
  | 'AI ASSISTANT'
  | 'DEVELOPER'
  | 'AI IMAGE'
  | 'API'
  | 'PROMO';

export interface Product {
  id: string;
  name: string;
  category: 'AI ASSISTANT' | 'DEVELOPER' | 'AI IMAGE' | 'API' | 'PROMO';
  categoryBadgeText?: string;
  durationBadge: string;
  badgeStyle?: 'outline' | 'purple-solid';
  description: string;
  isPrivate: boolean;
  rating: number;
  soldCount: number;
  priceUsd: number;
  originalPriceUsd?: number;
  discountPercent?: number;
  priceUnit: string;
  brand: BrandType;
  inFlashSaleBatch?: 1 | 2 | null;
  flashSaleStockPercent?: number;
  features: string[];
  specs: { [key: string]: string };
  warrantyText: string;
  deliveryTime: string;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  isFlashSale: boolean;
  finalPriceUsd: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  isVerifiedBuyer: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerWhatsApp: string;
  items: CartItem[];
  totalUsd: number;
  totalIdr: number;
  exchangeRate: number;
  uniqueCode: number;
  finalTotalIdr: number;
  paymentMethod: string;
  status: 'PENDING' | 'PAID' | 'DELIVERED';
  credentials?: {
    serviceName: string;
    accountEmail: string;
    accountPassword: string;
    loginUrl: string;
    instructions: string;
    licenseKey?: string;
    expiresAt: string;
  }[];
}
