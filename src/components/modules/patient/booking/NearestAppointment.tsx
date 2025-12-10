'use client';

import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const NearestAppointment = () => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>Cuộc hẹn gần nhất</h3>
        <p className='text-sm text-slate-500'>Bạn có 1 cuộc hẹn đã xác nhận.</p>
      </div>

      <div className='mb-4 rounded-xl bg-slate-50 p-4'>
        <h4 className='mb-2 font-bold text-slate-800'>
          Khám tổng quát với BS. Trần Quốc Hùng
        </h4>
        <div className='mb-3 flex gap-2'>
          <Badge variant='secondary' className='bg-white text-slate-600'>
            Nội tổng quát
          </Badge>
          <Badge variant='secondary' className='bg-white text-slate-600'>
            Cơ sở 1 - Quận 1
          </Badge>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-slate-500'>Thời gian</span>
          <span className='font-bold text-slate-900'>
            Thứ 5, 21/11/2025 • 09:30
          </span>
        </div>
      </div>

      <Button
        variant='outline'
        className='w-full border-slate-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800'
      >
        Xem chi tiết lịch hẹn
      </Button>
    </div>
  );
};
