import { Search, Calendar, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PatientFilters = () => {
  const t = useTranslations('Doctor.MyPatients.Filters');

  return (
    <div className='bg-white rounded-t-2xl p-6 border-b border-slate-100'>
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-sm text-slate-500 mt-1'>{t('subtitle')}</p>
        <div className='mt-2'>
          <Badge
            variant='secondary'
            className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal'
          >
            {t('total', { count: 42 })}
          </Badge>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
          <Input
            placeholder={t('searchPlaceholder')}
            className='pl-9 bg-slate-50 border-slate-100 focus-visible:ring-teal-500'
          />
        </div>

        <div className='flex gap-3 overflow-x-auto pb-2 md:pb-0'>
          <Select defaultValue='today'>
            <SelectTrigger className='w-[180px] bg-slate-50 border-slate-100'>
              <SelectValue placeholder={t('statusLabel')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='today'>{t('statusOptions.today')}</SelectItem>
              <SelectItem value='week'>{t('statusOptions.week')}</SelectItem>
              <SelectItem value='month'>{t('statusOptions.month')}</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue='all'>
            <SelectTrigger className='w-[160px] bg-slate-50 border-slate-100'>
              <SelectValue placeholder={t('typeLabel')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>{t('typeOptions.all')}</SelectItem>
              <SelectItem value='direct'>{t('typeOptions.direct')}</SelectItem>
              <SelectItem value='video'>{t('typeOptions.video')}</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant='outline'
            className='text-slate-600 border-slate-200 hover:bg-slate-50 whitespace-nowrap'
          >
            <Calendar className='w-4 h-4 mr-2' />
            {t('dateRange')}
          </Button>

          <Button
            variant='outline'
            className='text-slate-600 border-slate-200 hover:bg-slate-50 whitespace-nowrap'
          >
            <SlidersHorizontal className='w-4 h-4 mr-2' />
            {t('advancedFilter')}
          </Button>
        </div>
      </div>
    </div>
  );
};
