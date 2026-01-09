import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

import { PatientDetail } from '../data';

interface DocumentsCardProps {
  documents: PatientDetail['documents'];
}

export const DocumentsCard = ({ documents }: DocumentsCardProps) => {
  const t = useTranslations('Doctor.MyPatients.Detail.Sidebar.Documents');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-xs text-slate-500'>{t('subtitle')}</p>
      </div>

      <ul className='space-y-3 mb-4'>
        {documents.map((doc, index) => (
          <li
            key={index}
            className='flex items-start gap-2 text-xs text-slate-600'
          >
            <span className='w-1.5 h-1.5 rounded bg-slate-400 mt-1.5 flex-shrink-0' />
            <span>
              <span className='font-bold text-slate-700'>{doc.name}</span>
              {doc.date !== 'Chưa thực hiện' && ` - ${doc.date}`} - {doc.type}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant='outline'
        className='w-full text-teal-600 border-teal-200 bg-teal-50 hover:bg-teal-100 h-9 text-xs'
      >
        <Upload className='w-3 h-3 mr-2' />
        {t('addDoc')}
      </Button>
    </div>
  );
};
