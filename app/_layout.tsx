import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Slot, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/src/lib/queryClient';
import { useAuthStore } from '@/src/stores/authStore';
import { useTheme } from '@/src/hooks/useTheme';
import * as SplashScreen from 'expo-splash-screen';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

/**
 * Auth guard — redirects to login if not authenticated,
 * or to home if authenticated and viewing auth screens.
 */
function useProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return; // wait for Zustand to rehydrate from SecureStore

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Not logged in → send to login
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Logged in but on auth screen → send to home
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isHydrated, segments]);
}

export default function RootLayout() {
  const { colors, isDark } = useTheme();
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useProtectedRoute();

  useEffect(() => {
    // Hide splash once stores are hydrated
    if (isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [isHydrated]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Slot />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
