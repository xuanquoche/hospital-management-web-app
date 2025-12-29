import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAppointmentStore } from '@/store/use-appointment-store';

export const DoctorScheduleInfo = () => {
  const { selectedDoctor, selectedDate, selectedTime } = useAppointmentStore();

  if (!selectedDoctor || !selectedDate || !selectedTime) return null;

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>
          Bác sĩ & lịch đã chọn
        </h3>
        <button className='text-sm text-teal-600 font-medium hover:text-teal-700'>
          Thay đổi
        </button>
      </div>

      <p className='text-sm text-slate-500 mb-6'>Thông tin từ Bước 1 & 2.</p>

      <div className='flex items-start gap-4 mb-6'>
        <Avatar className='h-12 w-12 border border-slate-200'>
          <AvatarImage
            src={selectedDoctor.user.avatar}
            alt={selectedDoctor.user.fullName}
          />
          <AvatarFallback>
            {selectedDoctor.user.fullName?.charAt(0) ?? 'D'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className='font-bold text-slate-900'>
            {selectedDoctor.professionalTitle}. {selectedDoctor.user.fullName}
          </h4>
          <p className='text-xs text-slate-500 mt-1'>
            {selectedDoctor.primarySpecialty.name} •{' '}
            {selectedDoctor.yearsOfExperience} năm kinh nghiệm
          </p>
          <div className='flex gap-2 mt-2'>
            <Badge
              variant='secondary'
              className='bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-100 text-[10px]'
            >
              Cơ sở 1 - Quận 1
            </Badge>
            <Badge
              variant='secondary'
              className='bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 text-[10px]'
            >
              Phòng khám số 302
            </Badge>
          </div>
        </div>
      </div>

      <div className='space-y-3 pt-4 border-t border-slate-100'>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-500'>Ngày khám</span>
          <span className='text-sm font-semibold text-slate-900'>
            {format(new Date(selectedDate), 'EEEE, dd/MM/yyyy', { locale: vi })}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-500'>Khung giờ</span>
          <span className='text-sm font-semibold text-slate-900'>
            {selectedTime}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-500'>Hình thức</span>
          <span className='text-sm font-semibold text-slate-900'>
            Khám trực tiếp tại cơ sở
          </span>
        </div>
      </div>
    </div>
  );
};
