import { AuthError } from '@/types/auth';
import { AuthError as SupabaseAuthError } from '@supabase/supabase-js';

export function handleAuthError(error: unknown): AuthError {
  if (error instanceof SupabaseAuthError) {
    return {
      code: error.name,
      message: error.message,
      status: 401,
    };
  }

  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      status: 500,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    status: 500,
  };
}

export function isAuthError(error: unknown): error is AuthError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'status' in error
  );
} 