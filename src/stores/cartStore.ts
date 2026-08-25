import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product } from '@/src/types';
import { asyncStorageAdapter } from '@/src/lib/storage';

interface CartState {
  items: CartItem[];

  /** Add a product to cart (or increment quantity if already in cart). */
  addItem: (product: Product, quantity?: number) => void;

  /** Remove an item by product ID. */
  removeItem: (productId: string) => void;

  /** Set exact quantity for an item. Removes if quantity ≤ 0. */
  updateQuantity: (productId: string, quantity: number) => void;

  /** Clear the entire cart (e.g., after checkout). */
  clearCart: () => void;

  /** Get total number of items (sum of quantities). */
  getTotalItems: () => number;

  /** Get total price. */
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => asyncStorageAdapter),
    }
  )
);
