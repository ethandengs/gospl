import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const publicRoutes = ['/', '/login', '/register', '/reset-password'];
const authRoutes = ['/login', '/register', '/reset-password'];

export async function middleware(req: NextRequest) {
  // Create a response object that we'll modify
  const res = NextResponse.next();

  try {
    // Create the Supabase client
    const supabase = createMiddlewareClient({ req, res });

    // Refresh the session if needed - this will update the session cookie if it exists
    const { data: { session }, error } = await supabase.auth.getSession();

    const pathname = req.nextUrl.pathname;
    console.log('Middleware - Path:', pathname, 'Session:', !!session);

    // Handle session error
    if (error) {
      console.error('Middleware - Session error:', error);
      await supabase.auth.signOut();
      const redirectUrl = new URL('/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    // If user is logged in
    if (session) {
      // If trying to access auth pages, redirect to dashboard
      if (authRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
        console.log('Middleware - Redirecting authenticated user to dashboard');
        const response = NextResponse.redirect(new URL('/dashboard', req.url));
        // Copy over the session cookie
        response.cookies.set('sb-access-token', res.cookies.get('sb-access-token')?.value || '');
        response.cookies.set('sb-refresh-token', res.cookies.get('sb-refresh-token')?.value || '');
        return response;
      }
      // Allow access to protected routes
      return res;
    }

    // For non-authenticated users
    if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
      // Allow access to public routes
      return res;
    }

    // Redirect to login for protected routes
    console.log('Middleware - Redirecting to login');
    const redirectUrl = new URL('/login', req.url);
    if (!pathname.startsWith('/login')) {
      redirectUrl.searchParams.set('redirectTo', pathname);
    }
    const response = NextResponse.redirect(redirectUrl);
    // Copy over any existing session cookies
    response.cookies.set('sb-access-token', res.cookies.get('sb-access-token')?.value || '');
    response.cookies.set('sb-refresh-token', res.cookies.get('sb-refresh-token')?.value || '');
    return response;

  } catch (error) {
    console.error('Middleware - Unexpected error:', error);
    return res;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}; 