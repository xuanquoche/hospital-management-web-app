'use client';

import React from 'react';

import { Button } from '@/components/ui/button';

interface BookingSummaryProps {
  selectedDoctor?: any;
  currentStep?: number;
  onNext?: () => void;
  onBack?: () => void;
}

export const BookingSummary = ({
  selectedDoctor,
  currentStep = 1,
  onNext,
  onBack,
}: BookingSummaryProps) => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <h3 className='mb-4 text-lg font-bold text-slate-900'>
        Tóm tắt lựa chọn
      </h3>
      <p className='mb-6 text-sm text-slate-500'>
        Thông tin sẽ dùng cho các bước tiếp theo.
      </p>

      <div className='mb-6 space-y-3 text-sm'>
        <div className='flex justify-between'>
          <span className='text-slate-500'>Chuyên khoa</span>
          <span className='font-medium text-slate-900'>
            {selectedDoctor ? selectedDoctor.specialty : 'Chưa chọn'}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-slate-500'>Bác sĩ</span>
          <span className='font-medium text-slate-900'>
            {selectedDoctor ? selectedDoctor.name : 'Chưa chọn'}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-slate-500'>Cơ sở khám</span>
          <span className='font-medium text-slate-900'>
            {selectedDoctor ? selectedDoctor.location : 'Chưa chọn'}
          </span>
        </div>
      </div>

      <div className='flex items-center justify-end gap-4'>
        <Button
          variant='ghost'
          className='text-slate-500 hover:text-slate-900'
          onClick={onBack}
          disabled={currentStep === 1}
        >
          {currentStep === 1 ? 'Hủy' : 'Quay lại'}
        </Button>
        <Button
          className='bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700 disabled:opacity-50'
          onClick={onNext}
          disabled={!selectedDoctor}
        >
          {currentStep === 1
            ? 'Tiếp tục — Bước 2: Chọn Ngày & Giờ'
            : 'Tiếp tục — Bước 3: Nhập thông tin'}
        </Button>
      </div>
    </div>
  );
};
