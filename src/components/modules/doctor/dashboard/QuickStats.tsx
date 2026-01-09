import { useTranslations } from 'next-intl';
import React from 'react';

export const QuickStats = () => {
  const t = useTranslations('Doctor.Dashboard.QuickStats');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-xs text-slate-500'>{t('subtitle')}</p>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-teal-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>{t('totalCases')}</p>
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-bold text-teal-700'>8</span>
            <span className='text-xs font-medium text-teal-600 bg-teal-100 px-1.5 py-0.5 rounded'>
              100%
            </span>
          </div>
          <p className='text-[10px] text-slate-400 mt-1'>
            {t('includeRemote')}
          </p>
        </div>

        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>{t('examined')}</p>
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-bold text-slate-700'>3</span>
            <span className='text-xs font-medium text-slate-500'>38%</span>
          </div>
          <p className='text-[10px] text-slate-400 mt-1'>
            {t('avgTime', { min: 25 })}
          </p>
        </div>

        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>{t('waiting')}</p>
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-bold text-slate-700'>5</span>
            <span className='text-xs font-medium text-slate-500'>
              {t('priority1')}
            </span>
          </div>
          <p className='text-[10px] text-slate-400 mt-1'>
            {t('highPriorityCount', { count: 1 })}
          </p>
        </div>

        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>{t('cancelled')}</p>
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-bold text-slate-400'>0</span>
            <span className='text-xs font-medium text-slate-500'>
              {t('stable')}
            </span>
          </div>
          <p className='text-[10px] text-slate-400 mt-1'>{t('noCancelled')}</p>
        </div>
      </div>
    </div>
  );
};
