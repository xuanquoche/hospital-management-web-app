import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';

import { PatientDetail } from './data';

interface VisitSummaryCardProps {
  visit: PatientDetail['todayVisit'];
}

export const VisitSummaryCard = ({ visit }: VisitSummaryCardProps) => {
  const t = useTranslations('Doctor.MyPatients.Detail.Overview.VisitSummary');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal'
        >
          {t('saved')}
        </Badge>
      </div>
      <p className='text-xs text-slate-500 mb-6'>
        {t('subtitle', { time: visit.time, room: visit.room })}
      </p>

      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2'>
          <span className='text-sm text-slate-500'>{t('reason')}</span>
          <span className='text-sm font-medium text-slate-900'>
            {visit.reason}
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2'>
          <span className='text-sm text-slate-500'>{t('diagnosis')}</span>
          <span className='text-sm font-medium text-slate-900'>
            {visit.diagnosis}
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2'>
          <span className='text-sm text-slate-500'>{t('plan')}</span>
          <span className='text-sm font-medium text-slate-900'>
            {visit.plan}
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2'>
          <span className='text-sm text-slate-500'>{t('prescription')}</span>
          <span className='text-sm font-medium text-slate-900'>
            {visit.prescription}
          </span>
        </div>
      </div>

      <div className='mt-6 pt-4 border-t border-slate-100'>
        <p className='text-xs font-bold text-slate-500 mb-2'>
          {t('quickNotes')}
        </p>
        <ul className='space-y-1'>
          {visit.notes.map((note, index) => (
            <li
              key={index}
              className='text-xs text-slate-600 flex items-start gap-2'
            >
              <span className='w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0' />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
