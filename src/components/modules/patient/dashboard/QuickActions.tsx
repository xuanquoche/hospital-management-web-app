'use client';

import { motion } from 'framer-motion';
import { Calendar, Stethoscope, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

export const QuickActions = () => {
  const t = useTranslations('Patient.Dashboard.QuickActions');

  const actions = useMemo(
    () => [
      {
        icon: Calendar,
        title: t('bookingTitle'),
        description: t('bookingDesc'),
        color: 'bg-teal-50 text-teal-600',
        borderColor: 'border-teal-100',
      },
      {
        icon: Stethoscope,
        title: t('searchTitle'),
        description: t('searchDesc'),
        color: 'bg-emerald-50 text-emerald-600',
        borderColor: 'border-emerald-100',
      },
      {
        icon: FileText,
        title: t('healthRecordTitle'),
        description: t('healthRecordDesc'),
        color: 'bg-cyan-50 text-cyan-600',
        borderColor: 'border-cyan-100',
      },
    ],
    [t]
  );

  return (
    <div className='space-y-4'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-slate-500'>{t('subtitle')}</p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 shadow-sm transition-colors hover:shadow-md ${action.color} ${action.borderColor}`}
          >
            <div>
              <h4 className='font-bold'>{action.title}</h4>
              <p className='text-sm opacity-80'>{action.description}</p>
            </div>
            <action.icon className='h-6 w-6' />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
