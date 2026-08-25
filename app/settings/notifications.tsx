import React from 'react';
import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { Bell, Mail, Smartphone, Tag, Package, Megaphone } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/src/hooks/useTheme';

interface NotificationToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  colors: ReturnType<typeof useTheme>['colors'];
}

function NotificationToggle({
  icon,
  label,
  description,
  value,
  onValueChange,
  colors,
}: NotificationToggleProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 14,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: colors.bgElevated,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: colors.textSecondary,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 2,
          }}
        >
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

export default function NotificationsScreen() {
  const { colors } = useTheme();

  // Demo state — in a real app these would be persisted
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const [orderUpdates, setOrderUpdates] = React.useState(true);
  const [promotions, setPromotions] = React.useState(false);
  const [priceAlerts, setPriceAlerts] = React.useState(true);

  return (
    <>
      <Stack.Screen options={{ title: 'Notifications' }} />
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.bg }}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(500)}
          style={{ alignItems: 'center', marginBottom: 32 }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              backgroundColor: colors.primaryBg,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Bell size={32} color={colors.primary} />
          </View>
          <Text
            style={{ fontSize: 22, fontWeight: '800', color: colors.text }}
          >
            Notification Settings
          </Text>
        </Animated.View>

        {/* Channels */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={{
            backgroundColor: colors.bgCard,
            borderRadius: 18,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '700',
              color: colors.textMuted,
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 4,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            Channels
          </Text>
          <NotificationToggle
            colors={colors}
            icon={<Smartphone size={18} color={colors.primary} />}
            label="Push Notifications"
            description="Alerts on your device"
            value={pushEnabled}
            onValueChange={setPushEnabled}
          />
          <NotificationToggle
            colors={colors}
            icon={<Mail size={18} color={colors.primary} />}
            label="Email Notifications"
            description="Updates to your inbox"
            value={emailEnabled}
            onValueChange={setEmailEnabled}
          />
        </Animated.View>

        {/* Types */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(500)}
          style={{
            backgroundColor: colors.bgCard,
            borderRadius: 18,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '700',
              color: colors.textMuted,
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 4,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            Notification Types
          </Text>
          <NotificationToggle
            colors={colors}
            icon={<Package size={18} color={colors.success} />}
            label="Order Updates"
            description="Shipping and delivery alerts"
            value={orderUpdates}
            onValueChange={setOrderUpdates}
          />
          <NotificationToggle
            colors={colors}
            icon={<Tag size={18} color={colors.warning} />}
            label="Price Alerts"
            description="When items in your wishlist drop"
            value={priceAlerts}
            onValueChange={setPriceAlerts}
          />
          <NotificationToggle
            colors={colors}
            icon={<Megaphone size={18} color={colors.info} />}
            label="Promotions"
            description="Sales, deals, and special offers"
            value={promotions}
            onValueChange={setPromotions}
          />
        </Animated.View>
      </ScrollView>
    </>
  );
}
