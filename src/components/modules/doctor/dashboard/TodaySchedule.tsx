import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Appointment } from './data';

interface TodayScheduleProps {
  appointments: Appointment[];
}

export const TodaySchedule = ({ appointments }: TodayScheduleProps) => {
  const t = useTranslations('Doctor.Dashboard.TodaySchedule');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>{t('title')}</h3>
          <p className='text-sm text-slate-500'>{t('subtitle')}</p>
        </div>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          Thứ 3 · 05/08/2025
        </Badge>
      </div>

      <div className='space-y-4'>
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className={cn(
              'p-4 rounded-xl border transition-all',
              apt.status === 'in-progress'
                ? 'bg-teal-50 border-teal-200 ring-1 ring-teal-200'
                : 'bg-slate-50 border-slate-100 hover:border-teal-100'
            )}
          >
            <div className='flex justify-between items-start'>
              <div className='flex gap-4'>
                <div className='min-w-[60px]'>
                  <p
                    className={cn(
                      'font-bold text-lg',
                      apt.status === 'in-progress'
                        ? 'text-teal-700'
                        : 'text-slate-900'
                    )}
                  >
                    {apt.time}
                  </p>
                  <p className='text-xs text-slate-500'>{apt.duration}</p>
                </div>

                <div>
                  <h4 className='font-bold text-slate-900'>
                    {apt.patientName}
                  </h4>
                  <p className='text-sm text-slate-500 mb-2'>
                    {apt.type === 'offline'
                      ? t('type.offline')
                      : t('type.online')}{' '}
                    · {apt.room} · {t('patientId', { id: apt.patientId })}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {apt.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant='outline'
                        className='bg-white text-slate-600 border-slate-200 font-normal text-[10px] h-5'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-end gap-2'>
                {apt.status === 'completed' && (
                  <Badge className='bg-slate-200 text-slate-600 hover:bg-slate-300 border-none'>
                    {t('status.completed')}
                  </Badge>
                )}
                {apt.status === 'in-progress' && (
                  <Badge className='bg-teal-100 text-teal-700 hover:bg-teal-200 border-none animate-pulse'>
                    {t('status.inProgress')}
                  </Badge>
                )}
                {apt.status === 'waiting' && (
                  <Badge className='bg-orange-100 text-orange-700 hover:bg-orange-200 border-none'>
                    {t('status.waiting')}
                  </Badge>
                )}

                {apt.status === 'in-progress' && (
                  <Button
                    size='sm'
                    variant='outline'
                    className='h-7 text-xs bg-white border-teal-200 text-teal-700 hover:bg-teal-50'
                  >
                    {t('followUpHypertension')}
                  </Button>
                )}
                {apt.status === 'waiting' && apt.type === 'online' && (
                  <Button
                    size='sm'
                    variant='outline'
                    className='h-7 text-xs bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  >
                    {t('consultBloodTest')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-6 pt-4 border-t border-slate-100 flex justify-between items-center'>
        <span className='text-sm text-slate-500'>
          {t('viewAll', { count: appointments.length || 8 })}
        </span>
        <Button className='bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-200'>
          <Play className='w-4 h-4 mr-2' />
          {t('startNext')}
        </Button>
      </div>
    </div>
  );
};
