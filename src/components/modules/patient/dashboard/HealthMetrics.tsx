'use client';

import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PatientProfile } from '@/types/patient-dashboard';

interface HealthMetricsProps {
  profile: PatientProfile | null;
}

const calculateBMI = (
  height: number | null | undefined,
  weight: number | null | undefined
): string => {
  if (!height || !weight) return '-';
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi.toFixed(1);
};

export const HealthMetrics = ({ profile }: HealthMetricsProps) => {
  const t = useTranslations('Patient.Dashboard.HealthMetrics');
  const bmi = calculateBMI(profile?.height, profile?.weight);

  const formatBloodType = (bloodType: string | null): string => {
    if (!bloodType) return t('notUpdated');
    return bloodType;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
    >
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>{t('title')}</h3>
          <p className='text-slate-500'>{t('subtitle')}</p>
        </div>
        <Link href='/patient/profile'>
          <Button
            variant='ghost'
            size='sm'
            className='gap-1 text-xs text-slate-400 hover:text-slate-600'
          >
            <Pencil className='h-3 w-3' />
            {t('update')}
          </Button>
        </Link>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>{t('height')}</span>
          <span className='font-bold text-slate-900'>
            {profile?.height ? `${profile.height} ${t('cm')}` : t('notUpdated')}
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>{t('weight')}</span>
          <span className='font-bold text-slate-900'>
            {profile?.weight ? `${profile.weight} ${t('kg')}` : t('notUpdated')}
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>{t('bmi')}</span>
          <span className='font-bold text-slate-900'>{bmi}</span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>{t('bloodType')}</span>
          <span className='font-bold text-slate-900'>
            {formatBloodType(profile?.bloodType ?? null)}
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>{t('allergies')}</span>
          {profile?.allergies ? (
            <span className='font-bold text-slate-900'>
              {profile.allergies}
            </span>
          ) : (
            <Badge
              variant='secondary'
              className='bg-slate-100 text-slate-500 hover:bg-slate-200'
            >
              {t('none')}
            </Badge>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-slate-500'>{t('insuranceNumber')}</span>
          <span className='font-mono font-medium text-slate-700'>
            {profile?.healthInsuranceNumber || t('notUpdated')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
