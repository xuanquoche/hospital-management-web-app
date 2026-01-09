'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const PromoBanner = () => {
  const t = useTranslations('Patient.Dashboard.Promo');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-50 to-white p-6 shadow-sm border border-teal-100'
    >
      <div className='relative z-10 max-w-2xl'>
        <h3 className='mb-2 text-2xl font-bold text-slate-900'>{t('title')}</h3>
        <p className='mb-4 text-slate-600'>{t('subtitle')}</p>{' '}
        <div className='mb-6 flex gap-2'>
          <Badge
            variant='secondary'
            className='bg-teal-100 text-teal-700 hover:bg-teal-200'
          >
            {t('news')}
          </Badge>
          <Badge
            variant='secondary'
            className='bg-teal-100 text-teal-700 hover:bg-teal-200'
          >
            {t('promo')}
          </Badge>
          <Badge
            variant='secondary'
            className='bg-teal-100 text-teal-700 hover:bg-teal-200'
          >
            {t('screening')}
          </Badge>
        </div>
        <div className='flex items-center gap-4'>
          <Button className='bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-200'>
            {t('register')}
          </Button>
          <Button
            variant='ghost'
            className='text-slate-600 hover:text-teal-600'
          >
            {t('viewMore')}
          </Button>
        </div>
      </div>

      {/* Decorative background element */}
      <div className='absolute -right-10 -top-10 h-64 w-64 rounded-full bg-teal-50/50 blur-3xl' />
    </motion.div>
  );
};
