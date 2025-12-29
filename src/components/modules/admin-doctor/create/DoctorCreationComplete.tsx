import { CheckCircle2, Calendar, Clock, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const DoctorCreationComplete = () => {
  const router = useRouter();
  const t = useTranslations('Admin.DoctorCreate.Complete');

  return (
    <div className='flex-1 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>{t('title')}</h1>
          <p className='text-slate-500'>{t('description')}</p>
        </div>
        <Button variant='outline' onClick={() => router.push('/portal')}>
          {t('backToList')}
        </Button>
      </div>

      {/* Success Message */}
      <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
        <div className='flex items-start gap-3'>
          <CheckCircle2 className='h-5 w-5 text-green-600 mt-0.5' />
          <div>
            <h3 className='font-semibold text-green-900'>{t('successTitle')}</h3>
            <p className='text-sm text-green-700'>{t('successMessage')}</p>
          </div>
          <div className='ml-auto'>
            <Badge className='bg-green-600 hover:bg-green-700'>{t('active')}</Badge>
          </div>
        </div>
      </div>

      {/* Doctor Overview */}
      <div className='rounded-lg border border-slate-200 bg-white p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-slate-900'>{t('overviewTitle')}</h2>
          <span className='text-xs text-slate-400'>{t('readOnly')}</span>
        </div>

        <div className='grid grid-cols-3 gap-6 mb-6'>
          <div>
            <p className='text-sm text-slate-500 mb-1'>{t('name')}</p>
            <p className='font-medium text-slate-900'>Dr. Sarah Thompson</p>
          </div>
          <div>
            <p className='text-sm text-slate-500 mb-1'>{t('specialty')}</p>
            <p className='font-medium text-slate-900'>Cardiology</p>
          </div>
          <div>
            <p className='text-sm text-slate-500 mb-1'>{t('experience')}</p>
            <p className='font-medium text-slate-900'>12 years</p>
          </div>
        </div>

        <div className='border-t border-slate-100 pt-4 mb-4'>
          <div className='grid grid-cols-3 gap-6'>
            <div>
              <p className='text-sm text-slate-500 mb-1'>{t('primaryLicense')}</p>
              <p className='font-medium text-slate-900'>HN-12345 - Medical Practice License</p>
            </div>
            <div>
              <p className='text-sm text-slate-500 mb-1'>{t('issuingAuthority')}</p>
              <p className='font-medium text-slate-900'>Vietnam Ministry of Health</p>
            </div>
            <div>
              <p className='text-sm text-slate-500 mb-1'>{t('licenseStatus')}</p>
              <p className='font-medium text-slate-900'>
                <span className='text-green-600'>{t('verified')}</span> - {t('noExpiry')}
              </p>
            </div>
          </div>
        </div>

        <div className='flex gap-2'>
          <Badge variant='secondary' className='bg-blue-50 text-blue-700 hover:bg-blue-100'>
            {t('badges.boardCertified')}
          </Badge>
          <Badge variant='secondary' className='bg-purple-50 text-purple-700 hover:bg-purple-100'>
            {t('badges.cardioCPD')}
          </Badge>
          <Badge variant='secondary' className='bg-teal-50 text-teal-700 hover:bg-teal-100'>
            {t('badges.telehealth')}
          </Badge>
        </div>
      </div>

      {/* Next Steps */}
      <div className='rounded-lg border border-slate-200 bg-white p-6'>
        <h2 className='text-lg font-semibold text-slate-900 mb-2'>{t('nextStepTitle')}</h2>
        <p className='text-sm text-slate-500 mb-4'>{t('nextStepDescription')}</p>

        <div className='flex gap-3'>
          <Button className='bg-teal-600 hover:bg-teal-700'>
            <Clock className='mr-2 h-4 w-4' />
            {t('addTimeSlots')}
          </Button>
          <Button variant='outline'>
            <Calendar className='mr-2 h-4 w-4' />
            {t('openCalendar')}
          </Button>
          <Button variant='outline'>
            <Settings className='mr-2 h-4 w-4' />
            {t('adjustRules')}
          </Button>
        </div>
      </div>
    </div>
  );
};
