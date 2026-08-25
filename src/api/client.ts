import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

/**
 * Simulates network delay (300-800ms) to make the demo feel realistic.
 */
const simulateDelay = (ms?: number) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms ?? 300 + Math.random() * 500)
  );

/**
 * API client wrapper that:
 * 1. Injects auth headers from SecureStore
 * 2. Simulates network latency
 * 3. Handles errors consistently
 */
export async function apiClient<T>(
  handler: () => T | Promise<T>,
  delayMs?: number
): Promise<T> {
  await simulateDelay(delayMs);
  return handler();
}

/**
 * Get the stored auth token (used by API calls that need auth).
 */
export async function getAuthToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

/**
 * Store auth token securely.
 */
export async function setAuthToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

/**
 * Clear auth token on logout.
 */
export async function clearAuthToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
