import type { Product, ProductFilters, Category } from '@/src/types';
import { apiClient } from './client';
import { PRODUCTS, CATEGORIES } from './mock-data';

/**
 * Get filtered, sorted product list.
 */
export async function getProducts(
  filters?: ProductFilters
): Promise<Product[]> {
  return apiClient(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (filters?.category && filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Search filter
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price range
    if (filters?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // Sorting
    switch (filters?.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break; // keep original order as "newest"
    }

    return result;
  }, 600);
}

/**
 * Get a single product by ID.
 */
export async function getProduct(id: string): Promise<Product> {
  return apiClient(() => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) throw new Error(`Product not found: ${id}`);
    return product;
  }, 400);
}

/**
 * Get categories.
 */
export async function getCategories(): Promise<Category[]> {
  return apiClient(() => CATEGORIES, 200);
}
