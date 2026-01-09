import { useTranslations } from 'next-intl';
import React from 'react';

export const PatientSummaryCard = () => {
  const t = useTranslations('Doctor.MyPatients.Summary');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-xs text-slate-500'>{t('subtitle')}</p>
      </div>

      <div className='space-y-3 mb-6'>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-slate-600'>{t('total')}</span>
          <span className='font-bold text-slate-900'>8</span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-slate-600'>{t('examined')}</span>
          <span className='font-bold text-slate-900'>3</span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-slate-600'>{t('waiting')}</span>
          <span className='font-bold text-slate-900'>5</span>
        </div>
      </div>

      <div className='space-y-3 border-t border-slate-100 pt-4'>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-slate-600'>{t('byType.direct')}</span>
          <span className='font-bold text-slate-900'>
            {t('byType.count', { count: 5 })}
          </span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-slate-600'>{t('byType.remote')}</span>
          <span className='font-bold text-slate-900'>
            {t('byType.count', { count: 3 })}
          </span>
        </div>
      </div>
    </div>
  );
};
