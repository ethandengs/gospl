import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { session } = await request.json();

    if (!session) {
      return new NextResponse('No session provided', { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Set the session
    await supabase.auth.setSession(session);

    return NextResponse.json({ message: 'Session set successfully' });
  } catch (error) {
    console.error('Error setting session:', error);
    return new NextResponse('Error setting session', { status: 500 });
  }
} 