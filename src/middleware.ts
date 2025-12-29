import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { Role } from './const/enum';
import { ROUTES, PUBLIC_ROUTES, LOCALIZED_ROUTES } from './const/routes';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Get token
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const isAuthenticated = !!token;
  const role = (token?.user as any)?.role as Role;

  // 2. Determine locale and normalized path
  const segments = pathname.split('/');
  const hasLocale = ['en', 'ja', 'vi'].includes(segments[1]);
  const locale = hasLocale ? segments[1] : 'en';

  // Remove locale from path to check against routes
  // e.g. /en/dashboard -> /dashboard, /en -> /
  const pathWithoutLocale = hasLocale
    ? `/${segments.slice(2).join('/')}`
    : pathname;

  // Ensure pathWithoutLocale starts with / and handles empty case
  const normalizedPath = pathWithoutLocale === '' ? '/' : pathWithoutLocale;

  // 3. Check Public Route
  const publicRoutes = Object.values(PUBLIC_ROUTES);
  const isPublicRoute = publicRoutes.some(
    (route) =>
      normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );

  // 4. Auth Logic

  // CASE A: Authenticated user trying to access public routes (login/register)
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL(LOCALIZED_ROUTES.DASHBOARD_BY_ROLE(role, locale), request.url)
    );
  }

  // CASE B: Unauthenticated user trying to access private routes
  // Note: '/' is considered private if not in PUBLIC_ROUTES
  if (!isPublicRoute && !isAuthenticated) {
    // Redirect to login page with current locale
    const loginUrl = `/${locale}${ROUTES.LOGIN}`;
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  // CASE C: Root path '/' handling
  // If we are here, it means:
  // 1. It's a public route (and user is not authenticated
  // OR user is authenticated but logic above didn't catch it? No, CASE A catches auth+public)
  // 2. OR it's a private route and user IS authenticated (CASE B catches not auth)

  // So if it's '/', and it's private (which it is), and we are here, user MUST be authenticated.
  if (normalizedPath === '/') {
    // If authenticated, redirect to dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL(LOCALIZED_ROUTES.DASHBOARD_BY_ROLE(role, locale), request.url)
      );
    }
  }

  // 5. Let next-intl handle localization
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
