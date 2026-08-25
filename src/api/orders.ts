import type { Order, CartItem } from '@/src/types';
import { apiClient } from './client';
import { SAMPLE_ORDERS } from './mock-data';

/** In-memory store to persist orders during the session. */
let sessionOrders: Order[] = [...SAMPLE_ORDERS];

/**
 * Get the current user's order history.
 */
export async function getOrders(): Promise<Order[]> {
  return apiClient(
    () => [...sessionOrders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    500
  );
}

/**
 * Get a single order by ID.
 */
export async function getOrder(id: string): Promise<Order> {
  return apiClient(() => {
    const order = sessionOrders.find((o) => o.id === id);
    if (!order) throw new Error(`Order not found: ${id}`);
    return order;
  }, 400);
}

/**
 * Create a new order from cart items.
 */
export async function createOrder(items: CartItem[]): Promise<Order> {
  return apiClient(() => {
    const order: Order = {
      id: `ORD-${String(sessionOrders.length + 1).padStart(3, '0')}`,
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total: items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
      status: 'processing',
      createdAt: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    };

    sessionOrders.push(order);
    return order;
  }, 1200);
}
