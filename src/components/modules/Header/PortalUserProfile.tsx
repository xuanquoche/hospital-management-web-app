import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const PortalUserProfile = () => {
  return (
    <div className='flex items-center gap-4'>
      <Button variant='ghost' size='icon' className='text-slate-500'>
        <Bell className='h-5 w-5' />
      </Button>
      <div className='flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1 pr-4'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold text-slate-900'>
            Dr. Admin
          </span>
          <span className='text-xs text-slate-500'>System Administrator</span>
        </div>
        <ChevronDown className='ml-2 h-4 w-4 text-slate-400' />
      </div>
    </div>
  );
};

export default PortalUserProfile;
