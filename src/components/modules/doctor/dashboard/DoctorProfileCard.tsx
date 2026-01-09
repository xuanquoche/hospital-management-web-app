import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

export const DoctorProfileCard = () => {
  const t = useTranslations('Doctor.Dashboard.ProfileCard');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-xs text-slate-500'>{t('subtitle')}</p>
      </div>

      <div className='space-y-3 mb-4'>
        <div className='flex justify-between items-start text-xs'>
          <span className='text-slate-600'>{t('bio')}</span>
          <span className='font-bold text-slate-900 text-right'>
            {t('updated', { days: 3 })}
          </span>
        </div>
        <div className='flex justify-between items-start text-xs'>
          <span className='text-slate-600'>{t('certs')}</span>
          <span className='font-bold text-slate-900 text-right'>
            {t('managedByAdmin')}
          </span>
        </div>
      </div>

      <div className='bg-slate-50 rounded-lg p-3 mb-4'>
        <div className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1 h-3 bg-teal-500 rounded-full mt-0.5 flex-shrink-0' />
          <span>{t('adminNote')}</span>
        </div>
      </div>

      <div className='text-right'>
        <span className='text-xs text-slate-500 cursor-pointer hover:text-teal-600'>
          {t('editProfile')}
        </span>
      </div>
    </div>
  );
};
