'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useUser } from '@/lib/auth/useUser';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm">
        {/* Navigation content */}
      </nav>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-100">
        {/* Footer content */}
      </footer>
    </div>
  );
} 