import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = (action: () => void) => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    }, 50);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    action();
  };

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#1A1A2E',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#2A2A3E',
        },
        animatedStyle,
      ]}
    >
      <Pressable
        onPress={() => handlePress(onDecrement)}
        disabled={quantity <= min}
        style={{
          padding: 10,
          opacity: quantity <= min ? 0.3 : 1,
        }}
        hitSlop={8}
      >
        <Minus size={16} color="#9CA3AF" />
      </Pressable>

      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: '#E0E0E0',
          minWidth: 32,
          textAlign: 'center',
        }}
      >
        {quantity}
      </Text>

      <Pressable
        onPress={() => handlePress(onIncrement)}
        disabled={quantity >= max}
        style={{
          padding: 10,
          opacity: quantity >= max ? 0.3 : 1,
        }}
        hitSlop={8}
      >
        <Plus size={16} color="#6C63FF" />
      </Pressable>
    </Animated.View>
  );
}
