import React, { useEffect } from 'react';
import { View, Text, type ColorValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useCartStore } from '@/src/stores/cartStore';

interface CartBadgeProps {
  color: ColorValue;
}

export default function CartBadge({ color }: CartBadgeProps) {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const badgeScale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  useEffect(() => {
    if (totalItems > 0) {
      // Bounce in
      badgeScale.value = withSequence(
        withTiming(1.3, { duration: 150 }),
        withSpring(1, { damping: 12, stiffness: 300 })
      );
    } else {
      badgeScale.value = withTiming(0, { duration: 150 });
    }
  }, [totalItems]);

  if (totalItems === 0) return null;

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: -6,
          right: -12,
          backgroundColor: '#FF4757',
          minWidth: 18,
          height: 18,
          borderRadius: 9,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 4,
        },
        animatedStyle,
      ]}
    >
      <Text
        style={{
          color: '#FFF',
          fontSize: 11,
          fontWeight: '800',
          lineHeight: 14,
        }}
      >
        {totalItems > 99 ? '99+' : totalItems}
      </Text>
    </Animated.View>
  );
}
