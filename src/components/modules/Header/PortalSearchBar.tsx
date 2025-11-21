import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PortalSearchBar = () => {
  return (
    <div className='relative w-full max-w-md'>
      <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400' />
      <Input
        placeholder='Search doctors, patients, appointments...'
        className='h-10 w-full rounded-full border-slate-200 bg-white pl-10 focus-visible:ring-teal-500'
      />
    </div>
  );
};

export default PortalSearchBar;
