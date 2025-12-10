'use client';

import React, { useState } from 'react';

import { BookingStepper } from '@/components/modules/patient/booking/BookingStepper';
import { BookingSummary } from '@/components/modules/patient/booking/BookingSummary';
import { BookingTips } from '@/components/modules/patient/booking/BookingTips';
import { NearestAppointment } from '@/components/modules/patient/booking/NearestAppointment';
import { StepSelectDoctor } from '@/components/modules/patient/booking/StepSelectDoctor';

export default function PatientBookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className='min-h-screen bg-slate-50/50 p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900'>Đặt lịch khám</h1>
        <p className='mt-2 text-slate-500'>
          Bước {currentStep}/4 - Chọn bác sĩ hoặc chuyên khoa phù hợp.
        </p>
      </div>

      <div className='mb-8'>
        <BookingStepper currentStep={currentStep} />
      </div>

      <div className='grid grid-cols-1 gap-8 xl:grid-cols-12'>
        {/* Main Content Area */}
        <div className='xl:col-span-9 space-y-8'>
          {currentStep === 1 && <StepSelectDoctor />}

          <BookingSummary />
        </div>

        {/* Right Sidebar */}
        <div className='space-y-6 xl:col-span-3'>
          <BookingTips />
          <NearestAppointment />
        </div>
      </div>
    </div>
  );
}
