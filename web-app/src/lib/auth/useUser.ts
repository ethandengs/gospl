'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// TODO: Add interfaces for extended user profile and preferences
// interface ExtendedUser extends User {
//   profile: UserProfile;
//   preferences: UserPreferences;
// }

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (mounted) {
          // TODO: Fetch additional user data:
          // - User profile details
          // - User preferences
          // - User permissions and roles
          setUser(session?.user ?? null);
          setError(null);
          setSessionChecked(true);
        }
      } catch (error) {
        console.error('Error getting session:', error);
        if (mounted) {
          setError(error instanceof Error ? error : new Error('Failed to get user session'));
          setSessionChecked(true);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      
      try {
        // TODO: Implement real-time sync for:
        // - Profile updates
        // - Preference changes
        // - Role/permission changes
        setUser(session?.user ?? null);
        setError(null);
        setSessionChecked(true);
      } catch (error) {
        console.error('Error handling auth state change:', error);
        setError(error instanceof Error ? error : new Error('Failed to handle auth state change'));
      } finally {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // TODO: Add additional hooks/methods:
  // - useUserProfile: Fetch and manage user profile
  // - useUserPreferences: Handle user preferences
  // - useUserPermissions: Handle user roles and permissions

  return { user, isLoading, error, sessionChecked };
} 