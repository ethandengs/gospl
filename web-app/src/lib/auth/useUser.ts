'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// TODO: Add interfaces for extended user profile and preferences
// interface ExtendedUser extends User {
//   profile: UserProfile;
//   preferences: UserPreferences;
// }

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.log('Error getting session:', sessionError);
          return;
        }
        
        if (mounted) {
          // TODO: Fetch additional user data:
          // - User profile details
          // - User preferences
          // - User permissions and roles
          setUser(session?.user ?? null);
          setSessionChecked(true);
        }
      } catch (error) {
        console.log('Unexpected error getting session:', error);
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
        setIsLoading(false);
      } catch (error) {
        console.error('Error handling auth state change:', error);
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

  return {
    user,
    isLoading,
    sessionChecked
  };
} 