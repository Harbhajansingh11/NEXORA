import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'nexora_session';
const DEFAULT_SECRET = 'nexora-secret-key-change-in-production-min-32-chars';
const JWT_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || DEFAULT_SECRET);

// Protected application routes requiring authenticated session
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/assistant',
  '/calendar',
  '/tasks',
  '/reminders',
  '/email',
  '/automations',
  '/analytics',
  '/settings',
];

// Auth-only pages where already-authenticated users should be redirected to dashboard
const AUTH_PAGES = ['/login', '/register', '/forgot-password', '/reset-password'];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;
  let isAuthenticated = false;

  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie, JWT_SECRET, {
        algorithms: ['HS256'],
      });
      if (payload && payload.id) {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // 1. Guard protected workspace routes
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isProtected) {
    if (!isAuthenticated) {
      const callbackPath = pathname + search;
      // Sanitize return URL
      const cleanCallback = encodeURIComponent(callbackPath);
      const loginUrl = new URL(`/login?callbackUrl=${cleanCallback}`, request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Redirect already-authenticated users trying to access login/register
  const isAuthPage = AUTH_PAGES.some((authPath) => pathname === authPath);
  if (isAuthPage && isAuthenticated) {
    // Check if there is a safe callbackUrl in query params
    const rawCallback = request.nextUrl.searchParams.get('callbackUrl');
    let targetUrl = '/dashboard';
    if (
      rawCallback &&
      rawCallback.startsWith('/') &&
      !rawCallback.startsWith('//') &&
      !rawCallback.startsWith('/\\') &&
      !rawCallback.includes(':')
    ) {
      targetUrl = rawCallback;
    }
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes (handled directly by route handlers)
     * - public asset folders
     */
    '/((?!_next/static|_next/image|favicon.ico|fonts|api).*)',
  ],
};
