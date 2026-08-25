import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: '#6C63FF' },
    text: { color: '#FFFFFF' },
  },
  secondary: {
    container: { backgroundColor: '#2A2A3E' },
    text: { color: '#E0E0E0' },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: '#6C63FF',
    },
    text: { color: '#6C63FF' },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: '#6C63FF' },
  },
  destructive: {
    container: { backgroundColor: '#FF4757' },
    text: { color: '#FFFFFF' },
  },
};

const SIZE_STYLES: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 },
    text: { fontSize: 13, fontWeight: '600' },
  },
  md: {
    container: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 14 },
    text: { fontSize: 15, fontWeight: '600' },
  },
  lg: {
    container: { paddingVertical: 18, paddingHorizontal: 32, borderRadius: 16 },
    text: { fontSize: 17, fontWeight: '700' },
  },
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
      }}
      disabled={isDisabled}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: isDisabled ? 0.5 : 1,
        },
        VARIANT_STYLES[variant].container,
        SIZE_STYLES[size].container,
        fullWidth && { width: '100%' },
        animatedStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={VARIANT_STYLES[variant].text.color as string}
        />
      ) : (
        <>
          {icon}
          <Text
            style={[VARIANT_STYLES[variant].text, SIZE_STYLES[size].text]}
          >
            {title}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
}
