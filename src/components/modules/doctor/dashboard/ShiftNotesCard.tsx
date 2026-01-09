import { Edit3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

export const ShiftNotesCard = React.memo(function ShiftNotesCard() {
  const t = useTranslations('Doctor.Dashboard.ShiftNotes');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-xs text-slate-500'>{t('subtitle')}</p>
      </div>

      <ul className='space-y-2 mb-4'>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>{t('note1')}</span>
        </li>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>{t('note2')}</span>
        </li>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>{t('note3')}</span>
        </li>
      </ul>

      <Button
        variant='outline'
        className='w-full text-teal-600 border-teal-100 hover:bg-teal-50 hover:text-teal-700 bg-teal-50/30 h-8 text-xs'
      >
        <Edit3 className='w-3 h-3 mr-2' />
        {t('openForm')}
      </Button>
    </div>
  );
});
