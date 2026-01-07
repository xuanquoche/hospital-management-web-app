import { Role } from './enum';

export const ROUTES = {
  LOGIN: '/sign-in',
  REGISTER: '/sign-up',
  REFRESH: '/auth/refresh',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/dashboard',
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
  ADMIN_DOCTOR_CREATE: '/admin-doctor/create',
  ADMIN_DOCTOR: '/admin-doctor',
  ADMIN_PATIENT: '/admin-patient',
  ADMIN_APPOINTMENTS: '/admin-appointments',
  ADMIN_TRANSACTIONS: '/admin-transactions',
  ADMIN_MEDICINES: '/admin-medicines',
  ADMIN_MEDICINES_IMPORT: '/admin-medicines/import',
  ADMIN_MEDICINES_CREATE_CATEGORY: '/admin-medicines/create-category',
  ADMIN_MEDICINES_CREATE_MEDICINE: '/admin-medicines/create-medicine',
  ADMIN_DEPARTMENTS: '/admin-departments',
  ADMIN_SPECIALTIES: '/admin-specialties',
  ADMIN_SUPPORT: '/admin-support',
  // patient
  PATIENT_DASHBOARD: '/patient/dashboard',
  PATIENT_PROFILE: '/patient/profile',
  PATIENT_BOOKING: '/patient/booking',
  PATIENT_SUPPORT: '/patient/support',
  PATIENT_TRANSACTIONS: '/patient/transactions',
  PATIENT_APPOINTMENTS: '/patient/appointments',
  // doctor
  DOCTOR_DASHBOARD: '/doctor/dashboard',
  DOCTOR_PROFILE: '/doctor/profile',
  // DOCTOR_APPOINTMENTS: '/doctor/appointments',
  DOCTOR_PATIENTS: '/doctor/my-patient',
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
  TRANSACTIONS: '/patient/transactions',
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
  DASHBOARD_BY_ROLE: (role: Role, locale: string = 'en') => {
    switch (role) {
      case Role.ADMIN:
        return `/${locale}/dashboard`;
      case Role.DOCTOR:
        return `/${locale}/doctor/dashboard`;
      case Role.PATIENT:
        return `/${locale}/patient/dashboard`;
      default:
        return `/${locale}/dashboard`;
    }
  },
};

export const ROLE_ALLOWED_ROUTES = {
  [Role.ADMIN]: Object.values(ADMIN_ROUTES),
  [Role.DOCTOR]: Object.values(DOCTOR_ROUTES),
  [Role.PATIENT]: Object.values(PATIENT_ROUTES),
} as const;

export const isRouteAllowedForRole = (
  pathname: string,
  role: Role
): boolean => {
  const allowedRoutes = ROLE_ALLOWED_ROUTES[role];
  return allowedRoutes.some((route) => pathname.startsWith(route));
};
