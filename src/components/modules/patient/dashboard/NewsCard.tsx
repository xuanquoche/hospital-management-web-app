'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const NewsCard = () => {
  const t = useTranslations('Patient.Dashboard.News');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className='flex h-full flex-col justify-between rounded-2xl bg-sky-50 p-6 shadow-sm border border-sky-100'
    >
      <div>
        <div className='mb-4 flex items-center justify-between'>
          <h4 className='font-bold text-slate-900'>{t('title')}</h4>
          <Badge className='bg-blue-500 hover:bg-blue-600'>{t('new')}</Badge>
        </div>

        <h5 className='mb-2 font-semibold text-slate-800'>
          {t('news1.title')}
        </h5>
        <p className='text-sm text-slate-600'>{t('news1.subtitle')}</p>
      </div>

      <div className='mt-4 flex justify-end'>
        <Button
          variant='ghost'
          size='sm'
          className='gap-1 text-sky-600 hover:text-sky-700 hover:bg-sky-100'
        >
          {t('viewMore')} <ArrowRight className='h-4 w-4' />
        </Button>
      </div>
    </motion.div>
  );
};
