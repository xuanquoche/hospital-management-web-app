import React from 'react';

import PortalLayout from '@/components/modules/admin-portal/PortalLayout';

export default function Loading() {
  return (
    <PortalLayout>
      <div className='flex flex-col gap-6 animate-pulse'>
        {/* Header Skeleton */}
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <div className='h-8 w-48 rounded bg-slate-200'></div>
            <div className='h-4 w-32 rounded bg-slate-200'></div>
          </div>
          <div className='flex gap-3'>
            <div className='h-10 w-24 rounded bg-slate-200'></div>
            <div className='h-10 w-32 rounded bg-slate-200'></div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className='flex gap-4'>
          <div className='h-10 w-64 rounded bg-slate-200'></div>
          <div className='h-10 w-32 rounded bg-slate-200'></div>
        </div>

        {/* Table/List Skeleton */}
        <div className='space-y-4 rounded-lg border border-slate-100 bg-white p-4'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='flex gap-4 border-b border-slate-50 pb-4 last:border-0 last:pb-0'
            >
              <div className='h-12 w-12 rounded-full bg-slate-200'></div>
              <div className='flex-1 space-y-2 py-1'>
                <div className='h-4 w-1/4 rounded bg-slate-200'></div>
                <div className='h-4 w-1/2 rounded bg-slate-200'></div>
              </div>
              <div className='h-8 w-20 rounded bg-slate-200'></div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
