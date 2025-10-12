export const ROUTES = {
  LOGIN: '/sign-in',
  REGISTER: '/sign-up',
  REFRESH: '/auth/refresh',
  DASHBOARD: '/dashboard',
};

export const PUBLIC_ROUTES = {
  LOGIN: '/sign-in',
  REGISTER: '/sign-up',
};

export const PRIVATE_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  DEPARTMENT: '/department',
  CREATE_DOCTOR: '/doctor/create',
};

export const PUBLIC_ENDPOINT = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh',
];

export const LOCALIZED_ROUTES = {
  LOGIN: () => '/sign-in',
  REGISTER: () => '/sign-up',
  DASHBOARD: (locale: string = 'en') => `/${locale}/dashboard`,
};
