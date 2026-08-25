import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useOrder } from '@/src/hooks/useOrders';
import { useTheme } from '@/src/hooks/useTheme';
import Badge, { getOrderStatusVariant } from '@/src/components/Badge';
import Button from '@/src/components/Button';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { data: order, isLoading } = useOrder(id);

  const STATUS_ICONS: Record<string, React.ReactNode> = {
    processing: <Package size={20} color={colors.warning} />,
    shipped: <Truck size={20} color={colors.primary} />,
    delivered: <CheckCircle size={20} color={colors.success} />,
    cancelled: <XCircle size={20} color={colors.danger} />,
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

  if (!order) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <Text style={{ color: colors.textMuted, fontSize: 16, marginBottom: 16 }}>
          Order not found
        </Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, gap: 24, paddingBottom: 100 }}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: '800',
                color: colors.text,
                letterSpacing: -0.5,
              }}
            >
              Order Details
            </Text>
            <Badge
              label={order.status}
              variant={getOrderStatusVariant(order.status)}
            />
          </View>
          <Text style={{ fontSize: 15, color: colors.textMuted }}>
            ID: {order.id}
          </Text>
        </Animated.View>

        {/* Status Tracker */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(400)}
          style={{
            backgroundColor: colors.bgCard,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.border,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.bgElevated,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {STATUS_ICONS[order.status]}
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textSecondary }}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
            <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
              {order.status === 'delivered'
                ? `Delivered on ${order.createdAt}` // Mock delivery date
                : order.status === 'cancelled'
                  ? 'Order was cancelled'
                  : `Estimated delivery: ${order.estimatedDelivery}`}
            </Text>
          </View>
        </Animated.View>

        {/* Items */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Items Ordered
          </Text>
          <View style={{ gap: 16 }}>
            {order.items.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  paddingBottom: 16,
                  borderBottomWidth: index !== order.items.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                }}
              >
                <Image
                  source={{ uri: item.productImage }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    backgroundColor: colors.bgElevated,
                  }}
                  contentFit="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: colors.textSecondary,
                      marginBottom: 4,
                    }}
                  >
                    {item.productName}
                  </Text>
                  <Text style={{ fontSize: 13, color: colors.textMuted }}>
                    Qty: {item.quantity}
                  </Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>
                  ${item.price}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Summary */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(400)}
          style={{
            backgroundColor: colors.bgCard,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.border,
            gap: 12,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>Subtotal</Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary, fontWeight: '600' }}>
              ${order.total}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>Shipping</Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary, fontWeight: '600' }}>
              Free
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: colors.border,
              marginVertical: 4,
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>
              Total
            </Text>
            <Text style={{ fontSize: 18, fontWeight: '800', color: colors.primary }}>
              ${order.total}
            </Text>
          </View>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.delay(500).duration(400)}>
            <Button title="Continue Shopping" variant="outline" fullWidth onPress={() => router.push('/(tabs)')} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
