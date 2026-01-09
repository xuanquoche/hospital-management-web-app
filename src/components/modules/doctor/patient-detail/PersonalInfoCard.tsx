import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';

import { PatientDetail } from './data';

interface PersonalInfoCardProps {
  info: PatientDetail['personalInfo'];
  patient: PatientDetail;
}

export const PersonalInfoCard = ({ info, patient }: PersonalInfoCardProps) => {
  const t = useTranslations('Doctor.MyPatients.Detail.Overview.PersonalInfo');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal'
        >
          {t('priority')}
        </Badge>
      </div>
      <p className='text-xs text-slate-500 mb-4'>{t('subtitle')}</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-3 text-sm'>
        <div className='flex justify-between md:justify-start md:gap-12'>
          <span className='text-slate-500 w-24'>{t('gender')}</span>
          <span className='font-medium text-slate-900'>{patient.gender}</span>
        </div>
        <div className='flex justify-between md:justify-start md:gap-12'>
          <span className='text-slate-500 w-24'>{t('dob')}</span>
          <span className='font-medium text-slate-900'>{patient.dob}</span>
        </div>
        <div className='flex justify-between md:justify-start md:gap-12'>
          <span className='text-slate-500 w-24'>{t('height')}</span>
          <span className='font-medium text-slate-900'>{info.height}</span>
        </div>
        <div className='flex justify-between md:justify-start md:gap-12'>
          <span className='text-slate-500 w-24'>{t('weight')}</span>
          <span className='font-medium text-slate-900'>
            {info.weight} (BMI ~{info.bmi})
          </span>
        </div>
        <div className='flex justify-between md:justify-start md:gap-12'>
          <span className='text-slate-500 w-24'>{t('job')}</span>
          <span className='font-medium text-slate-900'>{info.job}</span>
        </div>
        <div className='flex justify-between md:justify-start md:gap-12'>
          <span className='text-slate-500 w-24'>{t('lifestyle')}</span>
          <span className='font-medium text-slate-900'>{info.lifestyle}</span>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
        {info.familyHistory.map((item, index) => (
          <Badge
            key={index}
            variant='secondary'
            className='bg-slate-100 text-slate-600 font-normal border border-slate-200'
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
};
