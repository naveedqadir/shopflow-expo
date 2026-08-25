import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, createOrder } from '@/src/api/orders';
import { useCartStore } from '@/src/stores/cartStore';
import type { Order } from '@/src/types';

/**
 * Fetch order history.
 */
export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
}

/**
 * Create a new order from the current cart contents.
 *
 * Demonstrates:
 * - Optimistic update (order appears immediately)
 * - Cart clear on success (Zustand ↔ TanStack Query handoff)
 * - Cache invalidation
 * - Rollback on error
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  return useMutation({
    mutationFn: () => createOrder(items),

    // Optimistic update: add the order to cache before the API responds
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['orders'] });

      // Snapshot current orders for rollback
      const previousOrders = queryClient.getQueryData<Order[]>(['orders']);

      // Optimistically add the new order
      const optimisticOrder: Order = {
        id: `ORD-TEMP-${Date.now()}`,
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          productImage: i.product.image,
          price: i.product.price,
          quantity: i.quantity,
        })),
        total: items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        ),
        status: 'processing',
        createdAt: new Date().toISOString().split('T')[0],
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      };

      queryClient.setQueryData<Order[]>(['orders'], (old) => [
        optimisticOrder,
        ...(old ?? []),
      ]);

      return { previousOrders };
    },

    // On error, roll back to the previous orders
    onError: (_err, _vars, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders);
      }
    },

    // On success, clear cart and invalidate to get the real server data
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
