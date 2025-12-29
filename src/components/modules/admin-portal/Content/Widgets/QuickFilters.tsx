import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';

const QuickFilters = () => {
  const t = useTranslations('Admin.DoctorList');
  return (
    <div className='rounded-lg border border-slate-100 bg-white p-4 shadow-sm'>
      <h3 className='mb-1 text-sm font-bold text-slate-900'>
        {t('quickFilters')}
      </h3>
      <p className='mb-3 text-xs text-slate-500'>{t('commonDoctorViews')}</p>
      <div className='flex flex-wrap gap-2'>
        <Badge className='bg-teal-600 hover:bg-teal-700'>
          {t('allDoctors')}
        </Badge>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          {t('availableToday')}
        </Badge>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          {t('newlyAdded')}
        </Badge>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          {t('onLeave')}
        </Badge>
      </div>
    </div>
  );
};

export default QuickFilters;
