import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isGuardedRoute =
    pathname.startsWith('/workspace') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/apply/talent');

  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/register' ||
    (pathname === '/apply' && request.nextUrl.searchParams.get('mode') !== null);

  if (!user && isGuardedRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/apply';
    redirectUrl.searchParams.set('mode', 'login');
    redirectUrl.searchParams.set('message', 'Please sign in first to access your portal.');
    return NextResponse.redirect(redirectUrl);
  }

  if (user && isAuthRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/apply';
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
