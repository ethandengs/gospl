import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// TODO: Implement additional auth utilities:
// - getUser: Fetch detailed user profile with preferences
// - getUserRole: Fetch user's role and permissions
// - getAuthStatus: Check if user's email is verified

export async function getSession() {
  const supabase = createServerComponentClient({ cookies });
  // TODO: Add error handling and session validation
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// TODO: Implement functions for:
// - refreshSession: Handle session refresh logic
// - validateSession: Additional session validation checks
// - getSessionMetadata: Fetch additional session metadata