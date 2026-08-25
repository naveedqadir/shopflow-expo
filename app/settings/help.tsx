import React from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { Stack } from 'expo-router';
import {
  CircleHelp,
  MessageSquare,
  Mail,
  FileText,
  ExternalLink,
  ChevronRight,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/src/hooks/useTheme';

const faqs = [
  {
    q: 'How do I track my order?',
    a: 'Go to the Orders tab to see real-time status updates for all your purchases. Each order shows its current status (processing, shipped, delivered).',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major credit cards, Apple Pay, Google Pay, and PayPal. Payment processing is handled securely by our PCI-compliant payment provider.',
  },
  {
    q: 'How do I return an item?',
    a: 'You can initiate a return within 30 days of delivery. Go to Orders → select the order → tap "Request Return". We\'ll provide a prepaid shipping label.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes! Authentication tokens are stored in your device\'s Secure Enclave. All communications use HTTPS. Check our Privacy Policy for details.',
  },
];

export default function HelpScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Help Center' }} />
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
            <CircleHelp size={32} color={colors.primary} />
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: colors.text,
              marginBottom: 6,
            }}
          >
            How can we help?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.textMuted,
              textAlign: 'center',
              lineHeight: 20,
            }}
          >
            Find answers to common questions or reach out to us directly.
          </Text>
        </Animated.View>

        {/* Contact options */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={{
            flexDirection: 'row',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <Pressable
            onPress={() => Linking.openURL('mailto:support@shopflow.dev')}
            style={{
              flex: 1,
              backgroundColor: colors.bgCard,
              borderRadius: 16,
              padding: 20,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: colors.infoBg,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <Mail size={20} color={colors.info} />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: colors.text,
              }}
            >
              Email Us
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.textMuted,
                marginTop: 4,
              }}
            >
              24hr response
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: colors.bgCard,
              borderRadius: 16,
              padding: 20,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: colors.successBg,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <MessageSquare size={20} color={colors.success} />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: colors.text,
              }}
            >
              Live Chat
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.textMuted,
                marginTop: 4,
              }}
            >
              Mon–Fri, 9–5
            </Text>
          </Pressable>
        </Animated.View>

        {/* FAQs */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.text,
              marginBottom: 14,
            }}
          >
            Frequently Asked Questions
          </Text>
        </Animated.View>

        {faqs.map((faq, i) => (
          <Animated.View
            key={i}
            entering={FadeInDown.delay(350 + i * 80).duration(500)}
            style={{
              backgroundColor: colors.bgCard,
              borderRadius: 16,
              padding: 20,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: colors.text,
                marginBottom: 8,
              }}
            >
              {faq.q}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.textMuted,
                lineHeight: 22,
              }}
            >
              {faq.a}
            </Text>
          </Animated.View>
        ))}

        {/* Documentation link */}
        <Animated.View entering={FadeInDown.delay(700).duration(500)}>
          <Pressable
            onPress={() => Linking.openURL('https://docs.expo.dev')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.primaryBg,
              borderRadius: 16,
              padding: 18,
              gap: 14,
              marginTop: 8,
              borderWidth: 1,
              borderColor: colors.primaryMuted,
            }}
          >
            <FileText size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: colors.primary }}
              >
                Developer Documentation
              </Text>
              <Text
                style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}
              >
                Built with Expo SDK 56
              </Text>
            </View>
            <ExternalLink size={16} color={colors.primary} />
          </Pressable>
        </Animated.View>
      </ScrollView>
    </>
  );
}
