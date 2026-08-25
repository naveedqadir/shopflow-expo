import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import LoginForm from '@/src/features/auth/components/LoginForm';
import { ShoppingBag } from 'lucide-react-native';

export default function LoginScreen() {
  // Entrance animations
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(40);
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 12, stiffness: 200 });
    logoOpacity.value = withTiming(1, { duration: 600 });
    formTranslateY.value = withDelay(
      300,
      withSpring(0, { damping: 20, stiffness: 200 })
    );
    formOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const formStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: formTranslateY.value }],
    opacity: formOpacity.value,
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D1A' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 24,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo & Header */}
          <Animated.View
            style={[
              { alignItems: 'center', marginBottom: 48 },
              logoStyle,
            ]}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 24,
                backgroundColor: '#6C63FF',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                shadowColor: '#6C63FF',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 24,
                elevation: 12,
              }}
            >
              <ShoppingBag size={36} color="#FFFFFF" />
            </View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: '800',
                color: '#FFFFFF',
                letterSpacing: -1,
              }}
            >
              ShopFlow
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#6B7280',
                marginTop: 8,
              }}
            >
              Sign in to continue
            </Text>
          </Animated.View>

          {/* Form */}
          <Animated.View style={formStyle}>
            <LoginForm />

            {/* Demo hint */}
            <View
              style={{
                backgroundColor: '#1A1A2E',
                borderRadius: 12,
                padding: 14,
                marginTop: 20,
                borderWidth: 1,
                borderColor: '#2A2A3E',
              }}
            >
              <Text style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>
                💡 Demo: use any email and a password with 8+ characters
              </Text>
            </View>

            {/* Register link */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 32,
                gap: 4,
              }}
            >
              <Text style={{ fontSize: 14, color: '#6B7280' }}>
                Don't have an account?
              </Text>
              <Link href="/(auth)/register" asChild>
                <Pressable>
                  <Text style={{ fontSize: 14, color: '#6C63FF', fontWeight: '600' }}>
                    Sign Up
                  </Text>
                </Pressable>
              </Link>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
