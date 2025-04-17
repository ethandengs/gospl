'use client';

import { AuthCard } from '@/components/auth/AuthCard';
import { AuthForm } from '@/components/auth/auth-form';
import { supabase } from '@lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    // Show success message and redirect to login
    router.push('/login?registered=true');
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join GOSPL to start monitoring your gait health"
    >
      <AuthForm type="register" onSubmit={handleRegister} />
    </AuthCard>
  );
} 