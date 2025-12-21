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
import { PaymentMethod } from '@/types/payment';

import { BookingNote } from './confirmation/BookingNote';
import { BookingSummaryCard } from './confirmation/BookingSummaryCard';
import { DoctorScheduleInfo } from './confirmation/DoctorScheduleInfo';
import { PaymentMethodSelection } from './confirmation/PaymentMethodSelection';
import { PaymentNote } from './confirmation/PaymentNote';
import { PaymentQRModal } from './confirmation/PaymentQRModal';
import { PriceBreakdown } from './confirmation/PriceBreakdown';
import { TermsAgreement } from './confirmation/TermsAgreement';

interface StepConfirmationProps {
  onBack: () => void;
}

export const StepConfirmation = ({ onBack }: StepConfirmationProps) => {
  const router = useRouter();
  const { selectedDoctor, timeSlotId, selectedDate, examinationType, symptoms, notes, paymentMethod, selectedTime } =
    useAppointmentStore();
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');
  const [qrAmount, setQrAmount] = useState<number>(0);
  const [qrPaymentCode, setQrPaymentCode] = useState<string>('');

  // Calculate total amount (local estimate)
  const estimatedTotal = (selectedDoctor?.consultationFee || 0) + 20000;

  const handleConfirm = async () => {
    if (!paymentMethod) {
      toast.error('Vui lòng chọn hình thức thanh toán');
      return;
    }

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

      const createRes = await clientFetcher.post('/appointments', payload);
      const createdBooking = createRes.data as any;

      const newBookingId = createdBooking?.id;

      if (!newBookingId) {
        throw new Error('No booking ID returned');
      }

      setBookingId(newBookingId);

      if (paymentMethod === PaymentMethod.BANK_TRANSFER) {
        // Fetch full details to get payment code and exact fee
        const detailRes = await clientFetcher.get(`/appointments/${newBookingId}`);
        const appointmentData = detailRes.data as any;

        const actualData = appointmentData.data || appointmentData;

        setQrAmount(actualData.totalFee || estimatedTotal);
        setQrPaymentCode(actualData.payment?.paymentCode || newBookingId);
        setShowQR(true);
      } else {
        toast.success('Đặt lịch thành công!');
        router.push(PRIVATE_ROUTES.PATIENT_DASHBOARD);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    setShowQR(false);
    toast.success('Đặt lịch thành công!');
    router.push(PRIVATE_ROUTES.PATIENT_DASHBOARD);
  };

  return (
    <>
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
            <Button variant='ghost' className='text-slate-500 hover:text-slate-900' onClick={onBack} disabled={loading}>
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

      <PaymentQRModal
        open={showQR}
        onOpenChange={setShowQR}
        onComplete={handlePaymentComplete}
        amount={qrAmount}
        description={qrPaymentCode}
        doctorName={selectedDoctor?.user.fullName || ''}
        appointmentDate={selectedDate || new Date()}
        timeSlot={selectedTime || ''}
      />
    </>
  );
};
