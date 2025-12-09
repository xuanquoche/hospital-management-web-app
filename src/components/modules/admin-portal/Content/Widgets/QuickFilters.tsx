import React from 'react';

import { Badge } from '@/components/ui/badge';

const QuickFilters = () => {
  return (
    <div className='rounded-lg border border-slate-100 bg-white p-4 shadow-sm'>
      <h3 className='mb-1 text-sm font-bold text-slate-900'>Quick Filters</h3>
      <p className='mb-3 text-xs text-slate-500'>Common doctor views</p>
      <div className='flex flex-wrap gap-2'>
        <Badge className='bg-teal-600 hover:bg-teal-700'>All doctors</Badge>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          Available today
        </Badge>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          Newly added
        </Badge>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          On leave
        </Badge>
      </div>
    </div>
  );
};

export default QuickFilters;
