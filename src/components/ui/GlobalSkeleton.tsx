import React from 'react';

import { cn } from '@/lib/utils';

interface GlobalSkeletonProps {
  className?: string;
}

const GlobalSkeleton: React.FC<GlobalSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('w-full animate-pulse p-4 space-y-6', className)}>
      {/* Header-like block */}
      <div className='flex items-center justify-between'>
        <div className='h-8 w-1/3 rounded-md bg-slate-200'></div>
        <div className='h-8 w-24 rounded-md bg-slate-200'></div>
      </div>

      {/* Content blocks */}
      <div className='space-y-4'>
        <div className='h-4 w-full rounded bg-slate-200'></div>
        <div className='h-4 w-5/6 rounded bg-slate-200'></div>
        <div className='h-4 w-4/6 rounded bg-slate-200'></div>
      </div>

      {/* Box layout simulation (like a card or table row) */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <div className='h-32 rounded-lg bg-slate-100 p-4'></div>
        <div className='h-32 rounded-lg bg-slate-100 p-4'></div>
        <div className='h-32 rounded-lg bg-slate-100 p-4'></div>
      </div>
    </div>
  );
};

export default GlobalSkeleton;
