'use client';

import { LayoutGrid, Calendar, User, HelpCircle } from 'lucide-react';

import { PRIVATE_ROUTES } from '@/const/routes';

import { SidebarFooter } from './sidebar-footer';
import { SidebarItem } from './sidebar-item';
import { SidebarLogo } from './sidebar-logo';

export function ClientSidebar() {
  return (
    <aside className='flex w-[20%] p-2 flex-col border-r bg-white shadow-sm sticky top-0'>
      <SidebarLogo />
      <nav className='flex flex-col space-y-1 mt-2 p-4'>
        <SidebarItem
          icon={LayoutGrid}
          label='Dashboard'
          link={PRIVATE_ROUTES.DOCTOR_DASHBOARD}
        />
        <SidebarItem icon={Calendar} label='Calendar' link='/calendar' />
        <SidebarItem icon={User} label='Profile' link='/doctor/profile' />
        <SidebarItem icon={HelpCircle} label='Help' link='/help' />
      </nav>
      <SidebarFooter />
    </aside>
  );
}
