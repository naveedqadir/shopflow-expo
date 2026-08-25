import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/src/types';
import { secureStorageAdapter } from '@/src/lib/storage';
import { clearAuthToken, setAuthToken } from '@/src/api/client';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  /** Set user + token after login/register. Also persists token to SecureStore. */
  setAuth: (user: User, token: string) => void;

  /** Clear all auth state and remove token from SecureStore. */
  logout: () => void;

  /** Called by persist middleware when hydration completes. */
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,

      setAuth: (user, token) => {
        // Fire-and-forget SecureStore write
        setAuthToken(token);
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        clearAuthToken();
        set({ user: null, token: null, isAuthenticated: false });
      },

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorageAdapter),
      // Only persist the fields that matter — user + token
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
