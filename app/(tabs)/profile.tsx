import React from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  LogOut,
  Moon,
  Sun,
  ChevronRight,
  ShieldCheck,
  Bell,
  CircleHelp,
  Info,
  Palette,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useAuthStore } from '@/src/stores/authStore';
import { useUIStore } from '@/src/stores/uiStore';
import { useTheme } from '@/src/hooks/useTheme';
import Button from '@/src/components/Button';

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
  colors: ReturnType<typeof useTheme>['colors'];
}

function SettingsItem({
  icon,
  label,
  value,
  onPress,
  rightElement,
  danger,
  colors,
}: SettingsItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 14,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: danger ? colors.dangerBg : colors.bgElevated,
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
            color: danger ? colors.danger : colors.textSecondary,
          }}
        >
          {label}
        </Text>
        {value && (
          <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
            {value}
          </Text>
        )}
      </View>
      {rightElement ?? (
        <ChevronRight size={18} color={colors.textMuted} />
      )}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const colorMode = useUIStore((s) => s.colorMode);
  const toggleColorMode = useUIStore((s) => s.toggleColorMode);
  const { colors, isDark } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile header */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(500)}
          style={{
            alignItems: 'center',
            paddingVertical: 24,
            marginBottom: 8,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 34,
              borderWidth: 3,
              borderColor: colors.primary,
              padding: 3,
              marginBottom: 16,
            }}
          >
            <Image
              source={{ uri: user?.avatar }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 30,
                backgroundColor: colors.bgCard,
              }}
              contentFit="cover"
              transition={300}
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '800',
              color: colors.text,
              letterSpacing: -0.5,
            }}
          >
            {user?.name}
          </Text>
          <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
            {user?.email}
          </Text>
          <View
            style={{
              backgroundColor: colors.primaryBg,
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 20,
              marginTop: 10,
              borderWidth: 1,
              borderColor: colors.primaryMuted,
            }}
          >
            <Text style={{ fontSize: 12, color: colors.primary, fontWeight: '600' }}>
              Member since {user?.joinedAt}
            </Text>
          </View>
        </Animated.View>

        {/* Preferences */}
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
            Preferences
          </Text>
          <SettingsItem
            colors={colors}
            icon={
              isDark ? (
                <Moon size={18} color={colors.primary} />
              ) : (
                <Sun size={18} color={colors.warning} />
              )
            }
            label="Theme"
            value={isDark ? 'Dark Mode' : 'Light Mode'}
            onPress={() => {
              toggleColorMode();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            rightElement={
              <Pressable
                onPress={() => {
                  toggleColorMode();
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                style={{
                  width: 52,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: isDark ? colors.primary : colors.border,
                  justifyContent: 'center',
                  paddingHorizontal: 3,
                }}
              >
                <Animated.View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: '#FFFFFF',
                    alignSelf: isDark ? 'flex-end' : 'flex-start',
                  }}
                />
              </Pressable>
            }
          />
          <SettingsItem
            colors={colors}
            icon={<Bell size={18} color={colors.primary} />}
            label="Notifications"
            value="Push & email enabled"
            onPress={() => router.push('/settings/notifications')}
          />
        </Animated.View>

        {/* Support */}
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
            Support
          </Text>
          <SettingsItem
            colors={colors}
            icon={<CircleHelp size={18} color={colors.primary} />}
            label="Help Center"
            onPress={() => router.push('/settings/help')}
          />
          <SettingsItem
            colors={colors}
            icon={<ShieldCheck size={18} color={colors.primary} />}
            label="Privacy Policy"
            onPress={() => router.push('/settings/privacy')}
          />
          <SettingsItem
            colors={colors}
            icon={<Info size={18} color={colors.primary} />}
            label="About"
            value="ShopFlow v1.0.0 • Expo SDK 56"
            onPress={() => router.push('/settings/about')}
          />
        </Animated.View>

        {/* Stack info card */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(500)}
          style={{
            backgroundColor: colors.primaryBg,
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.primaryMuted,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Palette size={16} color={colors.primary} />
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.primary }}>
              Built With
            </Text>
          </View>
          {[
            'Expo Router (navigation)',
            'Zustand (client state)',
            'TanStack Query (server state)',
            'React Hook Form + Zod (forms)',
            'SecureStore + AsyncStorage (persistence)',
            'Reanimated + Gesture Handler (animations)',
            'Lucide Icons (iconography)',
            'expo-image + expo-haptics (UX)',
          ].map((tech, i) => (
            <Text
              key={i}
              style={{
                fontSize: 13,
                color: colors.textMuted,
                lineHeight: 22,
              }}
            >
              • {tech}
            </Text>
          ))}
        </Animated.View>

        {/* Sign out */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)}>
          <Button
            title="Sign Out"
            variant="destructive"
            onPress={handleLogout}
            fullWidth
            icon={<LogOut size={18} color="#FFF" />}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
