'use client';

import React from 'react';
import { Stethoscope, Users, Calendar, CreditCard, Pill } from 'lucide-react';
import PortalSidebarItem from './PortalSidebarItem';
import PortalSidebarStats from './PortalSidebarStats';
import { useRouter, usePathname } from 'next/navigation';
import { PRIVATE_ROUTES } from '@/const/routes';
import { log } from 'console';

const PortalSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

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
          <PortalSidebarItem icon={Calendar} label='Appointments' />
          <PortalSidebarItem icon={CreditCard} label='Transactions' />
          <PortalSidebarItem icon={Pill} label='Medicines' />
        </div>
      </div>

      <PortalSidebarStats />
    </div>
  );
};

export default PortalSidebar;
