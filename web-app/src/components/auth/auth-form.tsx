'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

interface AuthFormProps {
  type: 'login' | 'register' | 'reset-password';
  isLoading?: boolean;
  onSubmit?: (data: { email: string; password: string }) => Promise<void>;
}

export function AuthForm({ type, isLoading: externalLoading, onSubmit }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithOAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);

  const isFormLoading = externalLoading || loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }
      
      if (onSubmit) {
        await onSubmit({ email, password });
      }
      
      // Handle successful auth
      router.push(searchParams.get('redirectTo') || '/dashboard');
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during authentication');
      // Keep the form in a loading state for a moment to ensure the error is visible
      setTimeout(() => setLoading(false), 500);
      return;
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setSocialLoading(provider);
    try {
      await signInWithOAuth(provider, {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(searchParams.get('redirectTo') || '/dashboard')}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred with social login');
      setSocialLoading(null);
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 border-gray-200 bg-white focus:ring-2 focus:ring-[#1F9FC0] focus:border-transparent"
          />
        </div>

        {type !== 'reset-password' && (
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {type === 'login' && (
                <button
                  type="button"
                  onClick={() => handleNavigation('/reset-password')}
                  className="text-sm font-medium text-[#1F9FC0] hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 border-gray-200 bg-white focus:ring-2 focus:ring-[#1F9FC0] focus:border-transparent"
            />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[#1F9FC0] to-[#4BB9A6] hover:from-[#1B8FAD] hover:to-[#43A695] transition-all duration-200"
          disabled={isFormLoading}
        >
          {isFormLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {type === 'login' && 'Sign in'}
          {type === 'register' && 'Sign up'}
          {type === 'reset-password' && 'Send reset link'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={() => handleSocialLogin('google')} 
          className="w-full border-gray-200 bg-white hover:bg-gray-50"
          disabled={!!socialLoading}
          type="button"
        >
          {socialLoading === 'google' ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleSocialLogin('github')} 
          className="w-full border-gray-200 bg-white hover:bg-gray-50"
          disabled={!!socialLoading}
          type="button"
        >
          {socialLoading === 'github' ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}
          GitHub
        </Button>
      </div>

      <p className="text-center text-sm text-gray-500">
        {type === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => handleNavigation('/register')}
              className="font-medium text-[#1F9FC0] hover:underline"
            >
              Sign up
            </button>
          </>
        ) : type === 'register' ? (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => handleNavigation('/login')}
              className="font-medium text-[#1F9FC0] hover:underline"
            >
              Sign in
            </button>
          </>
        ) : null}
      </p>
    </div>
  );
} 