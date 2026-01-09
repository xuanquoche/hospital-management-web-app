import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';

import { PatientDetail } from './data';

interface VisitTimelineCardProps {
  timeline: PatientDetail['timeline'];
}

export const VisitTimelineCard = ({ timeline }: VisitTimelineCardProps) => {
  const t = useTranslations('Doctor.MyPatients.Detail.Overview.Timeline');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal'
        >
          {t('recent')}
        </Badge>
      </div>
      <p className='text-xs text-slate-500 mb-6'>{t('subtitle')}</p>

      <div className='space-y-6 relative pl-2'>
        <div className='absolute left-[5px] top-2 bottom-2 w-[1px] bg-slate-200' />

        {timeline.map((item, index) => (
          <div key={index} className='relative pl-6'>
            <span
              className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ${index === 0 ? 'bg-teal-500' : 'bg-slate-400'}`}
            />

            <div className='mb-1'>
              <p className='text-sm font-bold text-slate-900'>
                {item.date} {item.time && `- ${item.time}`} - {item.title}
              </p>
            </div>
            <p className='text-xs text-slate-500 mb-1'>
              {item.type} · {item.doctor} {item.status && `· ${item.status}`}
            </p>
            {item.desc && (
              <p className='text-xs text-slate-600 mt-1'>{item.desc}</p>
            )}
          </div>
        ))}
      </div>

      <div className='mt-6 text-right'>
        <span className='text-xs text-slate-500 cursor-pointer hover:text-teal-600'>
          {t('viewAll')}
        </span>
      </div>
    </div>
  );
};
