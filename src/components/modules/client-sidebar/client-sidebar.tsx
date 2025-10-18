'use client';

import { LayoutGrid, Calendar, User, HelpCircle } from 'lucide-react';

import { PRIVATE_ROUTES } from '@/const/routes';

import { SidebarFooter } from './sidebar-footer';
import { SidebarItem } from './sidebar-item';
import { SidebarLogo } from './sidebar-logo';

export function ClientSidebar() {
  return (
    <aside className='flex h-screen w-[16%] flex-col border-r bg-white shadow-sm'>
      <SidebarLogo />
      <nav className='flex flex-col space-y-1 mt-2 p-4'>
        <SidebarItem
          icon={LayoutGrid}
          label='Dashboard'
          link={PRIVATE_ROUTES.DOCTOR_DASHBOARD}
        />
        <SidebarItem icon={Calendar} label='Calendar' link='/calendar' />
        <SidebarItem icon={User} label='Profile' link='/profile' />
        <SidebarItem icon={HelpCircle} label='Help' link='/help' />
      </nav>
      <SidebarFooter />
    </aside>
  );
}
