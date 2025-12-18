'use client';

import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface BookingSelectedSummaryProps {
  selectedDoctor: any;
  selectedDate?: Date;
  selectedTime?: string;
}

export const BookingSelectedSummary = ({
  selectedDoctor,
  selectedDate,
  selectedTime,
}: BookingSelectedSummaryProps) => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='font-bold text-slate-900'>Bác sĩ & lịch đã chọn</h3>
        <button className='text-xs font-medium text-slate-400 hover:text-teal-600'>
          Thay đổi
        </button>
      </div>
      <p className='mb-4 text-xs text-slate-500'>Thông tin từ Bước 1 & 2.</p>

      <div className='mb-6 flex items-start gap-3'>
        <Avatar className='h-12 w-12 border border-slate-100'>
          <AvatarImage src={selectedDoctor?.image} />
          <AvatarFallback className='bg-teal-50 text-teal-700'>
            {selectedDoctor?.user?.fullName?.split(' ').pop()?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className='font-bold text-slate-900 text-sm'>
            {selectedDoctor?.user?.fullName}
          </h4>
          <p className='text-xs text-slate-500 mb-1'>
            {selectedDoctor?.specialty} • {selectedDoctor?.experience}
          </p>
          <div className='flex flex-wrap gap-1'>
            <Badge
              variant='secondary'
              className='bg-slate-100 text-[10px] text-slate-600 h-5 px-1.5'
            >
              {selectedDoctor?.location}
            </Badge>
            <Badge
              variant='secondary'
              className='bg-teal-50 text-[10px] text-teal-700 h-5 px-1.5'
            >
              Phòng khám số 302
            </Badge>
          </div>
        </div>
      </div>

      <div className='space-y-3 text-sm border-t border-slate-100 pt-4'>
        <div className='flex justify-between'>
          <span className='text-slate-500'>Ngày khám</span>
          <span className='font-medium text-slate-900 text-right'>
            {selectedDate
              ? format(selectedDate, 'EEEE, dd/MM/yyyy', { locale: vi })
              : 'Chưa chọn'}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-slate-500'>Khung giờ</span>
          <span className='font-bold text-slate-900 text-right'>
            {selectedTime || 'Chưa chọn'}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-slate-500'>Hình thức</span>
          <span className='font-medium text-slate-900 text-right'>
            Khám trực tiếp tại cơ sở
          </span>
        </div>
      </div>
    </div>
  );
};
