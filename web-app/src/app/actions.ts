'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { AuthActionResult } from '@/types/auth';

export async function loginAction(formData: { email: string; password: string }): Promise<AuthActionResult> {
  const supabase = createServerActionClient({ cookies });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log('Login error:', error);
      return { 
        success: false,
        error: {
          code: 'auth/error',
          message: error.message,
          status: 400
        }
      };
    }

    if (!data.session) {
      console.log('No session returned after login');
      return { 
        success: false,
        error: {
          code: 'auth/no-session',
          message: 'No session returned after login',
          status: 400
        }
      };
    }

    return { 
      success: true,
      redirectTo: '/dashboard'
    };
  } catch (error) {
    console.log('Unexpected error during login:', error);
    return {
      success: false,
      error: {
        code: 'auth/unexpected',
        message: 'An unexpected error occurred',
        status: 500
      }
    };
  }
}

export async function logoutAction(): Promise<AuthActionResult> {
  'use server';
  
  const supabase = createServerActionClient({ cookies });
  
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Logout error:', error);
      return {
        success: false,
        error: {
          code: 'auth/error',
          message: error.message,
          status: 400
        }
      };
    }
    
    return { 
      success: true,
      redirectTo: '/'
    };
  } catch (error) {
    console.log('Unexpected error during logout:', error);
    return {
      success: false,
      error: {
        code: 'auth/unexpected',
        message: 'An unexpected error occurred',
        status: 500
      }
    };
  }
} 