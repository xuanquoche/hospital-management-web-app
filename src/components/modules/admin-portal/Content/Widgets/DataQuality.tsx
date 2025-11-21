import React from 'react';
import { Button } from '@/components/ui/button';

const DataQuality = () => {
  return (
    <div className='rounded-lg border border-slate-100 bg-white p-4 shadow-sm'>
      <h3 className='mb-1 text-sm font-bold text-slate-900'>Data Quality</h3>
      <p className='mb-4 text-xs text-slate-500'>Profile completion overview</p>

      <div className='mb-4 space-y-3'>
        <div className='flex justify-between'>
          <span className='text-xs text-slate-600'>Completed profiles</span>
          <span className='text-xs font-bold text-slate-900'>86%</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-xs text-slate-600'>Missing documents</span>
          <span className='text-xs font-bold text-slate-900'>9</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-xs text-slate-600'>Pending approvals</span>
          <span className='text-xs font-bold text-slate-900'>3</span>
        </div>
      </div>

      <Button
        variant='outline'
        className='w-full border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-100 hover:text-teal-800'
      >
        Review incomplete
      </Button>
    </div>
  );
};

export default DataQuality;
