import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Check,
  ChevronRight,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { useProduct } from '@/src/hooks/useProducts';
import { useCartStore } from '@/src/stores/cartStore';
import { useTheme } from '@/src/hooks/useTheme';
import Button from '@/src/components/Button';
import Badge from '@/src/components/Badge';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: product, isLoading } = useProduct(id);
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const { colors } = useTheme();

  const isInCart = items.some((i) => i.product.id === id);

  // Pinch-to-zoom gesture
  const imageScale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      imageScale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = imageScale.value;
      if (imageScale.value < 1) {
        imageScale.value = withSpring(1);
        savedScale.value = 1;
      } else if (imageScale.value > 3) {
        imageScale.value = withSpring(3);
        savedScale.value = 3;
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (imageScale.value > 1) {
        imageScale.value = withSpring(1);
        savedScale.value = 1;
      } else {
        imageScale.value = withSpring(2);
        savedScale.value = 2;
      }
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, doubleTapGesture);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: colors.textMuted, fontSize: 16 }}>
          Product not found
        </Text>
      </SafeAreaView>
    );
  }

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Back button */}
      <Animated.View
        entering={FadeIn.delay(100).duration(300)}
        style={{
          position: 'absolute',
          top: 56,
          left: 20,
          zIndex: 10,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: colors.bgOverlay,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <ArrowLeft size={20} color={colors.text} />
        </Pressable>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Hero image with pinch-to-zoom */}
        <GestureDetector gesture={composedGesture}>
          <Animated.View
            style={{
              overflow: 'hidden',
              backgroundColor: colors.bg,
            }}
          >
            <Animated.View style={imageAnimatedStyle}>
              <Image
                source={{ uri: product.image }}
                style={{
                  width: SCREEN_WIDTH,
                  height: SCREEN_WIDTH,
                }}
                contentFit="cover"
                transition={500}
              />
            </Animated.View>
          </Animated.View>
        </GestureDetector>

        {/* Content */}
        <View style={{ padding: 24, gap: 16 }}>
          {/* Category + Rating */}
          <Animated.View
            entering={FadeInDown.delay(100).duration(400)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Badge label={product.category} variant="info" />
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Star size={16} color={colors.warning} fill={colors.warning} />
              <Text
                style={{ fontSize: 14, color: colors.text, fontWeight: '600' }}
              >
                {product.rating}
              </Text>
              <Text style={{ fontSize: 13, color: colors.textMuted }}>
                ({product.reviewCount.toLocaleString()} reviews)
              </Text>
            </View>
          </Animated.View>

          {/* Name */}
          <Animated.Text
            entering={FadeInDown.delay(150).duration(400)}
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: colors.text,
              letterSpacing: -0.5,
            }}
          >
            {product.name}
          </Animated.Text>

          {/* Price */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(400)}
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: '800',
                color: colors.primary,
              }}
            >
              ${product.price}
            </Text>
            {hasDiscount && (
              <>
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.textMuted,
                    textDecorationLine: 'line-through',
                  }}
                >
                  ${product.originalPrice}
                </Text>
                <Badge
                  label={`Save $${product.originalPrice! - product.price}`}
                  variant="success"
                />
              </>
            )}
          </Animated.View>

          {/* Description */}
          <Animated.Text
            entering={FadeInDown.delay(250).duration(400)}
            style={{
              fontSize: 15,
              color: colors.textSecondary,
              lineHeight: 24,
            }}
          >
            {product.description}
          </Animated.Text>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <Animated.View
              entering={FadeInDown.delay(300).duration(400)}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: colors.textSecondary,
                  marginBottom: 10,
                }}
              >
                Colors
              </Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {product.colors.map((color, i) => (
                  <View
                    key={i}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: color,
                      borderWidth: 2,
                      borderColor: i === 0 ? colors.primary : colors.border,
                    }}
                  />
                ))}
              </View>
            </Animated.View>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <Animated.View
              entering={FadeInDown.delay(350).duration(400)}
              style={{
                backgroundColor: colors.bgCard,
                borderRadius: 16,
                padding: 16,
                gap: 10,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: colors.textSecondary,
                  marginBottom: 4,
                }}
              >
                Key Features
              </Text>
              {product.features.map((feature, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      backgroundColor: colors.primaryBg,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check size={14} color={colors.primary} />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.textSecondary,
                    }}
                  >
                    {feature}
                  </Text>
                </View>
              ))}
            </Animated.View>
          )}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <Animated.View
        entering={FadeInUp.delay(400).duration(500)}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.bgOverlay,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          padding: 20,
          paddingBottom: 34,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, color: colors.textMuted }}>Price</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '800',
              color: colors.text,
            }}
          >
            ${product.price}
          </Text>
        </View>
        <View style={{ flex: 1.5 }}>
          <Button
            title={isInCart ? 'View Cart →' : 'Add to Cart'}
            onPress={isInCart ? () => router.push('/(tabs)/cart') : handleAddToCart}
            variant={isInCart ? 'secondary' : 'primary'}
            size="lg"
            fullWidth
            disabled={!product.inStock}
            icon={
              isInCart ? undefined : (
                <ShoppingCart size={18} color="#FFF" />
              )
            }
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
