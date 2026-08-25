import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterFormData,
} from '@/src/features/auth/schemas/authSchemas';
import { useRegister } from '@/src/hooks/useAuth';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { Mail, Lock, User } from 'lucide-react-native';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { mutateAsync: doRegister, isPending } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await doRegister({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      onSuccess?.();
    } catch (e) {
      // Error handled by TanStack Query
    }
  };

  return (
    <View style={{ gap: 4 }}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Full Name"
            placeholder="John Doe"
            icon={<User size={18} color="#4A4A5A" />}
            autoCapitalize="words"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            placeholder="you@example.com"
            icon={<Mail size={18} color="#4A4A5A" />}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Password"
            placeholder="Min 8 characters, 1 uppercase, 1 number"
            icon={<Lock size={18} color="#4A4A5A" />}
            isPassword
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Confirm Password"
            placeholder="Repeat your password"
            icon={<Lock size={18} color="#4A4A5A" />}
            isPassword
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.confirmPassword?.message}
          />
        )}
      />

      <View style={{ marginTop: 8 }}>
        <Button
          title="Create Account"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );
}
