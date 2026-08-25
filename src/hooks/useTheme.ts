import { useMemo } from 'react';
import { useUIStore } from '@/src/stores/uiStore';
import { getTheme, type ThemeColors } from '@/src/lib/theme';

/**
 * Convenience hook — returns the resolved theme colors
 * and the current color mode.
 */
export function useTheme(): { colors: ThemeColors; colorMode: 'dark' | 'light'; isDark: boolean } {
  const colorMode = useUIStore((s) => s.colorMode);
  const colors = useMemo(() => getTheme(colorMode), [colorMode]);
  return { colors, colorMode, isDark: colorMode === 'dark' };
}
