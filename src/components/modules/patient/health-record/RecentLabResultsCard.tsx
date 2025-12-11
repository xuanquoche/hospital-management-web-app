import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const RecentLabResultsCard = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>
          Kết quả xét nghiệm gần đây
        </h3>
        <p className='text-sm text-slate-500'>
          Tổng hợp từ các lần khám trong 6 tháng.
        </p>
      </div>

      <div className='space-y-4 mb-4'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-sm font-medium text-slate-700'>
              Công thức máu (05/07/2025)
            </p>
          </div>
          <span className='text-xs font-bold text-teal-600'>
            Trong giới hạn
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-sm font-medium text-slate-700'>
              Đường huyết đói (05/07/2025)
            </p>
          </div>
          <span className='text-xs font-bold text-slate-900'>4.9 mmol/L</span>
        </div>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-sm font-medium text-slate-700'>
              Mỡ máu (18/04/2025)
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-xs font-bold text-slate-900'>
              Trên giới hạn
            </span>
            <Badge
              variant='secondary'
              className='bg-orange-100 text-orange-700 hover:bg-orange-200 text-[10px] h-5 px-1.5'
            >
              Theo dõi
            </Badge>
          </div>
        </div>
      </div>

      <Button
        variant='outline'
        className='w-full text-teal-600 border-teal-100 hover:bg-teal-50 hover:text-teal-700'
      >
        Xem chi tiết tất cả xét nghiệm
      </Button>
    </div>
  );
};
