import { Role } from './enum';

export const ROUTES = {
  LOGIN: '/sign-in',
  REGISTER: '/sign-up',
  REFRESH: '/auth/refresh',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  DOCTOR_DASHBOARD: '/doctor/dashboard',
  PATIENT_DASHBOARD: '/patient/dashboard',
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
export const ADMIN_ROUTES = {
  DASHBOARD: ROUTES.ADMIN_DASHBOARD,
  USERS: '/admin/users',
  SETTINGS: '/admin/settings',
} as const;

export const DOCTOR_ROUTES = {
  DASHBOARD: ROUTES.DOCTOR_DASHBOARD,
  APPOINTMENTS: '/doctor/appointments',
  PATIENTS: '/doctor/patients',
  SCHEDULE: '/doctor/schedule',
} as const;

export const PATIENT_ROUTES = {
  DASHBOARD: ROUTES.PATIENT_DASHBOARD,
  APPOINTMENTS: '/patient/appointments',
  PRESCRIPTIONS: '/patient/prescriptions',
  MEDICAL_RECORDS: '/patient/medical-records',
} as const;

// Tất cả private routes (cho middleware)
export const PRIVATE_ROUTES_MIDDLEWARE = {
  ...ADMIN_ROUTES,
  ...DOCTOR_ROUTES,
  ...PATIENT_ROUTES,
} as const;

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

export const ROLE_ALLOWED_ROUTES = {
  [Role.Admin]: Object.values(ADMIN_ROUTES),
  [Role.Doctor]: Object.values(DOCTOR_ROUTES),
  [Role.Patient]: Object.values(PATIENT_ROUTES),
} as const;

export const isRouteAllowedForRole = (
  pathname: string,
  role: Role
): boolean => {
  const allowedRoutes = ROLE_ALLOWED_ROUTES[role];
  return allowedRoutes.some((route) => pathname.startsWith(route));
};
