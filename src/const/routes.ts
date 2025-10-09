export const ROUTES = {
  LOGIN: '/sign-in',
  REGISTER: '/sign-up',
  REFRESH: '/auth/refresh',
  DASHBOARD: '/dashboard',
};

export const PUBLIC_ENDPOINT = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh',
];

export const LOCALIZED_ROUTES = {
  LOGIN: (locale: string = 'en') => `/${locale}/sign-in`,
  REGISTER: (locale: string = 'en') => `/${locale}/sign-up`,
  DASHBOARD: (locale: string = 'en') => `/${locale}/dashboard`,
};
