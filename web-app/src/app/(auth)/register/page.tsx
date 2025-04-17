'use client';

import { AuthCard } from '@/components/auth/AuthCard';
import { AuthForm } from '@/components/auth/auth-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const handleRegister = async ({ email, password }: { email: string; password: string }) => {
    await signUp(email, password);
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