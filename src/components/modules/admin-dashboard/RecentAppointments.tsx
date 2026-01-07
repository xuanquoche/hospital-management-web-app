'use client';

import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Calendar, Clock, MoreHorizontal, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AdminAppointment } from '@/types/admin-dashboard';

interface RecentAppointmentsProps {
  appointments: AdminAppointment[];
}

const statusConfig: Record<
  string,
  {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }
> = {
  PENDING: { label: 'Chờ xác nhận', variant: 'secondary' },
  CONFIRMED: { label: 'Đã xác nhận', variant: 'default' },
  IN_PROGRESS: { label: 'Đang khám', variant: 'default' },
  COMPLETED: { label: 'Hoàn thành', variant: 'outline' },
  CANCELLED: { label: 'Đã hủy', variant: 'destructive' },
  NO_SHOW: { label: 'Không đến', variant: 'destructive' },
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-amber-100 text-amber-700 hover:bg-amber-100';
    case 'CONFIRMED':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
    case 'IN_PROGRESS':
      return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100';
    case 'COMPLETED':
      return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100';
    case 'CANCELLED':
      return 'bg-red-100 text-red-700 hover:bg-red-100';
    case 'NO_SHOW':
      return 'bg-slate-100 text-slate-700 hover:bg-slate-100';
    default:
      return 'bg-slate-100 text-slate-700 hover:bg-slate-100';
  }
};

export const RecentAppointments = ({
  appointments,
}: RecentAppointmentsProps) => {
  if (!appointments || appointments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
      >
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-bold text-slate-900'>
              Lịch hẹn gần đây
            </h3>
            <p className='text-sm text-slate-500'>
              Quản lý các lịch hẹn mới nhất
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <Calendar className='mb-4 h-12 w-12 text-slate-300' />
          <p className='text-slate-500'>Chưa có lịch hẹn nào</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className='rounded-2xl border border-slate-200 bg-white shadow-sm'
    >
      <div className='flex items-center justify-between border-b border-slate-100 p-6'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>Lịch hẹn gần đây</h3>
          <p className='text-sm text-slate-500'>
            Quản lý các lịch hẹn mới nhất
          </p>
        </div>
        <Link href='/admin-appointments'>
          <Button
            variant='ghost'
            size='sm'
            className='gap-2 text-sm text-slate-600 hover:text-slate-900'
          >
            Xem tất cả
            <ArrowRight className='h-4 w-4' />
          </Button>
        </Link>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-slate-100 bg-slate-50/50'>
              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500'>
                Bệnh nhân
              </th>
              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500'>
                Bác sĩ
              </th>
              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500'>
                Thời gian
              </th>
              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500'>
                Trạng thái
              </th>
              <th className='px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500'>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100'>
            {appointments.map((appointment) => {
              const status =
                statusConfig[appointment.status] || statusConfig.PENDING;
              return (
                <tr
                  key={appointment.id}
                  className='transition-colors hover:bg-slate-50/50'
                >
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-10 w-10 border-2 border-white shadow-sm'>
                        <AvatarFallback className='bg-violet-100 text-violet-700'>
                          {appointment.patient.name?.charAt(0) || 'P'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='font-medium text-slate-900'>
                          {appointment.patient.name}
                        </p>
                        <p className='text-xs text-slate-500'>
                          {appointment.patient.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-10 w-10 border-2 border-white shadow-sm'>
                        <AvatarImage src={appointment.doctor.avatar} />
                        <AvatarFallback className='bg-cyan-100 text-cyan-700'>
                          {appointment.doctor.name?.charAt(0) || 'D'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='font-medium text-slate-900'>
                          {appointment.doctor.professionalTitle}{' '}
                          {appointment.doctor.name}
                        </p>
                        <p className='text-xs text-slate-500'>
                          {appointment.doctor.specialty?.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2 text-slate-600'>
                      <Calendar className='h-4 w-4 text-slate-400' />
                      <span className='text-sm'>
                        {format(
                          parseISO(appointment.appointmentDate),
                          'dd/MM/yyyy',
                          {
                            locale: vi,
                          }
                        )}
                      </span>
                    </div>
                    <div className='mt-1 flex items-center gap-2 text-slate-500'>
                      <Clock className='h-4 w-4 text-slate-400' />
                      <span className='text-xs'>
                        {appointment.timeSlot.startTime?.slice(0, 5)} -{' '}
                        {appointment.timeSlot.endTime?.slice(0, 5)}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <Badge className={getStatusBadgeClass(appointment.status)}>
                      {status.label}
                    </Badge>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <Link href={`/admin-appointments/${appointment.id}`}>
                          <DropdownMenuItem className='cursor-pointer'>
                            <Eye className='mr-2 h-4 w-4' />
                            Xem chi tiết
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
