import { User } from '@supabase/supabase-js';

export interface AuthError {
  code: string;
  message: string;
  status: number;
}

export interface AuthActionResult {
  success: boolean;
  error?: AuthError;
  redirectTo?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
}

export type AuthVariant = 'login' | 'register' | 'reset-password';

export interface SidebarConfig {
  showLogo?: boolean;
  variant?: 'default' | 'minimal';
  collapsible?: boolean;
} 