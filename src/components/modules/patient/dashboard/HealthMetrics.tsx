'use client';

import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
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

const formatBloodType = (bloodType: string | null): string => {
  if (!bloodType) return 'Chưa cập nhật';
  return bloodType;
};

export const HealthMetrics = ({ profile }: HealthMetricsProps) => {
  const bmi = calculateBMI(profile?.height, profile?.weight);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
    >
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>Chỉ số sức khỏe</h3>
          <p className='text-slate-500'>Tổng quan hồ sơ cá nhân của bạn.</p>
        </div>
        <Link href='/patient/profile'>
          <Button
            variant='ghost'
            size='sm'
            className='gap-1 text-xs text-slate-400 hover:text-slate-600'
          >
            <Pencil className='h-3 w-3' />
            Cập nhật
          </Button>
        </Link>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>Chiều cao</span>
          <span className='font-bold text-slate-900'>
            {profile?.height ? `${profile.height} cm` : 'Chưa cập nhật'}
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>Cân nặng</span>
          <span className='font-bold text-slate-900'>
            {profile?.weight ? `${profile.weight} kg` : 'Chưa cập nhật'}
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>BMI ước tính</span>
          <span className='font-bold text-slate-900'>{bmi}</span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>Nhóm máu</span>
          <span className='font-bold text-slate-900'>
            {formatBloodType(profile?.bloodType ?? null)}
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-slate-50 pb-3'>
          <span className='text-slate-500'>Dị ứng</span>
          {profile?.allergies ? (
            <span className='font-bold text-slate-900'>
              {profile.allergies}
            </span>
          ) : (
            <Badge
              variant='secondary'
              className='bg-slate-100 text-slate-500 hover:bg-slate-200'
            >
              Không ghi nhận
            </Badge>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-slate-500'>Số BHYT</span>
          <span className='font-mono font-medium text-slate-700'>
            {profile?.healthInsuranceNumber || 'Chưa cập nhật'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
