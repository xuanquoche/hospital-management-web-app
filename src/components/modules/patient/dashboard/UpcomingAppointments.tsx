'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const UpcomingAppointments = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
    >
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>
            Lịch khám sắp tới
          </h3>
          <p className='text-slate-500'>Hiển thị cuộc hẹn gần nhất của bạn.</p>
        </div>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          Hôm nay
        </Badge>
      </div>

      <div className='mb-6'>
        <h4 className='mb-2 text-lg font-bold text-slate-800'>
          Khám tổng quát với BS. Trần Quốc Hùng
        </h4>
        <div className='flex gap-2 mb-4'>
          <Badge variant='outline' className='bg-slate-50 text-slate-600'>
            Nội tổng quát
          </Badge>
          <Badge variant='outline' className='bg-slate-50 text-slate-600'>
            Tại cơ sở 1 - Quận 1
          </Badge>
        </div>

        <div className='space-y-3 text-sm'>
          <div className='flex justify-between border-b border-dashed border-slate-100 pb-2'>
            <span className='text-slate-500'>Thời gian</span>
            <span className='font-semibold text-slate-900'>
              Thứ 5, 21/11/2025 • 09:30 - 10:00
            </span>
          </div>
          <div className='flex justify-between border-b border-dashed border-slate-100 pb-2'>
            <span className='text-slate-500'>Mã lịch hẹn</span>
            <span className='font-semibold text-slate-900'>APPT-23984</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-slate-500'>Trạng thái</span>
            <span className='font-semibold text-teal-600'>Đã xác nhận</span>
          </div>
        </div>
      </div>

      <div className='flex gap-4'>
        <Button className='flex-1 bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100 shadow-none'>
          Xem chi tiết
        </Button>
        <Button variant='ghost' className='flex-1 text-slate-500'>
          Xem tất cả lịch hẹn
        </Button>
      </div>
    </motion.div>
  );
};
