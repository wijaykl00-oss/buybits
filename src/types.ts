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
  flashSalePriceUsd?: number;
  flashSaleAlmostGoneCount?: number;
  flashSaleLeftCount?: number;
  features: string[];
  specs: { [key: string]: string };
  warrantyText: string;
  deliveryTime: string;
  reviews: Review[];
  availableStock?: number;
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

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'FULFILLED'
  | 'EXPIRED'
  | 'FAILED'
  | 'CANCELLED';

export interface DigitalCredential {
  serviceName: string;
  productId: string;
  accountEmail?: string;
  accountPassword?: string;
  loginUrl: string;
  instructions: string;
  licenseKey?: string;
  inviteLink?: string;
  expiresAt: string;
}

export interface PaymentProof {
  imageUrl: string;
  senderName: string;
  senderBank?: string;
  senderAccount?: string;
  transferAmount?: number;
  notes?: string;
  uploadedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerWhatsApp?: string;
  items: CartItem[];
  totalUsd: number;
  totalIdr: number;
  exchangeRate: number;
  uniqueCode: number;
  finalTotalIdr: number;
  paymentMethod: string;
  status: OrderStatus;
  qrisPayload?: string;
  expiresAt?: string;
  transactionId?: string;
  paidAt?: string;
  fulfilledAt?: string;
  paymentProof?: PaymentProof;
  credentials?: DigitalCredential[];
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  type: 'ACCOUNT' | 'LICENSE_KEY' | 'INVITE_LINK';
  accountEmail?: string;
  accountPassword?: string;
  licenseKey?: string;
  loginUrl?: string;
  instructions?: string;
  status: 'AVAILABLE' | 'SOLD';
  orderId?: string;
  createdAt: string;
  soldAt?: string;
}
