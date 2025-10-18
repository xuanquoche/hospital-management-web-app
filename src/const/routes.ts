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
  CREATE_PATIENT: '/patient/create',
  DOCTOR_DASHBOARD: '/doctor/dashboard',
  PATIENT_DASHBOARD: '/patient/dashboard',
  DOCTOR_PROFILE: '/doctor/profile',
  PATIENT_PROFILE: '/patient/profile',
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
