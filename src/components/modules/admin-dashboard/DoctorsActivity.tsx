'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, Activity } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminDoctor } from '@/types/admin-dashboard';

interface DoctorsActivityProps {
  doctors: AdminDoctor[];
}

const statusKeys: Record<string, string> = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ON_LEAVE: 'onLeave',
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-emerald-100 text-emerald-700';
    case 'INACTIVE':
      return 'bg-slate-100 text-slate-700';
    case 'ON_LEAVE':
      return 'bg-amber-100 text-amber-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export const DoctorsActivity = ({ doctors }: DoctorsActivityProps) => {
  const t = useTranslations('Admin.Dashboard');

  if (!doctors || doctors.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
      >
        <div className='mb-6'>
          <h3 className='text-lg font-bold text-slate-900'>
            {t('doctorsActivity.title')}
          </h3>
          <p className='text-sm text-slate-500'>
            {t('doctorsActivity.subtitle')}
          </p>
        </div>
        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <Activity className='mb-4 h-12 w-12 text-slate-300' />
          <p className='text-slate-500'>{t('doctorsActivity.noData')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
    >
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>
            {t('doctorsActivity.title')}
          </h3>
          <p className='text-sm text-slate-500'>
            {t('doctorsActivity.subtitle')}
          </p>
        </div>
        <Link href='/admin-doctor'>
          <Button
            variant='ghost'
            size='sm'
            className='gap-2 text-sm text-slate-600 hover:text-slate-900'
          >
            {t('doctorsActivity.viewAll')}
            <ArrowRight className='h-4 w-4' />
          </Button>
        </Link>
      </div>

      <div className='space-y-4'>
        {doctors.map((doctor, index) => {
          const statusKey = statusKeys[doctor.status] || 'inactive';
          return (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              className='flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50'
            >
              <Avatar className='h-12 w-12 border-2 border-white shadow-md'>
                <AvatarImage src={doctor.user.avatar} />
                <AvatarFallback className='bg-gradient-to-br from-cyan-500 to-blue-600 text-white'>
                  {doctor.user.fullName?.charAt(0) || 'D'}
                </AvatarFallback>
              </Avatar>

              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-2'>
                  <p className='truncate font-semibold text-slate-900'>
                    {doctor.professionalTitle} {doctor.user.fullName}
                  </p>
                </div>
                <p className='truncate text-sm text-slate-500'>
                  {doctor.primarySpecialty?.name}
                </p>
              </div>

              <div className='flex flex-col items-end gap-2'>
                <Badge className={getStatusBadgeClass(doctor.status)}>
                  {t(`statuses.${statusKey}`)}
                </Badge>
                <div className='flex items-center gap-1 text-xs text-slate-500'>
                  <Star className='h-3 w-3 fill-amber-400 text-amber-400' />
                  <span>
                    {doctor.yearsOfExperience} {t('doctorsActivity.yearsExp')}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
