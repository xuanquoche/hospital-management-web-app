'use client';

import React from 'react';

/**
 * Skeleton loader for dashboard cards (sidebar widgets)
 * Provides instant visual feedback while components load
 */
export const DashboardCardSkeleton = React.memo(
  function DashboardCardSkeleton() {
    return (
      <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse'>
        <div className='mb-4'>
          <div className='h-4 bg-slate-200 rounded w-24 mb-2' />
          <div className='h-3 bg-slate-100 rounded w-32' />
        </div>
        <div className='space-y-3'>
          <div className='h-3 bg-slate-100 rounded w-full' />
          <div className='h-3 bg-slate-100 rounded w-5/6' />
          <div className='h-3 bg-slate-100 rounded w-4/6' />
        </div>
        <div className='mt-4 pt-3 border-t border-slate-100'>
          <div className='h-8 bg-slate-100 rounded w-full' />
        </div>
      </div>
    );
  }
);

/**
 * Skeleton for the welcome section (above the fold)
 */
export const WelcomeSectionSkeleton = React.memo(
  function WelcomeSectionSkeleton() {
    return (
      <div className='mb-6 animate-pulse'>
        <div className='flex justify-between items-end mb-6'>
          <div>
            <div className='h-6 bg-slate-200 rounded w-48 mb-2' />
            <div className='h-4 bg-slate-100 rounded w-64' />
          </div>
          <div className='h-4 bg-slate-100 rounded w-32' />
        </div>
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='flex-1'>
            <div className='h-5 bg-slate-200 rounded w-40 mb-3' />
            <div className='h-4 bg-slate-100 rounded w-56 mb-4' />
            <div className='flex gap-3'>
              <div className='h-6 bg-teal-100 rounded-full w-20' />
              <div className='h-6 bg-blue-100 rounded-full w-20' />
              <div className='h-6 bg-purple-100 rounded-full w-20' />
            </div>
          </div>
          <div className='bg-teal-50 rounded-xl p-4 w-full md:w-auto min-w-[300px] border border-teal-100'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                <div className='h-4 bg-teal-200 rounded w-24 mb-2' />
                <div className='h-3 bg-teal-100 rounded w-32' />
              </div>
              <div className='h-6 bg-blue-200 rounded w-12' />
            </div>
            <div className='h-10 bg-teal-200 rounded w-full' />
          </div>
        </div>
      </div>
    );
  }
);

/**
 * Skeleton for schedule/stats cards
 */
export const ScheduleCardSkeleton = React.memo(function ScheduleCardSkeleton() {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full animate-pulse'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <div className='h-5 bg-slate-200 rounded w-32 mb-2' />
          <div className='h-4 bg-slate-100 rounded w-40' />
        </div>
        <div className='h-6 bg-teal-100 rounded-full w-28' />
      </div>
      <div className='space-y-4'>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className='p-4 rounded-xl bg-slate-50 border border-slate-100'
          >
            <div className='flex gap-4'>
              <div className='min-w-[60px]'>
                <div className='h-5 bg-slate-200 rounded w-12 mb-1' />
                <div className='h-3 bg-slate-100 rounded w-10' />
              </div>
              <div className='flex-1'>
                <div className='h-4 bg-slate-200 rounded w-32 mb-2' />
                <div className='h-3 bg-slate-100 rounded w-48 mb-2' />
                <div className='flex gap-2'>
                  <div className='h-5 bg-slate-100 rounded w-16' />
                  <div className='h-5 bg-slate-100 rounded w-12' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
