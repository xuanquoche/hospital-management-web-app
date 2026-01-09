import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

import { PatientDetail } from '../data';

interface DoctorNotesCardProps {
  notes: PatientDetail['doctorNotes'];
}

export const DoctorNotesCard = ({ notes }: DoctorNotesCardProps) => {
  const t = useTranslations('Doctor.MyPatients.Detail.Sidebar.Notes');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-xs text-slate-500'>{t('subtitle')}</p>
      </div>

      <div className='space-y-4 mb-4'>
        {notes.map((note, index) => (
          <div key={index} className='border-l-2 border-slate-200 pl-3'>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-[10px] text-slate-500'>{note.date}</span>
              <span className='text-[10px] text-slate-400'>{note.author}</span>
            </div>
            <p className='text-xs text-slate-700 font-medium'>{note.content}</p>
          </div>
        ))}
      </div>

      <Button
        variant='ghost'
        className='w-full text-slate-500 hover:text-teal-600 hover:bg-slate-50 h-8 text-xs'
      >
        <Plus className='w-3 h-3 mr-2' />
        {t('addNote')}
      </Button>
    </div>
  );
};
