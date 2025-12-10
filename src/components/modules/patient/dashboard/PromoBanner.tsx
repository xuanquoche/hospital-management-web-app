'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const PromoBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-50 to-white p-6 shadow-sm border border-teal-100'
    >
      <div className='relative z-10 max-w-2xl'>
        <h3 className='mb-2 text-2xl font-bold text-slate-900'>
          Ưu đãi gói khám tổng quát tháng này
        </h3>
        <p className='mb-4 text-slate-600'>
          Giảm đến 20% cho gói khám sức khỏe tổng quát, tầm soát tim mạch và
          tiểu đường. Áp dụng đến 30/11.
        </p>

        <div className='mb-6 flex gap-2'>
          <Badge
            variant='secondary'
            className='bg-teal-100 text-teal-700 hover:bg-teal-200'
          >
            Tin tức y tế
          </Badge>
          <Badge
            variant='secondary'
            className='bg-teal-100 text-teal-700 hover:bg-teal-200'
          >
            Khuyến mãi gói khám
          </Badge>
          <Badge
            variant='secondary'
            className='bg-teal-100 text-teal-700 hover:bg-teal-200'
          >
            Tầm soát định kỳ
          </Badge>
        </div>

        <div className='flex items-center gap-4'>
          <Button className='bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-200'>
            Đăng ký gói khám
          </Button>
          <Button
            variant='ghost'
            className='text-slate-600 hover:text-teal-600'
          >
            Xem thêm tin tức
          </Button>
        </div>
      </div>

      {/* Decorative background element */}
      <div className='absolute -right-10 -top-10 h-64 w-64 rounded-full bg-teal-50/50 blur-3xl' />
    </motion.div>
  );
};
