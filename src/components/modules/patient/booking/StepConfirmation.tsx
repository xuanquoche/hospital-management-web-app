'use client';

import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { PRIVATE_ROUTES } from '@/const/routes';
import { clientFetcher } from '@/lib/fetcher';
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
  const router = useRouter();
  const {
    selectedDoctor,
    timeSlotId,
    selectedDate,
    examinationType,
    symptoms,
    notes,
    paymentMethod,
  } = useAppointmentStore();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!paymentMethod) {
      toast.error('Vui lòng chọn hình thức thanh toán');
      return;
    }

    console.log('selectedDoctor', selectedDoctor);
    console.log('timeSlotId', timeSlotId);
    console.log('selectedDate', selectedDate);
    if (!selectedDoctor || !timeSlotId || !selectedDate) {
      toast.error('Missing required booking information');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        doctorId: selectedDoctor.id,
        timeSlotId: timeSlotId,
        appointmentDate: format(selectedDate, 'yyyy-MM-dd'),
        examinationType: examinationType || 'IN_PERSON',
        symptoms: symptoms,
        notes: notes,
        paymentMethod: paymentMethod,
      };

      console.log('payload', payload);
      await clientFetcher.post('/appointments', payload);
      toast.success('Đặt lịch thành công!');
      router.push(PRIVATE_ROUTES.PATIENT_DASHBOARD);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
          >
            Quay lại — Bước 3
          </Button>
          <Button
            className='bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700 px-8'
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Xác nhận & thanh toán ngay'}
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
