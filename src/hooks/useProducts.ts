import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProducts, getProduct, getCategories } from '@/src/api/products';
import type { ProductFilters } from '@/src/types';

/**
 * Fetch filtered product list.
 *
 * The queryKey includes the filters, so TanStack Query automatically
 * refetches when filters change — no manual invalidation needed.
 */
export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters ?? {}],
    queryFn: () => getProducts(filters),
    placeholderData: keepPreviousData,
  });
}

/**
 * Fetch a single product by ID.
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

/**
 * Fetch categories.
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity, // categories don't change
  });
}
