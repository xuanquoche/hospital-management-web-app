'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { BookingInfoTips } from './BookingInfoTips';
import { BookingSelectedSummary } from './BookingSelectedSummary';
import { ContactInsuranceForm } from './ContactInsuranceForm';
import { PatientInfoForm } from './PatientInfoForm';
import { ProfileInfoTips } from './ProfileInfoTips';

interface StepEnterInfoProps {
  selectedDoctor: any;
  selectedDate?: Date;
  selectedTime?: string;
  onNext: () => void;
  onBack: () => void;
}

export const StepEnterInfo = ({
  selectedDoctor,
  selectedDate,
  selectedTime,
  onNext,
  onBack,
}: StepEnterInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='grid grid-cols-1 gap-8 xl:grid-cols-12'
    >
      {/* Left Column: Form */}
      <div className='space-y-8 xl:col-span-8'>
        {/* Patient Info Section */}
        <PatientInfoForm />

        {/* Contact & Insurance Section */}
        <ContactInsuranceForm />

        {/* Consent Section */}
        <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
          <div className='mb-4'>
            <h3 className='text-lg font-bold text-slate-900'>
              Đồng ý & chia sẻ thông tin
            </h3>
            <p className='text-sm text-slate-500'>
              Giúp bác sĩ có thêm dữ liệu để chẩn đoán chính xác hơn.
            </p>
          </div>

          <div className='space-y-4'>
            <div className='flex items-start space-x-2'>
              <Checkbox
                id='share-history'
                defaultChecked
                className='mt-1 border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600'
              />
              <label
                htmlFor='share-history'
                className='text-sm leading-relaxed text-slate-600'
              >
                Tôi đồng ý chia sẻ thông tin bệnh lý và tiền sử khám chữa bệnh
                cho bác sĩ phụ trách cuộc hẹn này.
              </label>
            </div>

            <div className='flex items-start space-x-2'>
              <Checkbox
                id='confirm-info'
                defaultChecked
                className='mt-1 border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600'
              />
              <label
                htmlFor='confirm-info'
                className='text-sm leading-relaxed text-slate-600'
              >
                Tôi xác nhận các thông tin trên là chính xác và chịu trách nhiệm
                với thông tin đã cung cấp.
              </label>
            </div>
          </div>

          <div className='mt-6 rounded-lg bg-teal-50 p-4'>
            <div className='flex gap-2'>
              <Badge
                variant='outline'
                className='border-teal-200 bg-white text-teal-700'
              >
                Gợi ý
              </Badge>
              <p className='text-sm text-teal-800'>
                Thông tin càng đầy đủ, bác sĩ càng dễ đánh giá và rút ngắn thời
                gian hỏi bệnh.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className='flex items-center justify-end gap-4 pt-4'>
          <Button
            variant='ghost'
            className='text-slate-500 hover:text-slate-900'
            onClick={onBack}
          >
            Quay lại — Bước 2
          </Button>
          <Button
            className='bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700'
            onClick={onNext}
          >
            Tiếp tục — Bước 4: Xác nhận & thanh toán
          </Button>
        </div>
      </div>

      {/* Right Column: Sidebar */}
      <div className='space-y-6 xl:col-span-4'>
        <BookingSelectedSummary
          selectedDoctor={selectedDoctor}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
        <BookingInfoTips />
        <ProfileInfoTips />
      </div>
    </motion.div>
  );
};
