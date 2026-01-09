import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';

import { PatientDetail } from '../data';

interface MedicationAllergyCardProps {
  allergies: PatientDetail['allergies'];
  medications: PatientDetail['medications'];
}

export const MedicationAllergyCard = ({
  allergies,
  medications,
}: MedicationAllergyCardProps) => {
  const t = useTranslations('Doctor.MyPatients.Detail.Sidebar.Allergies');

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-xs text-slate-500'>{t('subtitle')}</p>
      </div>

      <div className='mb-4'>
        <p className='text-xs font-bold text-slate-700 mb-2'>
          {t('drugAllergies')}
        </p>
        {allergies.map((allergy, index) => (
          <div
            key={index}
            className='bg-red-50 border border-red-100 rounded-lg p-3'
          >
            <div className='flex justify-between items-start mb-1'>
              <span className='text-xs font-bold text-red-700'>
                {allergy.name}
              </span>
              <Badge
                variant='outline'
                className='text-[10px] bg-white text-red-600 border-red-200 h-5'
              >
                {t('high')}
              </Badge>
            </div>
            <p className='text-[10px] text-red-600/80'>{allergy.reaction}</p>
          </div>
        ))}
        {allergies.length === 0 && (
          <p className='text-xs text-slate-500'>{t('noAllergies')}</p>
        )}
      </div>

      <div className='space-y-3'>
        <div className='flex justify-between items-start text-xs'>
          <span className='text-slate-500 w-24'>{t('otherAllergies')}</span>
          <span className='font-medium text-slate-900 flex-1 text-right'>
            {t('notRecorded')}
          </span>
        </div>
        <div className='flex justify-between items-start text-xs'>
          <span className='text-slate-500 w-24'>{t('currentMeds')}</span>
          <div className='flex-1 text-right'>
            {medications.map((med, index) => (
              <div key={index} className='font-medium text-slate-900 mb-1'>
                {med.name} {med.dosage && `- ${med.dosage}`}
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-between items-start text-xs'>
          <span className='text-slate-500 w-24'>{t('avoidInteractions')}</span>
          <span className='font-medium text-slate-900 flex-1 text-right'>
            {t('avoidDetails')}
          </span>
        </div>
      </div>

      <div className='mt-4'>
        <Badge
          variant='destructive'
          className='w-full justify-center font-normal bg-red-500 hover:bg-red-600'
        >
          {t('reminderAvoid')}
        </Badge>
      </div>
    </div>
  );
};
