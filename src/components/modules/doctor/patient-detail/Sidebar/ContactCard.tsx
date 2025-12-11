import React from 'react';

import { Badge } from '@/components/ui/badge';

import { PatientDetail } from '../data';

interface ContactCardProps {
  contact: PatientDetail['contact'];
  nextAppointment: PatientDetail['nextAppointment'];
}

export const ContactCard = ({ contact, nextAppointment }: ContactCardProps) => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>Liên hệ & nhắc hẹn</h3>
        <p className='text-xs text-slate-500'>
          Thông tin liên lạc và lần tái khám kế tiếp.
        </p>
      </div>

      <div className='space-y-2 mb-6'>
        <p className='text-xs text-slate-600'>
          <span className='text-slate-500'>Số điện thoại:</span>{' '}
          <span className='font-medium text-slate-900'>{contact.phone}</span>
        </p>
        <p className='text-xs text-slate-600'>
          <span className='text-slate-500'>Email:</span>{' '}
          <span className='font-medium text-slate-900'>{contact.email}</span>
        </p>
        <p className='text-xs text-slate-600'>
          <span className='text-slate-500'>Địa chỉ:</span>{' '}
          <span className='font-medium text-slate-900'>
            {contact.fullAddress}
          </span>
        </p>
      </div>

      <div className='grid grid-cols-2 gap-3 mb-4'>
        <div>
          <p className='text-[10px] text-slate-500 mb-1'>
            Lịch tái khám đề xuất
          </p>
          <p className='text-xs font-bold text-slate-900'>
            {nextAppointment.date} · {nextAppointment.type}
          </p>
        </div>
        <div>
          <p className='text-[10px] text-slate-500 mb-1'>
            Gửi nhắc lịch tái khám qua ứng dụng
          </p>
          <Badge
            variant='secondary'
            className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal cursor-pointer'
          >
            Gửi nhắc hẹn
          </Badge>
        </div>
      </div>

      <div className='flex justify-between items-center pt-3 border-t border-slate-100'>
        <span className='text-xs text-slate-500'>
          Đặt lịch khám trực tiếp mới
        </span>
        <span className='text-xs font-medium text-slate-900 cursor-pointer hover:text-teal-600'>
          Tạo lịch hẹn
        </span>
      </div>
    </div>
  );
};
