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
import RegisterForm from '@/src/features/auth/components/RegisterForm';
import { UserPlus } from 'lucide-react-native';

export default function RegisterScreen() {
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);
  const formTranslateY = useSharedValue(40);
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 500 });
    headerTranslateY.value = withSpring(0, { damping: 20, stiffness: 200 });
    formTranslateY.value = withDelay(
      200,
      withSpring(0, { damping: 20, stiffness: 200 })
    );
    formOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
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
          {/* Header */}
          <Animated.View
            style={[{ alignItems: 'center', marginBottom: 36 }, headerStyle]}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                backgroundColor: '#10B981',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                shadowColor: '#10B981',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <UserPlus size={28} color="#FFFFFF" />
            </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '800',
                color: '#FFFFFF',
                letterSpacing: -0.5,
              }}
            >
              Create Account
            </Text>
            <Text
              style={{ fontSize: 14, color: '#6B7280', marginTop: 6 }}
            >
              Join ShopFlow today
            </Text>
          </Animated.View>

          {/* Form */}
          <Animated.View style={formStyle}>
            <RegisterForm />

            {/* Login link */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 32,
                gap: 4,
              }}
            >
              <Text style={{ fontSize: 14, color: '#6B7280' }}>
                Already have an account?
              </Text>
              <Link href="/(auth)/login" asChild>
                <Pressable>
                  <Text style={{ fontSize: 14, color: '#6C63FF', fontWeight: '600' }}>
                    Sign In
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
