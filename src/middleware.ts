import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { getLocalizedRoute } from '@/utils/Helpers';

import { ROUTES, LOCALIZED_ROUTES } from './const/routes';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Handle internationalization first
  const intlResponse = intlMiddleware(request);

  // Get token/session from NextAuth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const pathname = request.nextUrl.pathname;

  // Check if user is trying to access login page while already authenticated
  const loginPattern = /^\/(en|ja)\/sign-in\/?$/;
  if (loginPattern.test(pathname) && isAuthenticated) {
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(
      new URL(LOCALIZED_ROUTES.DASHBOARD(locale), request.url)
    );
  }

  if (pathname === '/') {
    const locale =
      request.headers
        .get('accept-language')
        ?.split(',')?.[0]
        ?.split('-')?.[0] === 'ja'
        ? 'ja'
        : 'en';

    if (isAuthenticated) {
      // If already authenticated, redirect to dashboard
      return NextResponse.redirect(
        new URL(LOCALIZED_ROUTES.DASHBOARD(locale), request.url)
      );
    } else {
      // If not authenticated, redirect to login
      return NextResponse.redirect(
        new URL(getLocalizedRoute(ROUTES.LOGIN, locale), request.url)
      );
    }
  }

  // Check if it's a locale root path (e.g., /en or /ja)
  const localePattern = /^\/(en|ja)\/?$/;
  if (localePattern.test(pathname)) {
    const locale = pathname.split('/')[1];
    if (isAuthenticated) {
      // If already authenticated, redirect to dashboard
      return NextResponse.redirect(
        new URL(LOCALIZED_ROUTES.DASHBOARD(locale), request.url)
      );
    } else {
      // If not authenticated, redirect to login
      return NextResponse.redirect(
        new URL(getLocalizedRoute(ROUTES.LOGIN, locale), request.url)
      );
    }
  }

  return intlResponse || NextResponse.next();
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ja|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
