'use client';

import { LogOut } from 'lucide-react';

import { SidebarItem } from './sidebar-item';

export function SidebarFooter() {
  return (
    <div className='mt-auto border-t pt-4'>
      <SidebarItem icon={LogOut} label='Logout' href='/logout' />
    </div>
  );
}
