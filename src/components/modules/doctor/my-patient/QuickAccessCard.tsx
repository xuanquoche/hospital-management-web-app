import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';

import { mockQuickAccess } from './data';

export const QuickAccessCard = () => {
  const t = useTranslations('Doctor.MyPatients.QuickAccess');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-xs text-slate-500'>{t('subtitle')}</p>
      </div>

      <div className='space-y-4'>
        {mockQuickAccess.map((patient) => (
          <div
            key={patient.id}
            className='flex items-start gap-2 text-xs group cursor-pointer'
          >
            <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0 group-hover:bg-teal-500 transition-colors' />
            <div>
              <p className='text-slate-900 mb-0.5'>
                <Badge
                  variant='secondary'
                  className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal px-1 py-0 h-5 mr-1 text-[10px]'
                >
                  {patient.id}
                </Badge>
                <span className='font-medium group-hover:text-teal-700 transition-colors'>
                  {patient.name}
                </span>
              </p>
              <p className='text-slate-500'>· {patient.reason}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-4 pt-4 border-t border-slate-100 text-right'>
        <span className='text-xs text-slate-500 cursor-pointer hover:text-teal-600'>
          {t('favorites')}
        </span>
      </div>
    </div>
  );
};
