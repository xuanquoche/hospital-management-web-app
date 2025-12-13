'use client';

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
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

import { Role } from '@/const/enum';
import { PRIVATE_ROUTES } from '@/const/routes';

import PortalSidebarItem from './PortalSidebarItem';
import PortalSidebarStats from './PortalSidebarStats';

const PortalSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  console.log(session);

  function navigateLink(link: string) {
    router.push(link);
  }

  const isActive = (path: string) => pathname.startsWith(`/en${path}`);

  return (
    <div className='sticky top-0 flex h-screen w-[20%] flex-col border-r bg-[#F0FDF9]'>
      <div className='p-6'>
        <h1 className='text-xl font-bold text-teal-800'>MediFlow Admin</h1>
      </div>

      <div className='px-4 py-2'>
        <h2 className='mb-2 px-2 text-xs font-semibold tracking-wider text-slate-400 uppercase'>
          Management
        </h2>
        {session?.user?.role === Role.ADMIN ? (
          <div className='space-y-1'>
            <PortalSidebarItem
              icon={Stethoscope}
              label='Doctors'
              isActive={isActive(PRIVATE_ROUTES.ADMIN_DOCTOR)}
              onClick={() => navigateLink(PRIVATE_ROUTES.ADMIN_DOCTOR)}
            />
            <PortalSidebarItem
              icon={Users}
              label='Patients'
              isActive={isActive(PRIVATE_ROUTES.ADMIN_PATIENT)}
              onClick={() => navigateLink(PRIVATE_ROUTES.ADMIN_PATIENT)}
            />
            <PortalSidebarItem
              icon={Calendar}
              label='Appointments'
              isActive={isActive(PRIVATE_ROUTES.ADMIN_APPOINTMENTS)}
              onClick={() => navigateLink(PRIVATE_ROUTES.ADMIN_APPOINTMENTS)}
            />
            <PortalSidebarItem
              icon={CreditCard}
              label='Transactions'
              isActive={isActive(PRIVATE_ROUTES.ADMIN_TRANSACTIONS)}
              onClick={() => navigateLink(PRIVATE_ROUTES.ADMIN_TRANSACTIONS)}
            />
            <PortalSidebarItem
              icon={Pill}
              label='Medicines'
              isActive={isActive(PRIVATE_ROUTES.ADMIN_MEDICINES)}
              onClick={() => navigateLink(PRIVATE_ROUTES.ADMIN_MEDICINES)}
            />
            <PortalSidebarItem
              icon={Server}
              label='Departments'
              isActive={isActive(PRIVATE_ROUTES.ADMIN_DEPARTMENTS)}
              onClick={() => navigateLink(PRIVATE_ROUTES.ADMIN_DEPARTMENTS)}
            />
            <PortalSidebarItem
              icon={Activity}
              label='Specialties'
              isActive={isActive(PRIVATE_ROUTES.ADMIN_SPECIALTIES)}
              onClick={() => navigateLink(PRIVATE_ROUTES.ADMIN_SPECIALTIES)}
            />
          </div>
        ) : (
          session?.user?.role === Role.PATIENT && (
            <div className='space-y-1'>
              <PortalSidebarItem
                icon={House}
                label='Dashboard'
                isActive={isActive(PRIVATE_ROUTES.PATIENT_DASHBOARD)}
                onClick={() => navigateLink(PRIVATE_ROUTES.PATIENT_DASHBOARD)}
              />
              <PortalSidebarItem
                icon={UserRoundPen}
                label='Profile'
                isActive={isActive(PRIVATE_ROUTES.PATIENT_PROFILE)}
                onClick={() => navigateLink(PRIVATE_ROUTES.PATIENT_PROFILE)}
              />
            </div>
          )
        )}
      </div>

      <PortalSidebarStats />
    </div>
  );
};

export default PortalSidebar;
