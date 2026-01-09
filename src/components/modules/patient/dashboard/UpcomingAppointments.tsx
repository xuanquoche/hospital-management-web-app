'use client';

import { format, parseISO } from 'date-fns';
import { vi, enUS, ja } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { CalendarClock } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardAppointment } from '@/types/patient-dashboard';

interface UpcomingAppointmentsProps {
  appointments: DashboardAppointment[];
}

export const UpcomingAppointments = ({
  appointments,
}: UpcomingAppointmentsProps) => {
  const t = useTranslations('Patient.Dashboard.Upcoming');
  const localeStr = useLocale();

  const getLocale = () => {
    switch (localeStr) {
      case 'vi':
        return vi;
      case 'ja':
        return ja;
      default:
        return enUS;
    }
  };

  const statusMap: Record<string, { label: string; className: string }> = {
    PENDING: {
      label: t('status.pending'),
      className: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
    },
    CONFIRMED: {
      label: t('status.confirmed'),
      className: 'bg-teal-50 text-teal-700 hover:bg-teal-100',
    },
    IN_PROGRESS: {
      label: t('status.inProgress'),
      className: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    },
    COMPLETED: {
      label: t('status.completed'),
      className: 'bg-green-50 text-green-700 hover:bg-green-100',
    },
    CANCELLED: {
      label: t('status.cancelled'),
      className: 'bg-red-50 text-red-700 hover:bg-red-100',
    },
  };

  const formatAppointmentDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'EEEE, dd/MM/yyyy', { locale: getLocale() });
  };

  const formatTimeSlot = (startTime: string, endTime: string) => {
    return `${startTime.slice(0, 5)} - ${endTime.slice(0, 5)}`;
  };

  const upcomingAppointment = appointments[0];

  if (!upcomingAppointment) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
      >
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-bold text-slate-900'>{t('title')}</h3>
            <p className='text-slate-500'>{t('subtitle')}</p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <CalendarClock className='mb-4 h-12 w-12 text-slate-300' />
          <p className='mb-2 text-slate-600'>{t('noAppointments')}</p>
          <p className='text-sm text-slate-400'>{t('noAppointmentsDetail')}</p>
        </div>

        <div className='mt-4'>
          <Link href='/patient/booking'>
            <Button className='w-full bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100 shadow-none'>
              {t('bookNow')}
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  const status = statusMap[upcomingAppointment.status] || statusMap.PENDING;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
    >
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>{t('title')}</h3>
          <p className='text-slate-500'>{t('subtitle')}</p>
        </div>
        <Badge variant='secondary' className={status.className}>
          {status.label}
        </Badge>
      </div>

      <div className='mb-6'>
        <h4 className='mb-2 text-lg font-bold text-slate-800'>
          {t('visit')}{' '}
          {upcomingAppointment.examinationType === 'GENERAL'
            ? t('general')
            : t('specialist')}{' '}
          {t('with')} {upcomingAppointment.doctor.professionalTitle}{' '}
          {upcomingAppointment.doctor.name}
        </h4>
        <div className='flex gap-2 mb-4'>
          <Badge variant='outline' className='bg-slate-50 text-slate-600'>
            {upcomingAppointment.doctor.specialty.name}
          </Badge>
        </div>

        <div className='space-y-3 text-sm'>
          <div className='flex justify-between border-b border-dashed border-slate-100 pb-2'>
            <span className='text-slate-500'>{t('time')}</span>
            <span className='font-semibold text-slate-900'>
              {formatAppointmentDate(upcomingAppointment.appointmentDate)} •{' '}
              {formatTimeSlot(
                upcomingAppointment.timeSlot.startTime,
                upcomingAppointment.timeSlot.endTime
              )}
            </span>
          </div>
          <div className='flex justify-between border-b border-dashed border-slate-100 pb-2'>
            <span className='text-slate-500'>{t('paymentCode')}</span>
            <span className='font-semibold text-slate-900'>
              {upcomingAppointment.payment?.paymentCode || 'N/A'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-slate-500'>{t('consultationFee')}</span>
            <span className='font-semibold text-teal-600'>
              {upcomingAppointment.consultationFee.toLocaleString(
                localeStr === 'vi' ? 'vi-VN' : 'en-US'
              )}{' '}
              {t('currency')}
            </span>
          </div>
        </div>
      </div>

      <div className='flex gap-4'>
        <Link
          href={`/patient/appointments/${upcomingAppointment.id}`}
          className='flex-1'
        >
          <Button className='w-full bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100 shadow-none'>
            {t('viewDetail')}
          </Button>
        </Link>
        <Link href='/patient/appointments' className='flex-1'>
          <Button variant='ghost' className='w-full text-slate-500'>
            {t('viewAll')}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
