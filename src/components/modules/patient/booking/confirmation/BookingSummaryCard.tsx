import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { User, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import React from 'react';

import { useAppointmentStore } from '@/store/use-appointment-store';

export const BookingSummaryCard = () => {
  const { patientInfo } = useAppointmentStore();

  if (!patientInfo) return null;

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>Tóm tắt cuộc hẹn</h3>
        <button className='text-sm text-teal-600 font-medium hover:text-teal-700'>
          Chỉnh sửa
        </button>
      </div>

      <p className='text-sm text-slate-500 mb-6'>
        Vui lòng kiểm tra kỹ thông tin trước khi thanh toán.
      </p>

      <div className='space-y-4'>
        <div className='flex justify-between items-start'>
          <span className='text-sm text-slate-500'>Bệnh nhân</span>
          <div className='text-right'>
            <p className='text-sm font-semibold text-slate-900'>
              {patientInfo.fullName}
            </p>
            <p className='text-xs text-slate-500'>
              (Nữ, {format(new Date(patientInfo.dateOfBirth), 'dd/MM/yyyy')})
            </p>
          </div>
        </div>

        <div className='flex justify-between items-start'>
          <span className='text-sm text-slate-500'>Liên hệ</span>
          <div className='text-right'>
            <p className='text-sm font-medium text-slate-900'>
              {patientInfo.phone}
            </p>
            <p className='text-xs text-slate-500'>{patientInfo.email}</p>
          </div>
        </div>

        <div className='flex justify-between items-start'>
          <span className='text-sm text-slate-500'>Địa chỉ</span>
          <p className='text-sm font-medium text-slate-900 text-right max-w-[60%]'>
            {patientInfo.address}
          </p>
        </div>

        <div className='border-t border-slate-100 my-4'></div>

        <div className='flex justify-between items-start'>
          <span className='text-sm text-slate-500'>Tiền sử bệnh lý</span>
          <p className='text-sm font-medium text-slate-900 text-right'>
            Đã nhập ở Bước 3
          </p>
        </div>

        <div className='flex justify-between items-start'>
          <span className='text-sm text-slate-500'>Bảo hiểm</span>
          <p className='text-sm font-medium text-slate-900 text-right'>
            {patientInfo.insuranceNumber || 'Không có'}
          </p>
        </div>
      </div>
    </div>
  );
};
