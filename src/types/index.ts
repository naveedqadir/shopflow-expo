// ─── User ────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ─── Product ─────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  colors?: string[];
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  productCount: number;
}

// ─── Cart ────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

// ─── Order ───────────────────────────────────────────────────────
export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
}

// ─── API ─────────────────────────────────────────────────────────
export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
