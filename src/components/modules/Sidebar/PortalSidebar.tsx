'use client';

import React from 'react';
import { Stethoscope, Users, Calendar, CreditCard, Pill } from 'lucide-react';
import PortalSidebarItem from './PortalSidebarItem';
import PortalSidebarStats from './PortalSidebarStats';
import { useRouter } from 'next/navigation';
import { PRIVATE_ROUTES } from '@/const/routes';

const PortalSidebar = () => {
  const router = useRouter();

  function navigateLink(link: string) {
    router.push(link);
  }

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
          <PortalSidebarItem icon={Stethoscope} label='Doctors' isActive onClick={() => navigateLink(PRIVATE_ROUTES.ADMIN_DOCTOR)}/>
          <PortalSidebarItem icon={Users} label='Patients' />
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
