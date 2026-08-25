import React, { useEffect } from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export default function Skeleton({
  width,
  height,
  borderRadius = 12,
  style,
}: SkeletonProps) {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.3, 0.7]),
  }));

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: '#2A2A3E',
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

/** A skeleton that looks like a product card. */
export function ProductCardSkeleton() {
  return (
    <View
      style={{
        backgroundColor: '#1A1A2E',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#2A2A3E',
      }}
    >
      <Skeleton width="100%" height={160} borderRadius={0} />
      <View style={{ padding: 14, gap: 8 }}>
        <Skeleton width="80%" height={16} />
        <Skeleton width="50%" height={12} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 4,
          }}
        >
          <Skeleton width={60} height={20} />
          <Skeleton width={36} height={36} borderRadius={12} />
        </View>
      </View>
    </View>
  );
}
