import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';
// No static optimization for this route
export const runtime = 'edge';

export async function POST(request: Request) {
  const session = await request.json();

  if (!session) {
    return new NextResponse('No session provided', { status: 400 });
  }

  try {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.setSession(session);

    return NextResponse.json({ message: 'Session set successfully' });
  } catch (error) {
    console.error('Error setting session:', error);
    return new NextResponse('Error setting session', { status: 500 });
  }
} 