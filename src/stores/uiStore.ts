import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { asyncStorageAdapter } from '@/src/lib/storage';

type ColorMode = 'light' | 'dark';

interface UIState {
  colorMode: ColorMode;
  hasCompletedOnboarding: boolean;

  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
  completeOnboarding: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      colorMode: 'dark',
      hasCompletedOnboarding: false,

      toggleColorMode: () =>
        set({ colorMode: get().colorMode === 'dark' ? 'light' : 'dark' }),

      setColorMode: (mode) => set({ colorMode: mode }),

      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => asyncStorageAdapter),
    }
  )
);
