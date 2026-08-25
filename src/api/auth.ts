import type { AuthResponse } from '@/src/types';
import { apiClient, setAuthToken } from './client';
import { SAMPLE_USER } from './mock-data';

/**
 * Mock login — accepts any email with a password ≥ 8 chars.
 */
export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  return apiClient(() => {
    if (password.length < 8) {
      throw new Error('Invalid email or password');
    }

    const token = `mock-jwt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const user = { ...SAMPLE_USER, email };

    return { user, token };
  }, 800);
}

/**
 * Mock register — creates a new user with a mock token.
 */
export async function register(
  name: string,
  email: string,
  _password: string
): Promise<AuthResponse> {
  return apiClient(() => {
    const token = `mock-jwt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const user = {
      ...SAMPLE_USER,
      id: `user-${Date.now()}`,
      name,
      email,
      joinedAt: new Date().toISOString().split('T')[0],
    };

    return { user, token };
  }, 1000);
}

/**
 * Mock profile fetch — returns the sample user.
 */
export async function getProfile(): Promise<AuthResponse['user']> {
  return apiClient(() => SAMPLE_USER, 300);
}
