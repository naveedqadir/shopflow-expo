import { QueryClient } from '@tanstack/react-query';

/**
 * Shared QueryClient instance.
 *
 * Key settings:
 * - staleTime: 5 min — avoids refetching on every screen focus
 * - gcTime: 30 min — keeps cache around for fast back-navigation
 * - retry: 2 — mobile networks are flaky, give it a couple of tries
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false, // RN doesn't have window focus the same way
    },
    mutations: {
      retry: 1,
    },
  },
});
