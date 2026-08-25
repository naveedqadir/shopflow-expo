import { useMutation } from '@tanstack/react-query';
import { login, register } from '@/src/api/auth';
import { useAuthStore } from '@/src/stores/authStore';

/**
 * Login mutation — calls the mock auth API, then sets Zustand auth state.
 *
 * Usage:
 *   const { mutateAsync: doLogin, isPending } = useLogin();
 *   await doLogin({ email, password });
 */
export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
}

/**
 * Register mutation.
 *
 * Usage:
 *   const { mutateAsync: doRegister, isPending } = useRegister();
 *   await doRegister({ name, email, password });
 */
export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => register(name, email, password),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
}
