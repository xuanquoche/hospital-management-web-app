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
  MessageCircle,
  LucideIcon,
} from 'lucide-react';

import { PRIVATE_ROUTES } from './routes';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const ADMIN_MENU: MenuItem[] = [
  { icon: Stethoscope, label: 'doctors', href: PRIVATE_ROUTES.ADMIN_DOCTOR },
  { icon: Users, label: 'patients', href: PRIVATE_ROUTES.ADMIN_PATIENT },
  {
    icon: Calendar,
    label: 'appointments',
    href: PRIVATE_ROUTES.ADMIN_APPOINTMENTS,
  },
  {
    icon: CreditCard,
    label: 'transactions',
    href: PRIVATE_ROUTES.ADMIN_TRANSACTIONS,
  },
  { icon: Pill, label: 'medicines', href: PRIVATE_ROUTES.ADMIN_MEDICINES },
  {
    icon: Server,
    label: 'departments',
    href: PRIVATE_ROUTES.ADMIN_DEPARTMENTS,
  },
  {
    icon: Activity,
    label: 'specialties',
    href: PRIVATE_ROUTES.ADMIN_SPECIALTIES,
  },
  {
    icon: MessageCircle,
    label: 'support',
    href: PRIVATE_ROUTES.ADMIN_SUPPORT,
  },
];

export const PATIENT_MENU: MenuItem[] = [
  { icon: House, label: 'dashboard', href: PRIVATE_ROUTES.PATIENT_DASHBOARD },
  {
    icon: Calendar,
    label: 'booking',
    href: PRIVATE_ROUTES.PATIENT_BOOKING,
  },
  {
    icon: UserRoundPen,
    label: 'profile',
    href: PRIVATE_ROUTES.PATIENT_PROFILE,
  },
  {
    icon: MessageCircle,
    label: 'support',
    href: PRIVATE_ROUTES.PATIENT_SUPPORT,
  },
  {
    icon: CreditCard,
    label: 'transactions',
    href: PRIVATE_ROUTES.PATIENT_TRANSACTIONS,
  },
];

export const DOCTOR_MENU: MenuItem[] = [
  { icon: House, label: 'dashboard', href: PRIVATE_ROUTES.DOCTOR_DASHBOARD },
  {
    icon: Users,
    label: 'myPatients',
    href: PRIVATE_ROUTES.DOCTOR_PATIENTS,
  },
  {
    icon: UserRoundPen,
    label: 'profile',
    href: PRIVATE_ROUTES.DOCTOR_PROFILE,
  },
];
