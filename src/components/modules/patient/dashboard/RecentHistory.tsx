'use client';

import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConsultationHistory } from '@/types/patient-dashboard';

interface RecentHistoryProps {
  consultations: ConsultationHistory[];
}

const statusMap: Record<string, { label: string; className: string }> = {
  COMPLETED: {
    label: 'Đã khám',
    className: 'bg-slate-100 text-slate-600 hover:bg-slate-200',
  },
  IN_PROGRESS: {
    label: 'Đang khám',
    className: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  },
};

const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, 'dd/MM/yyyy', { locale: vi });
};

export const RecentHistory = ({ consultations }: RecentHistoryProps) => {
  if (!consultations || consultations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
      >
        <div className='mb-6'>
          <h3 className='text-lg font-bold text-slate-900'>
            Lịch sử khám gần đây
          </h3>
          <p className='text-slate-500'>Xem lại các lần khám gần đây.</p>
        </div>

        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <ClipboardList className='mb-4 h-12 w-12 text-slate-300' />
          <p className='mb-2 text-slate-600'>Chưa có lịch sử khám bệnh</p>
          <p className='text-sm text-slate-400'>
            Thông tin lịch sử khám sẽ hiển thị tại đây sau khi bạn hoàn thành
            khám
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
    >
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>
          Lịch sử khám gần đây
        </h3>
        <p className='text-slate-500'>Xem lại các lần khám gần đây.</p>
      </div>

      <div className='space-y-6'>
        {consultations.map((consultation) => {
          const status = statusMap[consultation.status] || statusMap.COMPLETED;
          const prescriptionCount = consultation.prescriptionItems?.length || 0;

          return (
            <div
              key={consultation.id}
              className='relative border-l-2 border-slate-100 pl-4 last:border-0'
            >
              <div className='absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300 ring-4 ring-white' />
              <div className='flex justify-between items-start mb-1'>
                <h4 className='font-bold text-slate-800'>
                  Khám{' '}
                  {consultation.doctor.primarySpecialty?.name || 'Tổng quát'}
                </h4>
                <Badge variant='secondary' className={status.className}>
                  {status.label}
                </Badge>
              </div>
              <p className='text-sm text-slate-500 mb-1'>
                {formatDate(consultation.appointmentDate)} •{' '}
                {consultation.doctor.professionalTitle}{' '}
                {consultation.doctor.user.fullName}
              </p>
              <p className='text-xs text-slate-400'>
                • Đơn thuốc: {prescriptionCount}
              </p>
            </div>
          );
        })}
      </div>

      <div className='mt-6'>
        <Link href='/patient/health-record'>
          <Button
            variant='outline'
            className='w-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          >
            Xem toàn bộ hồ sơ
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
