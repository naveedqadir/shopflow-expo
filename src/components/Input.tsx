import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  type TextInputProps,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export default function Input({
  label,
  error,
  icon,
  isPassword = false,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const shakeX = useSharedValue(0);

  const animatedShake = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  // Shake when error appears
  React.useEffect(() => {
    if (error) {
      shakeX.value = withSequence(
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-6, { duration: 50 }),
        withTiming(6, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [error]);

  return (
    <Animated.View style={[{ marginBottom: 16 }, animatedShake]}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: error ? '#FF4757' : isFocused ? '#6C63FF' : '#9CA3AF',
          marginBottom: 8,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#1A1A2E',
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: error
            ? '#FF4757'
            : isFocused
              ? '#6C63FF'
              : '#2A2A3E',
          paddingHorizontal: 16,
          minHeight: 52,
        }}
      >
        {icon && (
          <View style={{ marginRight: 12 }}>{icon}</View>
        )}
        <TextInput
          {...props}
          secureTextEntry={isPassword && !showPassword}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholderTextColor="#4A4A5A"
          style={{
            flex: 1,
            fontSize: 15,
            color: '#E0E0E0',
            paddingVertical: 14,
          }}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={12}
          >
            {showPassword ? (
              <EyeOff size={20} color="#6C63FF" />
            ) : (
              <Eye size={20} color="#4A4A5A" />
            )}
          </Pressable>
        )}
      </View>
      {error && (
        <Text
          style={{
            fontSize: 12,
            color: '#FF4757',
            marginTop: 6,
            marginLeft: 4,
          }}
        >
          {error}
        </Text>
      )}
    </Animated.View>
  );
}
