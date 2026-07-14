// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 1. Initialize Supabase Client for Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set({ name, value, ...options })
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set({ name, value, ...options })
          );
        },
      },
    }
  );

  // 2. Retrieve current user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isGuardedRoute = request.nextUrl.pathname.startsWith('/workspace');
  const isAuthRoute = request.nextUrl.pathname === '/apply'; // Assuming this page is /apply

  // 3. 🚨 PROTECTION RULE: If no user session exists and they try to access /workspace
  if (!user && isGuardedRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/apply'; // Redirect to register/login
    redirectUrl.searchParams.set('message', 'Please register or log in first to access your portal.');
    return NextResponse.redirect(redirectUrl);
  }

  // 4. OPTIONAL RULE: If they are already logged in, don't let them go back to register
  if (user && isAuthRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/workspace';
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

// ⚙️ Matcher config tells Next.js exactly which paths this protection applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (like /backg.jpeg)
     */
    '/((?!_next/static|_next/image|favicon.ico|backg.jpeg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};