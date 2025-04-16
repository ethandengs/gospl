'use client';

import { AuthCard } from '@/components/auth/AuthCard';
import { AuthForm } from '@/components/auth/auth-form';
import { loginAction } from '@/app/actions';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      console.log('Attempting login...');

      // Use the server action for login
      const result = await loginAction({ email, password });

      if (result.success) {
        console.log('Login successful, redirecting...');
        // Use replace to prevent back button from returning to login
        window.location.replace(redirectTo);
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to monitor your gait health"
    >
      <AuthForm 
        type="login" 
        onSubmit={handleLogin} 
        isLoading={isLoading} 
      />
    </AuthCard>
  );
} 