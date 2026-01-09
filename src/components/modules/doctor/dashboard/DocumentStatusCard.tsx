import { useTranslations } from 'next-intl';
import React from 'react';

export const DocumentStatusCard = React.memo(function DocumentStatusCard() {
  const t = useTranslations('Doctor.Dashboard.DocumentStatus');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-xs text-slate-500'>{t('subtitle')}</p>
      </div>

      <div className='space-y-2 mb-4'>
        <div className='flex justify-between items-center text-xs'>
          <span className='text-slate-600'>{t('missingDocs')}</span>
          <span className='font-bold text-slate-900'>3</span>
        </div>
        <div className='flex justify-between items-center text-xs'>
          <span className='text-slate-600'>{t('uploadedToday')}</span>
          <span className='font-bold text-slate-900'>5</span>
        </div>
      </div>

      <div className='space-y-2 mb-4 border-t border-slate-100 pt-3'>
        <div className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-1 flex-shrink-0' />
          <span className='truncate'>{t('doc1')}</span>
        </div>
        <div className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-1 flex-shrink-0' />
          <span className='truncate'>{t('doc2')}</span>
        </div>
        <div className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-1 flex-shrink-0' />
          <span className='truncate'>{t('doc3')}</span>
        </div>
      </div>

      <div className='text-right'>
        <span className='text-xs text-slate-500 cursor-pointer hover:text-teal-600'>
          {t('gotoDocs')}
        </span>
      </div>
    </div>
  );
});
