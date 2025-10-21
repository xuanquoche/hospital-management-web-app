'use client';

import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { logout } from '@/utils/logout';

export function SidebarFooter() {
  const handleLogout = () => {
    logout();
  };
  return (
    <div className='mt-auto w-full border-t pt-4'>
      <Button
        size={'icon-lg'}
        className='cursor-pointer w-full flex justify-center'
        onClick={handleLogout}
      >
        <LogOut className='h-8 w-8' />
      </Button>
    </div>
  );
}
