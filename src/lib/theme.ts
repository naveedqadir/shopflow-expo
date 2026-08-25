/**
 * Theme system for ShopFlow.
 * Provides dark and light color palettes consumed by all screens.
 */

export interface ThemeColors {
  // Backgrounds
  bg: string;
  bgCard: string;
  bgElevated: string;
  bgInput: string;
  bgOverlay: string;

  // Borders
  border: string;
  borderSubtle: string;

  // Text
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  // Brand
  primary: string;
  primaryMuted: string;
  primaryBg: string;

  // Semantic
  success: string;
  successBg: string;
  danger: string;
  dangerBg: string;
  warning: string;
  warningBg: string;
  info: string;
  infoBg: string;

  // Tab bar
  tabBarBg: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
}

export const darkTheme: ThemeColors = {
  bg: '#0D0D1A',
  bgCard: '#1A1A2E',
  bgElevated: '#222236',
  bgInput: '#1A1A2E',
  bgOverlay: '#1A1A2EF0',

  border: '#2A2A3E',
  borderSubtle: '#1F1F33',

  text: '#FFFFFF',
  textSecondary: '#E0E0E0',
  textMuted: '#6B7280',
  textInverse: '#0D0D1A',

  primary: '#6C63FF',
  primaryMuted: '#6C63FF80',
  primaryBg: '#6C63FF15',

  success: '#10B981',
  successBg: '#10B98115',
  danger: '#FF4757',
  dangerBg: '#FF475715',
  warning: '#F59E0B',
  warningBg: '#F59E0B15',
  info: '#3B82F6',
  infoBg: '#3B82F615',

  tabBarBg: '#0D0D1A',
  tabBarBorder: '#1A1A2E',
  tabBarActive: '#6C63FF',
  tabBarInactive: '#4A4A5A',
};

export const lightTheme: ThemeColors = {
  bg: '#F8F9FC',
  bgCard: '#FFFFFF',
  bgElevated: '#F1F3F8',
  bgInput: '#F1F3F8',
  bgOverlay: '#FFFFFFE8',

  border: '#E5E7EB',
  borderSubtle: '#F1F3F8',

  text: '#111827',
  textSecondary: '#374151',
  textMuted: '#6B7280',
  textInverse: '#FFFFFF',

  primary: '#6C63FF',
  primaryMuted: '#6C63FF60',
  primaryBg: '#6C63FF10',

  success: '#059669',
  successBg: '#05966910',
  danger: '#DC2626',
  dangerBg: '#DC262610',
  warning: '#D97706',
  warningBg: '#D9770610',
  info: '#2563EB',
  infoBg: '#2563EB10',

  tabBarBg: '#FFFFFF',
  tabBarBorder: '#E5E7EB',
  tabBarActive: '#6C63FF',
  tabBarInactive: '#9CA3AF',
};

export function getTheme(mode: 'dark' | 'light'): ThemeColors {
  return mode === 'dark' ? darkTheme : lightTheme;
}
