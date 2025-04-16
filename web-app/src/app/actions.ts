'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AuthActionResult } from '@/types/auth';
import { handleAuthError } from '@/lib/utils/error-handler';

export async function loginAction(formData: { email: string; password: string }): Promise<AuthActionResult> {
  const supabase = createServerActionClient({ cookies });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) throw error;

    if (!data.session) {
      throw new Error('No session returned after login');
    }

    return { 
      success: true,
      redirectTo: '/dashboard'
    };
  } catch (error) {
    const authError = handleAuthError(error);
    return {
      success: false,
      error: authError
    };
  }
}

export async function logoutAction(): Promise<AuthActionResult> {
  'use server';
  
  const supabase = createServerActionClient({ cookies });
  
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    return { 
      success: true,
      redirectTo: '/login'
    };
  } catch (error) {
    const authError = handleAuthError(error);
    return {
      success: false,
      error: authError
    };
  }
} 