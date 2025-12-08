'use client';

import React from 'react';

const UsageSnapshot = () => {
  return (
    <div className='rounded-lg border bg-white p-4 shadow-sm'>
      <h3 className='font-semibold text-slate-900'>Usage Snapshot</h3>
      <p className='mb-4 text-xs text-slate-500'>
        How this khoa is used across the system
      </p>

      <div className='space-y-3'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-slate-600'>Active appointment templates</span>
          <span className='font-medium text-slate-900'>12</span>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-slate-600'>Diagnostic Agent routes / day</span>
          <span className='font-medium text-slate-900'>84</span>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-slate-600'>Avg. wait time</span>
          <span className='font-medium text-slate-900'>18 min</span>
        </div>
      </div>

      <div className='mt-4 space-y-2 border-t pt-4'>
        <div className='flex items-start gap-2'>
          <div className='mt-1.5 h-2 w-2 rounded-full bg-green-500' />
          <span className='text-xs text-slate-600'>
            Linked to at least one active schedule
          </span>
        </div>
        <div className='flex items-start gap-2'>
          <div className='mt-1.5 h-2 w-2 rounded-full bg-red-500' />
          <span className='text-xs text-slate-600'>
            Over capacity &gt; 90% in last 7 days
          </span>
        </div>
        <div className='flex items-start gap-2'>
          <div className='mt-1.5 h-2 w-2 rounded-full bg-slate-400' />
          <span className='text-xs text-slate-600'>
            Not visible in patient portal
          </span>
        </div>
      </div>
    </div>
  );
};

export default UsageSnapshot;
