'use client';

import React, { useState } from 'react';

import { BookingStepper } from '@/components/modules/patient/booking/BookingStepper';
import { BookingSummary } from '@/components/modules/patient/booking/BookingSummary';
import { BookingTips } from '@/components/modules/patient/booking/BookingTips';
import { NearestAppointment } from '@/components/modules/patient/booking/NearestAppointment';
import { StepSelectDate } from '@/components/modules/patient/booking/StepSelectDate';
import { StepSelectDoctor } from '@/components/modules/patient/booking/StepSelectDoctor';

export default function PatientBookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className='min-h-screen bg-slate-50/50 p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900'>Đặt lịch khám</h1>
        <p className='mt-2 text-slate-500'>
          {currentStep === 1
            ? 'Bước 1/4 - Chọn bác sĩ hoặc chuyên khoa phù hợp.'
            : currentStep === 2
              ? 'Bước 2/4 - Chọn ngày, khung giờ & mô tả triệu chứng ban đầu.'
              : `Bước ${currentStep}/4`}
        </p>
      </div>

      <div className='mb-8'>
        <BookingStepper currentStep={currentStep} />
      </div>

      {currentStep === 1 ? (
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-12'>
          {/* Main Content Area */}
          <div className='space-y-8 xl:col-span-9'>
            <StepSelectDoctor
              selectedDoctorId={selectedDoctor?.id}
              onSelectDoctor={setSelectedDoctor}
            />

            <BookingSummary
              selectedDoctor={selectedDoctor}
              currentStep={currentStep}
              onNext={handleNext}
              onBack={handleBack}
            />
          </div>

          {/* Right Sidebar */}
          <div className='space-y-6 xl:col-span-3'>
            <BookingTips />
            <NearestAppointment />
          </div>
        </div>
      ) : currentStep === 2 ? (
        <div className='w-full'>
          <StepSelectDate selectedDoctor={selectedDoctor} />

          <div className='mt-8 flex justify-end'>
            <div className='w-full lg:w-1/3'>
              <BookingSummary
                selectedDoctor={selectedDoctor}
                currentStep={currentStep}
                onNext={handleNext}
                onBack={handleBack}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
