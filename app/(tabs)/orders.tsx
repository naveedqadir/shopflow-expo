import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { ClipboardList, Package, Truck, CheckCircle, XCircle } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useOrders } from '@/src/hooks/useOrders';
import { useTheme } from '@/src/hooks/useTheme';
import Badge, { getOrderStatusVariant } from '@/src/components/Badge';
import EmptyState from '@/src/components/EmptyState';
import type { Order } from '@/src/types';

export default function OrdersScreen() {
  const { data: orders, isLoading } = useOrders();
  const { colors } = useTheme();

  const STATUS_ICONS: Record<string, React.ReactNode> = {
    processing: <Package size={16} color={colors.warning} />,
    shipped: <Truck size={16} color={colors.primary} />,
    delivered: <CheckCircle size={16} color={colors.success} />,
    cancelled: <XCircle size={16} color={colors.danger} />,
  };

  const renderOrder = ({ item, index }: { item: Order; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(400)}
      style={{
        backgroundColor: colors.bgCard,
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
        gap: 14,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textSecondary }}>
            {item.id}
          </Text>
          <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
            {item.createdAt}
          </Text>
        </View>
        <Badge
          label={item.status}
          variant={getOrderStatusVariant(item.status)}
        />
      </View>

      {/* Items preview */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {item.items.slice(0, 3).map((orderItem, i) => (
          <Image
            key={i}
            source={{ uri: orderItem.productImage }}
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: colors.bgElevated,
            }}
            contentFit="cover"
            transition={200}
          />
        ))}
        {item.items.length > 3 && (
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: colors.bgElevated,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 13, color: colors.textMuted, fontWeight: '600' }}>
              +{item.items.length - 3}
            </Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {STATUS_ICONS[item.status]}
          <Text style={{ fontSize: 12, color: colors.textMuted }}>
            {item.status === 'delivered'
              ? 'Delivered'
              : item.status === 'cancelled'
                ? 'Cancelled'
                : `Est. ${item.estimatedDelivery}`}
          </Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: '800', color: colors.text }}>
          ${item.total.toLocaleString()}
        </Text>
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
          My Orders
        </Text>
      </View>

      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : !orders || orders.length === 0 ? (
        <EmptyState
          icon={<ClipboardList size={36} color={colors.textMuted} />}
          title="No orders yet"
          subtitle="Your order history will appear here after your first purchase"
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={{
            padding: 24,
            gap: 14,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
