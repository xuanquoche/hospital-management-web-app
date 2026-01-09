import { Stethoscope } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

export const PreExamNotesCard = () => {
  const t = useTranslations('Doctor.MyPatients.PreExamNotes');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-xs text-slate-500'>{t('subtitle')}</p>
      </div>

      <ul className='space-y-3 mb-6'>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1.5 h-1.5 rounded bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>{t('note1')}</span>
        </li>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1.5 h-1.5 rounded bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>{t('note2')}</span>
        </li>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1.5 h-1.5 rounded bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>{t('note3')}</span>
        </li>
      </ul>

      <Button className='w-full bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100 shadow-none'>
        <Stethoscope className='w-4 h-4 mr-2' />
        {t('goToExam')}
      </Button>
    </div>
  );
};
