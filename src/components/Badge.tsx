import React from 'react';
import { View, Text, type ViewStyle } from 'react-native';
import type { OrderStatus } from '@/src/types';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const VARIANT_COLORS: Record<BadgeVariant, { bg: string; text: string }> = {
  default: { bg: '#2A2A3E', text: '#9CA3AF' },
  success: { bg: '#10B98120', text: '#10B981' },
  warning: { bg: '#F59E0B20', text: '#F59E0B' },
  danger: { bg: '#FF475720', text: '#FF4757' },
  info: { bg: '#6C63FF20', text: '#6C63FF' },
};

export default function Badge({
  label,
  variant = 'default',
  style,
}: BadgeProps) {
  const colors = VARIANT_COLORS[variant];

  return (
    <View
      style={[
        {
          backgroundColor: colors.bg,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 8,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: colors.text,
          textTransform: 'capitalize',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

/**
 * Maps order status to a badge variant.
 */
export function getOrderStatusVariant(status: OrderStatus): BadgeVariant {
  switch (status) {
    case 'delivered':
      return 'success';
    case 'shipped':
      return 'info';
    case 'processing':
      return 'warning';
    case 'cancelled':
      return 'danger';
    default:
      return 'default';
  }
}
