import React from 'react';

const ScheduleSnapshot = () => {
  return (
    <div className='rounded-lg border border-slate-100 bg-white p-4 shadow-sm'>
      <h3 className='mb-1 text-sm font-bold text-slate-900'>Schedule Snapshot</h3>
      <p className='mb-3 text-xs text-slate-500'>Today - 12 Aug 2025</p>

      <div className='mb-4 space-y-2'>
        <div className='flex items-center gap-2'>
          <div className='h-2 w-2 rounded-full bg-green-500'></div>
          <span className='text-xs text-slate-600'>Available slots</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-2 w-2 rounded-full bg-red-500'></div>
          <span className='text-xs text-slate-600'>Booked appointments</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-2 w-2 rounded-full bg-slate-400'></div>
          <span className='text-xs text-slate-600'>Off-hours</span>
        </div>
      </div>

      <div className='rounded-md bg-teal-50/50 p-3'>
        <div className='mb-2 flex justify-between'>
          <span className='text-xs font-medium text-slate-600'>Slots available</span>
          <span className='text-xs font-bold text-slate-900'>46</span>
        </div>
        <div className='mb-2 flex justify-between'>
          <span className='text-xs font-medium text-slate-600'>Booked</span>
          <span className='text-xs font-bold text-slate-900'>38</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-xs font-medium text-slate-600'>Cancellation rate</span>
          <span className='text-xs font-bold text-slate-900'>4.2%</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSnapshot;
