import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeInDown,
  FadeInRight,
} from 'react-native-reanimated';
import { useProducts, useCategories } from '@/src/hooks/useProducts';
import { useCartStore } from '@/src/stores/cartStore';
import { useAuthStore } from '@/src/stores/authStore';
import { useTheme } from '@/src/hooks/useTheme';
import ProductCard from '@/src/components/Card';
import { ProductCardSkeleton } from '@/src/components/SkeletonLoader';
import type { ProductFilters, Product } from '@/src/types';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const { colors } = useTheme();

  // Local UI state — search + category filter (useState, not Zustand)
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filters: ProductFilters = {
    category: selectedCategory,
    search: search.trim() || undefined,
  };

  // Server state — TanStack Query
  const {
    data: products,
    isLoading,
    refetch,
    isRefetching,
  } = useProducts(filters);
  const { data: categories } = useCategories();

  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem(product);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    [addItem]
  );

  const renderHeader = () => (
    <>
      {/* Greeting */}
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        style={{ marginBottom: 24 }}
      >
        <Text style={{ fontSize: 14, color: colors.textMuted }}>
          Welcome back,
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '800',
            color: colors.text,
            letterSpacing: -0.5,
            marginTop: 4,
          }}
        >
          {user?.name ?? 'Shopper'} 👋
        </Text>
      </Animated.View>

      {/* Search bar */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          paddingHorizontal: 16,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Search size={18} color={colors.textMuted} />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
          style={{
            flex: 1,
            fontSize: 15,
            color: colors.textSecondary,
            paddingVertical: 14,
            paddingHorizontal: 12,
          }}
        />
        <Pressable
          style={{
            backgroundColor: colors.bgElevated,
            padding: 8,
            borderRadius: 10,
          }}
        >
          <SlidersHorizontal size={16} color={colors.primary} />
        </Pressable>
      </Animated.View>

      {/* Category chips */}
      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginBottom: 20 }}
        >
          {categories?.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => {
                  setSelectedCategory(cat.id);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: isActive ? colors.primary : colors.bgCard,
                  borderWidth: 1,
                  borderColor: isActive ? colors.primary : colors.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: isActive ? '#FFFFFF' : colors.textMuted,
                  }}
                >
                  {cat.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* Section header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: '700', color: colors.text }}
        >
          {selectedCategory === 'all' ? 'All Products' : categories?.find((c) => c.id === selectedCategory)?.name ?? 'Products'}
        </Text>
        <Text style={{ fontSize: 13, color: colors.textMuted }}>
          {products?.length ?? 0} items
        </Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <FlatList
        data={isLoading ? [] : products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: CARD_GAP }}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: 100,
          gap: CARD_GAP,
        }}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          isLoading ? (
            <View style={{ flexDirection: 'row', gap: CARD_GAP }}>
              <View style={{ flex: 1 }}>
                <ProductCardSkeleton />
              </View>
              <View style={{ flex: 1 }}>
                <ProductCardSkeleton />
              </View>
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 60,
              }}
            >
              <Text style={{ fontSize: 16, color: colors.textMuted }}>
                No products found
              </Text>
            </View>
          )
        }
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInRight.delay(index * 80).duration(400)}
            style={{ flex: 1 }}
          >
            <ProductCard
              product={item}
              isInCart={cartItems.some((cartItem) => cartItem.product.id === item.id)}
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
              onAddToCart={() => handleAddToCart(item)}
              onViewCart={() => router.push('/(tabs)/cart')}
            />
          </Animated.View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
