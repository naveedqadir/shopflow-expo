import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { ShieldCheck } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/src/hooks/useTheme';

const sections = [
  {
    title: 'Information We Collect',
    body: `ShopFlow collects minimal data to provide a seamless shopping experience:\n\n• Account information (name, email address)\n• Purchase history and order details\n• Device information for analytics\n• Usage data to improve our services\n\nWe do NOT collect or store payment information directly — all transactions are processed through secure, PCI-compliant third-party providers.`,
  },
  {
    title: 'How We Use Your Data',
    body: `Your data is used exclusively to:\n\n• Process and fulfill your orders\n• Provide customer support\n• Send order updates and notifications\n• Improve our app and services\n• Comply with legal obligations\n\nWe will never sell your personal information to third parties.`,
  },
  {
    title: 'Data Storage & Security',
    body: `We take data security seriously:\n\n• Authentication tokens are stored in your device's Secure Enclave via expo-secure-store\n• Cart and preferences are stored locally using AsyncStorage\n• All API communications use HTTPS encryption\n• We follow industry best practices for data protection`,
  },
  {
    title: 'Your Rights',
    body: `You have the right to:\n\n• Access your personal data\n• Request data correction or deletion\n• Opt out of marketing communications\n• Export your data\n• Withdraw consent at any time\n\nTo exercise these rights, contact privacy@shopflow.dev`,
  },
  {
    title: 'Contact Us',
    body: `For privacy-related questions or concerns:\n\n📧 privacy@shopflow.dev\n📍 ShopFlow Inc.\n    123 Tech Avenue\n    San Francisco, CA 94105`,
  },
];

export default function PrivacyScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Privacy Policy' }} />
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.bg }}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(500)}
          style={{
            alignItems: 'center',
            marginBottom: 32,
          }}
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
            <ShieldCheck size={32} color={colors.primary} />
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: colors.text,
              marginBottom: 6,
            }}
          >
            Privacy Policy
          </Text>
          <Text style={{ fontSize: 13, color: colors.textMuted }}>
            Last updated: August 2026
          </Text>
        </Animated.View>

        {/* Sections */}
        {sections.map((section, i) => (
          <Animated.View
            key={i}
            entering={FadeInDown.delay(150 + i * 80).duration(500)}
            style={{
              backgroundColor: colors.bgCard,
              borderRadius: 16,
              padding: 20,
              marginBottom: 14,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: colors.text,
                marginBottom: 10,
              }}
            >
              {section.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                lineHeight: 22,
              }}
            >
              {section.body}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>
    </>
  );
}
