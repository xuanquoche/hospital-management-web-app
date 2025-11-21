import React from 'react';
import { Badge } from '@/components/ui/badge';
import PortalSearchBar from './PortalSearchBar';
import PortalUserProfile from './PortalUserProfile';

const PortalHeader = () => {
  return (
    <header className='flex h-20 items-center justify-between border-b border-slate-100 bg-white px-8'>
      <div className='flex items-center gap-4'>
        <h2 className='text-xl font-bold text-slate-900'>
          Clinic Control Center
        </h2>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          Admin Portal
        </Badge>
      </div>

      <div className='flex flex-1 items-center justify-center px-8'>
        <PortalSearchBar />
      </div>

      <PortalUserProfile />
    </header>
  );
};

export default PortalHeader;
