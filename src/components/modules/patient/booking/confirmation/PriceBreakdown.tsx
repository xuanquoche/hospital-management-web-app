import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/use-appointment-store';

export const PriceBreakdown = () => {
  const { selectedDoctor } = useAppointmentStore();

  if (!selectedDoctor) return null;

  const consultationFee = selectedDoctor.consultationFee;
  const bookingFee = 0;
  const discount = 0;
  const total = consultationFee + bookingFee - discount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
      .format(amount)
      .replace('₫', '');
  };

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>
          Chi tiết chi phí dự kiến
        </h3>
        <Badge
          variant='outline'
          className='text-teal-600 border-teal-200 bg-teal-50'
        >
          VND
        </Badge>
      </div>

      <p className='text-sm text-slate-500 mb-6'>
        Chi phí có thể thay đổi tùy theo dịch vụ phát sinh.
      </p>

      <div className='space-y-3'>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-600'>Khám Nội tổng quát</span>
          <span className='text-sm font-semibold text-slate-900'>
            {formatCurrency(consultationFee)}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-600'>
            Phí đặt lịch trực tuyến
          </span>
          <span className='text-sm font-semibold text-slate-900'>
            {formatCurrency(bookingFee)}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-600'>Ưu đãi / mã giảm giá</span>
          <span className='text-sm font-semibold text-slate-900'>
            - {discount}
          </span>
        </div>

        <div className='border-t border-slate-100 my-4 pt-4'>
          <div className='flex justify-between items-center'>
            <span className='text-base font-bold text-slate-900'>
              Tổng tạm tính
            </span>
            <span className='text-lg font-bold text-teal-600'>
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <div className='flex gap-2 mt-4'>
          <input
            type='text'
            placeholder='Nhập mã ưu đãi (nếu có)...'
            className='flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500'
          />
          <Button
            variant='outline'
            className='text-teal-600 border-teal-200 hover:bg-teal-50'
          >
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  );
};
