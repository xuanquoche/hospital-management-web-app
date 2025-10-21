import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { Role } from './const/enum';
import {
  ROUTES,
  PUBLIC_ROUTES,
  PRIVATE_ROUTES,
  LOCALIZED_ROUTES,
} from './const/routes';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Chuyển đổi object thành mảng các giá trị
const publicRouteValues = Object.values(PUBLIC_ROUTES);
const privateRouteValues = Object.values(PRIVATE_ROUTES);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Lấy token từ NextAuth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = !!token;
  // const userRole = token?.role as Role;
  // console.log('role token middleware:', token);
  // Kiểm tra public route
  const isPublicRoute = publicRouteValues.some((route) =>
    pathname.startsWith(route)
  );

  // Kiểm tra private route (cả có và không có locale)
  const isPrivateRoute = privateRouteValues.some(
    (route) =>
      pathname.startsWith(route) ||
      pathname.startsWith('/en' + route) ||
      pathname.startsWith('/ja' + route)
  );

  // --- Xử lý public route ---
  if (isPublicRoute) {
    if (isAuthenticated) {
      // Nếu đã đăng nhập và truy cập public route → redirect về dashboard
      const locale =
        request.nextUrl.searchParams.get('locale') || pathname.startsWith('/ja')
          ? 'ja'
          : 'en';
      return NextResponse.redirect(
        new URL(LOCALIZED_ROUTES.DASHBOARD(locale), request.url)
      );
    }

    // Nếu là public route và chưa đăng nhập → cho phép truy cập bình thường
    return NextResponse.next();
  }

  // --- Xử lý private route khi chưa đăng nhập ---
  if (isPrivateRoute && !isAuthenticated) {
    // Nếu truy cập private route mà chưa đăng nhập → redirect về login
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  // --- Xử lý root '/' ---
  if (pathname === '/') {
    const locale =
      request.headers
        .get('accept-language')
        ?.split(',')?.[0]
        ?.split('-')?.[0] === 'ja'
        ? 'ja'
        : 'en';

    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL(LOCALIZED_ROUTES.DASHBOARD(locale), request.url)
      );
    } else {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
  }

  // --- Xử lý locale root path: /en hoặc /ja ---
  const localePattern = /^\/(en|ja)\/?$/;
  if (localePattern.test(pathname)) {
    const locale = pathname.split('/')[1];
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL(LOCALIZED_ROUTES.DASHBOARD(locale), request.url)
      );
    } else {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
  }

  // --- Xử lý i18n cho các route không public ---
  const intlResponse = !isPublicRoute ? intlMiddleware(request) : null;
  return intlResponse || NextResponse.next();
}

export const config = {
  matcher: [
    '/', // Root
    '/(ja|en)/:path*', // Locale prefix
    '/((?!_next|_vercel|.*\\..*).*)', // Các route khác, bỏ qua tĩnh
  ],
};
