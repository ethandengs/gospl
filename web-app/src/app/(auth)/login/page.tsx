// src/app/(auth)/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthForm } from '@/components/auth/auth-form';
import { loginAction } from '@/app/actions';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo') ?? '/dashboard';
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (isLoading) return;

    setErrorMessage(null);
    setIsLoading(true);

    try {
      console.log('Attempting login with', email);
      const result = await loginAction({ email, password });

      if (result.success) {
        console.log('Login successful—redirecting to', redirectTo);
        router.replace(redirectTo);
      } else {
        // Normalize result.error into a string
        const rawError = result.error;
        const msg =
          typeof rawError === 'string'
            ? rawError
            : rawError?.message ?? 'Login failed, please try again.';
        setErrorMessage(msg);
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to monitor your gait health">
      {errorMessage && (
        <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
      )}
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        isLoading={isLoading}
      />
    </AuthCard>
  );
}
