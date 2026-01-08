'use client';

import React, { useEffect } from 'react';

import { BookingStepper } from '@/components/modules/patient/booking/BookingStepper';
import { BookingSummary } from '@/components/modules/patient/booking/BookingSummary';
import { BookingTips } from '@/components/modules/patient/booking/BookingTips';
import { NearestAppointment } from '@/components/modules/patient/booking/NearestAppointment';
import { StepConfirmation } from '@/components/modules/patient/booking/StepConfirmation';
import { StepEnterInfo } from '@/components/modules/patient/booking/StepEnterInfo';
import { StepSelectDate } from '@/components/modules/patient/booking/StepSelectDate';
import { StepSelectDoctor } from '@/components/modules/patient/booking/StepSelectDoctor';
import { useAppointmentStore } from '@/store/use-appointment-store';
import { UserProfileResponse, ProfileData } from '@/types/user';

interface PatientBookingViewProps {
  initialUserInfo: UserProfileResponse['data'] | null;
}

export default function PatientBookingView({
  initialUserInfo,
}: PatientBookingViewProps) {
  const {
    currentStep,
    selectedDoctor,
    selectedDate,
    selectedTime,
    setCurrentStep,
    setSelectedDoctor,
    setPatientInfo,
  } = useAppointmentStore();

  useEffect(() => {
    if (initialUserInfo) {
      const profile = initialUserInfo.profile as ProfileData;
      setPatientInfo({
        fullName: initialUserInfo.user.fullName,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        phone: initialUserInfo.user.phone,
        email: initialUserInfo.user.email,
        address: initialUserInfo.user.address,
        insuranceNumber: profile.healthInsuranceNumber,
      });
    }
  }, [initialUserInfo, setPatientInfo]);

  const handleNext = () => {
    setCurrentStep(Math.min(currentStep + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
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
              : currentStep === 3
                ? 'Bước 3/4 - Nhập thông tin.'
                : 'Bước 4/4 - Xác nhận thông tin cuộc hẹn và chọn hình thức thanh toán.'}
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
              selectedDoctorId={selectedDoctor?.id || null}
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
      ) : currentStep === 3 ? (
        <StepEnterInfo
          selectedDoctor={selectedDoctor}
          selectedDate={selectedDate || new Date()}
          selectedTime={selectedTime || '09:30 - 10:00'}
          onNext={handleNext}
          onBack={handleBack}
        />
      ) : currentStep === 4 ? (
        <StepConfirmation onBack={handleBack} />
      ) : null}
    </div>
  );
}
