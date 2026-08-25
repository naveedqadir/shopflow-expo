import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CircleAlert } from 'lucide-react-native';
import Button from '@/src/components/Button';
import { useTheme } from '@/src/hooks/useTheme';

export default function NotFoundScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: colors.dangerBg,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <CircleAlert size={40} color={colors.danger} />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '800',
          color: colors.text,
          marginBottom: 8,
        }}
      >
        Page Not Found
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: colors.textMuted,
          textAlign: 'center',
          lineHeight: 22,
          marginBottom: 32,
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </Text>
      <Button
        title="Go Home"
        onPress={() => router.replace('/(tabs)')}
        size="lg"
      />
    </SafeAreaView>
  );
}
