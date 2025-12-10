'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const history = [
  {
    title: 'Khám Nội tổng quát',
    date: '12/09/2025',
    doctor: 'BS. Nguyễn Thị Lan',
    prescriptions: 3,
    status: 'Đã khám',
  },
  {
    title: 'Khám Tim mạch',
    date: '28/07/2025',
    doctor: 'BS. Lê Hoàng Phúc',
    prescriptions: 1,
    status: 'Đã khám',
  },
  {
    title: 'Khám Tai Mũi Họng',
    date: '03/05/2025',
    doctor: 'BS. Phạm Minh Châu',
    prescriptions: 0,
    status: 'Đã khám',
  },
];

export const RecentHistory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
    >
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>
          Lịch sử khám gần đây
        </h3>
        <p className='text-slate-500'>Xem lại các lần khám gần đây.</p>
      </div>

      <div className='space-y-6'>
        {history.map((item, index) => (
          <div
            key={index}
            className='relative border-l-2 border-slate-100 pl-4 last:border-0'
          >
            <div className='absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300 ring-4 ring-white' />
            <div className='flex justify-between items-start mb-1'>
              <h4 className='font-bold text-slate-800'>{item.title}</h4>
              <Badge
                variant='secondary'
                className='bg-slate-100 text-slate-600 hover:bg-slate-200'
              >
                {item.status}
              </Badge>
            </div>
            <p className='text-sm text-slate-500 mb-1'>
              {item.date} • {item.doctor}
            </p>
            <p className='text-xs text-slate-400'>
              • Đơn thuốc: {item.prescriptions}
            </p>
          </div>
        ))}
      </div>

      <div className='mt-6'>
        <Button
          variant='outline'
          className='w-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        >
          Xem toàn bộ hồ sơ
        </Button>
      </div>
    </motion.div>
  );
};
