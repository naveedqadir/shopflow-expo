import React from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeInUp, SlideOutRight } from 'react-native-reanimated';
import { useCartStore } from '@/src/stores/cartStore';
import { useCreateOrder } from '@/src/hooks/useOrders';
import { useTheme } from '@/src/hooks/useTheme';
import QuantityStepper from '@/src/components/QuantityStepper';
import Button from '@/src/components/Button';
import EmptyState from '@/src/components/EmptyState';
import type { CartItem } from '@/src/types';

export default function CartScreen() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.getTotalPrice());
  const totalItems = useCartStore((s) => s.getTotalItems());
  const router = useRouter();
  const { colors } = useTheme();

  const { mutateAsync: checkout, isPending: isCheckingOut } = useCreateOrder();

  const handleCheckout = async () => {
    try {
      await checkout();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        '🎉 Order Placed!',
        'Your order has been placed successfully. Check the Orders tab for updates.',
        [{ text: 'View Orders', onPress: () => router.push('/(tabs)/orders') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  const handleRemove = (productId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    removeItem(productId);
  };

  const renderItem = ({ item, index }: { item: CartItem; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 80).duration(400)}
      exiting={SlideOutRight.duration(300)}
      style={{
        flexDirection: 'row',
        backgroundColor: colors.bgCard,
        borderRadius: 18,
        padding: 12,
        gap: 14,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Product image */}
      <Image
        source={{ uri: item.product.image }}
        style={{
          width: 90,
          height: 90,
          borderRadius: 14,
          backgroundColor: colors.bgElevated,
        }}
        contentFit="cover"
        transition={200}
      />

      {/* Details */}
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: colors.textSecondary,
              marginBottom: 4,
            }}
          >
            {item.product.name}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: '800', color: colors.primary }}>
            ${item.product.price}
          </Text>
        </View>

        {/* Quantity + remove */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 8,
          }}
        >
          <QuantityStepper
            quantity={item.quantity}
            onIncrement={() =>
              updateQuantity(item.product.id, item.quantity + 1)
            }
            onDecrement={() =>
              updateQuantity(item.product.id, item.quantity - 1)
            }
          />
          <Pressable
            onPress={() => handleRemove(item.product.id)}
            hitSlop={12}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: colors.dangerBg,
            }}
          >
            <Trash2 size={18} color={colors.danger} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header */}
      <View style={{ padding: 24, paddingBottom: 0 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '800',
            color: colors.text,
            letterSpacing: -0.5,
          }}
        >
          My Cart
        </Text>
        {totalItems > 0 && (
          <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Text>
        )}
      </View>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={36} color={colors.textMuted} />}
          title="Your cart is empty"
          subtitle="Browse products and add items to get started"
          action={
            <Button
              title="Browse Products"
              variant="outline"
              onPress={() => router.push('/(tabs)')}
            />
          }
        />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.product.id}
            renderItem={renderItem}
            contentContainerStyle={{
              padding: 24,
              gap: 12,
              paddingBottom: 200,
            }}
            showsVerticalScrollIndicator={false}
          />

          {/* Checkout bar */}
          <Animated.View
            entering={FadeInUp.duration(500)}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: colors.bgOverlay,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              padding: 24,
              paddingBottom: 34,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          >
            {/* Summary */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <View>
                <Text style={{ fontSize: 13, color: colors.textMuted }}>Total</Text>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: '800',
                    color: colors.text,
                    letterSpacing: -0.5,
                  }}
                >
                  ${totalPrice.toLocaleString()}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>
                  Free shipping
                </Text>
                <Text style={{ fontSize: 12, color: colors.success, fontWeight: '600' }}>
                  You save ${items.reduce((sum, i) =>
                    sum + ((i.product.originalPrice ?? i.product.price) - i.product.price) * i.quantity, 0
                  )}
                </Text>
              </View>
            </View>

            <Button
              title="Checkout"
              onPress={handleCheckout}
              loading={isCheckingOut}
              fullWidth
              size="lg"
              icon={<ArrowRight size={18} color="#FFF" />}
            />
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
}
