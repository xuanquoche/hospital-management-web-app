'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Badge } from '@/components/ui/badge';

export const HealthMetrics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
    >
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>Chỉ số sức khỏe</h3>
          <p className='text-slate-500'>Tổng quan hồ sơ cá nhân của bạn.</p>
        </div>
        <span className='text-xs font-medium text-slate-400'>Cập nhật</span>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>Chiều cao</span>
          <span className='font-bold text-slate-900'>165 cm</span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>Cân nặng</span>
          <span className='font-bold text-slate-900'>58 kg</span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>BMI ước tính</span>
          <span className='font-bold text-slate-900'>21.3</span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>Nhóm máu</span>
          <span className='font-bold text-slate-900'>O+</span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>Dị ứng</span>
          <Badge
            variant='secondary'
            className='bg-slate-100 text-slate-500 hover:bg-slate-200'
          >
            Không ghi nhận
          </Badge>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-slate-500'>Số BHYT</span>
          <span className='font-mono font-medium text-slate-700'>
            DN-79-23-456789
          </span>
        </div>
      </div>
    </motion.div>
  );
};
