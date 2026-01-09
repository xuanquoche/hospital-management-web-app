import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';

import { PatientDetail } from './data';

interface VitalsCardProps {
  vitals: PatientDetail['vitals'];
}

export const VitalsCard = ({ vitals }: VitalsCardProps) => {
  const t = useTranslations('Doctor.MyPatients.Detail.Overview.Vitals');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal'
        >
          {t('stable')}
        </Badge>
      </div>
      <p className='text-xs text-slate-500 mb-6'>{t('subtitle')}</p>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-teal-50/50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>{t('bp')}</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.bp}</p>
          <p className='text-[10px] text-slate-500'>{t('bpDetail')}</p>
        </div>
        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>{t('hr')}</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.heartRate}</p>
          <p className='text-[10px] text-slate-500'>{t('bpm')}</p>
        </div>
        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>{t('temp')}</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.temp}°C</p>
          <p className='text-[10px] text-slate-500'>{t('tempDetail')}</p>
        </div>
        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>{t('spo2')}</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.spO2}%</p>
          <p className='text-[10px] text-slate-500'>{t('spo2Detail')}</p>
        </div>
        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>{t('resp')}</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.respRate}</p>
          <p className='text-[10px] text-slate-500'>{t('bpm')}</p>
        </div>
        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>{t('weight')}</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.weight} kg</p>
          <p className='text-[10px] text-slate-500'>
            {t('weightChange', { change: vitals.weightChange })}
          </p>
        </div>
      </div>
    </div>
  );
};
