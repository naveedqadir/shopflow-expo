import React from 'react';
import { View, Text, Pressable, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { ShoppingCart, CheckCircle2, Star } from 'lucide-react-native';
import type { Product } from '@/src/types';
import { useTheme } from '@/src/hooks/useTheme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
  onViewCart?: () => void;
  isInCart?: boolean;
  style?: ViewStyle;
}

export default function ProductCard({
  product,
  onPress,
  onAddToCart,
  onViewCart,
  isInCart = false,
  style,
}: ProductCardProps) {
  const scale = useSharedValue(1);
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
      }}
      style={[
        {
          backgroundColor: colors.bgCard,
          borderRadius: 20,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.border,
        },
        animatedStyle,
        style,
      ]}
    >
      {/* Image */}
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: product.image }}
          style={{ width: '100%', aspectRatio: 1, backgroundColor: colors.bgElevated }}
          contentFit="cover"
          transition={300}
        />
        {hasDiscount && (
          <View
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: colors.danger,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700' }}>
              -{discountPercent}%
            </Text>
          </View>
        )}
        {!product.inStock && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>
              Out of Stock
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={{ padding: 14 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: colors.textSecondary,
            marginBottom: 6,
          }}
        >
          {product.name}
        </Text>

        {/* Rating */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginBottom: 10,
          }}
        >
          <Star size={13} color={colors.warning} fill={colors.warning} />
          <Text style={{ fontSize: 12, color: colors.textMuted, fontWeight: '500' }}>
            {product.rating} ({product.reviewCount.toLocaleString()})
          </Text>
        </View>

        {/* Price + Cart */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: colors.primary }}>
              ${product.price}
            </Text>
            {hasDiscount && (
              <Text
                style={{
                  fontSize: 13,
                  color: colors.textMuted,
                  textDecorationLine: 'line-through',
                }}
              >
                ${product.originalPrice}
              </Text>
            )}
          </View>

          {product.inStock && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                if (isInCart && onViewCart) {
                  onViewCart();
                } else {
                  onAddToCart();
                }
              }}
              style={{
                backgroundColor: isInCart ? colors.success : colors.primary,
                width: 36,
                height: 36,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isInCart ? (
                <CheckCircle2 size={16} color="#FFF" />
              ) : (
                <ShoppingCart size={16} color="#FFF" />
              )}
            </Pressable>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
}
