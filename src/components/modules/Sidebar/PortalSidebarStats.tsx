import React from 'react';

const PortalSidebarStats = () => {
  return (
    <div className='mt-auto px-4 pb-8'>
      <div className='mb-4'>
        <h3 className='text-sm font-medium text-slate-500'>Today</h3>
      </div>
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-slate-600'>Appointments</span>
          <span className='text-sm font-bold text-slate-900'>32</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-slate-600'>Revenue</span>
          <span className='text-sm font-bold text-teal-600'>$4,560</span>
        </div>
      </div>
    </div>
  );
};

export default PortalSidebarStats;
