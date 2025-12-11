'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/use-appointment-store';

import { BookingNote } from './confirmation/BookingNote';
import { BookingSummaryCard } from './confirmation/BookingSummaryCard';
import { DoctorScheduleInfo } from './confirmation/DoctorScheduleInfo';
import { PaymentMethodSelection } from './confirmation/PaymentMethodSelection';
import { PaymentNote } from './confirmation/PaymentNote';
import { PriceBreakdown } from './confirmation/PriceBreakdown';
import { TermsAgreement } from './confirmation/TermsAgreement';

interface StepConfirmationProps {
  onBack: () => void;
}

export const StepConfirmation = ({ onBack }: StepConfirmationProps) => {
  const { paymentMethod } = useAppointmentStore();

  const handleConfirm = () => {
    if (!paymentMethod) {
      toast.error('Vui lòng chọn hình thức thanh toán');
      return;
    }
    // Handle payment/confirmation logic here
    toast.success('Đặt lịch thành công!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='grid grid-cols-1 gap-8 xl:grid-cols-12'
    >
      {/* Left Column */}
      <div className='space-y-6 xl:col-span-8'>
        <BookingSummaryCard />
        <PaymentMethodSelection />
        <BookingNote />
        <TermsAgreement />

        <div className='flex items-center justify-end gap-4 pt-4'>
          <Button
            variant='ghost'
            className='text-slate-500 hover:text-slate-900'
            onClick={onBack}
          >
            Quay lại — Bước 3
          </Button>
          <Button
            className='bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700 px-8'
            onClick={handleConfirm}
          >
            Xác nhận & thanh toán ngay
          </Button>
        </div>
      </div>

      {/* Right Column */}
      <div className='space-y-6 xl:col-span-4'>
        <DoctorScheduleInfo />
        <PriceBreakdown />
        <PaymentNote />
      </div>
    </motion.div>
  );
};
