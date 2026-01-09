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

  // 3. Check Routes
  const publicRoutes = Object.values(PUBLIC_ROUTES);
  const isPublicRoute = publicRoutes.some(
    (route) =>
      normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );

  // Define Auth Routes explicitly (Login/Register) where we want to redirect authenticated users AWAY from
  const authRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];
  const isAuthRoute = authRoutes.some((route) => normalizedPath === route);

  // 4. Auth Logic

  // CASE A: Authenticated user trying to access AUTH routes (login/register)
  // Redirect them to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL(LOCALIZED_ROUTES.DASHBOARD_BY_ROLE(role, locale), request.url)
    );
  }

  // CASE B: Unauthenticated user trying to access private routes
  // Note: '/' need special handling below, so we exclude it here if it's considered private default
  // But wait, if '/' is NOT in PUBLIC_ROUTES, it IS private.
  // We want '/' to be redirected to landing for unauthenticated.

  if (!isPublicRoute && !isAuthenticated && normalizedPath !== '/') {
    // Redirect to login page with current locale
    const loginUrl = `/${locale}${ROUTES.LOGIN}`;
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  // CASE C: Root path '/' handling
  if (normalizedPath === '/') {
    // If authenticated, redirect to dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL(LOCALIZED_ROUTES.DASHBOARD_BY_ROLE(role, locale), request.url)
      );
    } else {
      // If NOT authenticated, redirect to Landing Page
      // We use 307 for temporary redirect or just normal redirect
      return NextResponse.redirect(
        new URL(`/${locale}${PUBLIC_ROUTES.LANDING}`, request.url)
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
