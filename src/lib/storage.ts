import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { type StateStorage } from 'zustand/middleware';

/**
 * AsyncStorage adapter for Zustand persist middleware.
 * Use for non-sensitive data: cart, theme, preferences, onboarding.
 */
export const asyncStorageAdapter: StateStorage = {
  getItem: async (name: string) => {
    return await AsyncStorage.getItem(name);
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

/**
 * SecureStore adapter for Zustand persist middleware.
 * Use for sensitive data: auth tokens, credentials.
 *
 * Note: SecureStore has a 2048-byte limit per value on some platforms,
 * so only store minimal sensitive data here.
 */
export const secureStorageAdapter: StateStorage = {
  getItem: async (name: string) => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};
