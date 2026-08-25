import React from 'react';
import { View, Text, ScrollView, Image, Linking, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { Github, Globe, ExternalLink } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/src/hooks/useTheme';
import Button from '@/src/components/Button';

export default function AboutScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'About' }} />
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.bg }}
      >
        <Animated.View
          entering={FadeInDown.delay(100).duration(500)}
          style={{ alignItems: 'center', marginBottom: 40, marginTop: 20 }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 24,
              backgroundColor: colors.bgCard,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              shadowColor: colors.text,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            {/* Using a placeholder for logo, could be a local asset */}
            <Text style={{ fontSize: 32, fontWeight: '900', color: colors.primary }}>
              SF
            </Text>
          </View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: colors.text,
              letterSpacing: -0.5,
              marginBottom: 4,
            }}
          >
            ShopFlow
          </Text>
          <Text style={{ fontSize: 15, color: colors.textMuted }}>
            Version 1.0.0
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={{ marginBottom: 32 }}
        >
          <Text
            style={{
              fontSize: 15,
              color: colors.textSecondary,
              lineHeight: 24,
              textAlign: 'center',
            }}
          >
            A modern, performant, and beautifully designed e-commerce application built to demonstrate the capabilities of Expo and React Native.
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300).duration(500)}
          style={{ gap: 12, marginBottom: 40 }}
        >
          <Button
            title="Visit Website"
            variant="outline"
            onPress={() => Linking.openURL('https://expo.dev')}
            icon={<Globe size={18} color={colors.primary} />}
            fullWidth
          />
          <Button
            title="Source Code"
            variant="secondary"
            onPress={() => Linking.openURL('https://github.com/')}
            icon={<Github size={18} color={colors.text} />}
            fullWidth
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(500)}>
          <Text
            style={{
              fontSize: 12,
              color: colors.textMuted,
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            Built with ❤️ using Expo Router, Zustand, and TanStack Query.
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.textMuted,
              textAlign: 'center',
            }}
          >
            © 2026 ShopFlow Inc. All rights reserved.
          </Text>
        </Animated.View>
      </ScrollView>
    </>
  );
}
