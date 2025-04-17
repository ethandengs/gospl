'use client';

import { AuthCard } from '@/components/auth/AuthCard';
import { AuthForm } from '@/components/auth/auth-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const handleResetPassword = async ({ email }: { email: string; password: string }) => {
    await resetPassword(email);
    // Show success message and redirect to login
    router.push('/login?reset=requested');
  };

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
      backLink={{
        href: '/login',
        label: 'Back to login'
      }}
    >
      <AuthForm type="reset-password" onSubmit={handleResetPassword} />
    </AuthCard>
  );
} 