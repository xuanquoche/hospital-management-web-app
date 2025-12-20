import {
  Stethoscope,
  Users,
  Calendar,
  CreditCard,
  Pill,
  Server,
  Activity,
  House,
  UserRoundPen,
  LucideIcon,
} from 'lucide-react';

import { PRIVATE_ROUTES } from './routes';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const ADMIN_MENU: MenuItem[] = [
  { icon: Stethoscope, label: 'Doctors', href: PRIVATE_ROUTES.ADMIN_DOCTOR },
  { icon: Users, label: 'Patients', href: PRIVATE_ROUTES.ADMIN_PATIENT },
  {
    icon: Calendar,
    label: 'Appointments',
    href: PRIVATE_ROUTES.ADMIN_APPOINTMENTS,
  },
  {
    icon: CreditCard,
    label: 'Transactions',
    href: PRIVATE_ROUTES.ADMIN_TRANSACTIONS,
  },
  { icon: Pill, label: 'Medicines', href: PRIVATE_ROUTES.ADMIN_MEDICINES },
  {
    icon: Server,
    label: 'Departments',
    href: PRIVATE_ROUTES.ADMIN_DEPARTMENTS,
  },
  {
    icon: Activity,
    label: 'Specialties',
    href: PRIVATE_ROUTES.ADMIN_SPECIALTIES,
  },
];

export const PATIENT_MENU: MenuItem[] = [
  { icon: House, label: 'Dashboard', href: PRIVATE_ROUTES.PATIENT_DASHBOARD },
  {
    icon: UserRoundPen,
    label: 'Profile',
    href: PRIVATE_ROUTES.PATIENT_PROFILE,
  },
];
