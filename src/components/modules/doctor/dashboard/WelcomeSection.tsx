import { Clock, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const WelcomeSection = React.memo(function WelcomeSection() {
  const t = useTranslations('Doctor.Dashboard.Welcome');

  return (
    <div className='mb-6'>
      <div className='flex justify-between items-end mb-6'>
        <div>
          <h2 className='text-xl font-bold text-slate-900'>{t('title')}</h2>
          <p className='text-sm text-slate-500 mt-1'>{t('subtitle')}</p>
        </div>
        <div className='flex items-center gap-2 text-slate-500 text-sm'>
          <Clock className='w-4 h-4' />
          <span>{t('weekSchedule')}</span>
        </div>
      </div>

      <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6'>
        <div className='flex-1'>
          <h3 className='text-lg font-bold text-slate-900 mb-2'>
            {t('todayScheduleTitle')}
          </h3>
          <p className='text-sm text-slate-500 mb-4'>{t('shiftInfo')}</p>
          <div className='flex gap-3'>
            <Badge
              variant='secondary'
              className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal py-1 px-3'
            >
              {t('bookedCases', { count: 8 })}
            </Badge>
            <Badge
              variant='secondary'
              className='bg-blue-50 text-blue-700 hover:bg-blue-100 font-normal py-1 px-3'
            >
              {t('offlineCases', { count: 3 })}
            </Badge>
            <Badge
              variant='secondary'
              className='bg-purple-50 text-purple-700 hover:bg-purple-100 font-normal py-1 px-3'
            >
              {t('onlineCases', { count: 5 })}
            </Badge>
          </div>
        </div>

        <div className='bg-teal-50 rounded-xl p-4 w-full md:w-auto min-w-[300px] flex flex-col gap-4 border border-teal-100'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-sm font-bold text-slate-900'>
                {t('currentStatus')}
              </p>
              <p className='text-xs text-slate-500 mt-1 max-w-[150px]'>
                {t('nextPatient')}
              </p>
            </div>
            <Badge className='bg-blue-500 hover:bg-blue-600 text-white border-none'>
              09:30
            </Badge>
          </div>
          <Button className='w-full bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-200'>
            <Play className='w-4 h-4 mr-2' />
            {t('startShift')}
          </Button>
        </div>
      </div>
    </div>
  );
});
