import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  type LoginFormData,
} from '@/src/features/auth/schemas/authSchemas';
import { useLogin } from '@/src/hooks/useAuth';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { Mail, Lock } from 'lucide-react-native';

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { mutateAsync: doLogin, isPending, error: apiError } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await doLogin(data);
      onSuccess?.();
    } catch (e) {
      // Error is already handled by TanStack Query
    }
  };

  return (
    <View style={{ gap: 4 }}>
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
            placeholder="Enter your password"
            icon={<Lock size={18} color="#4A4A5A" />}
            isPassword
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message || (apiError ? 'Invalid credentials' : undefined)}
          />
        )}
      />

      <View style={{ marginTop: 8 }}>
        <Button
          title="Sign In"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );
}
