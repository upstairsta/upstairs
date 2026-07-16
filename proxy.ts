import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getRequiredRole, getRoleRedirectPath } from '@/lib/auth';

async function getProfileRole(
  supabase: ReturnType<typeof createServerClient>,
  userId: string
): Promise<string | null> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  return profile?.role ?? null;
}

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
  const requiredRole = getRequiredRole(pathname);

  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/register' ||
    (pathname === '/apply' && request.nextUrl.searchParams.get('mode') !== null);

  if (!user && requiredRole) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/apply';
    redirectUrl.searchParams.set('mode', 'login');
    redirectUrl.searchParams.set('message', 'Please sign in first to access your portal.');
    return NextResponse.redirect(redirectUrl);
  }

  if (user && requiredRole) {
    const role = await getProfileRole(supabase, user.id);
    if (!role || role !== requiredRole) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = role ? getRoleRedirectPath(role) : '/apply';
      redirectUrl.searchParams.set('message', 'You do not have access to that area.');
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (user && isAuthRoute) {
    const role = await getProfileRole(supabase, user.id);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = role ? getRoleRedirectPath(role) : '/apply';
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
