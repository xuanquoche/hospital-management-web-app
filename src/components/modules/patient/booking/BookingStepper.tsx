'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React from 'react';

interface BookingStepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Chọn Bác sĩ/Chuyên khoa' },
  { id: 2, label: 'Chọn Ngày & Giờ' },
  { id: 3, label: 'Nhập thông tin' },
  { id: 4, label: 'Xác nhận & thanh toán' },
];

export const BookingStepper = ({ currentStep }: BookingStepperProps) => {
  return (
    <div className='w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>Quy trình đặt lịch</h3>
        <p className='text-slate-500'>
          4 bước đơn giản để hoàn tất đặt lịch khám.
        </p>
      </div>

      <div className='relative flex items-center justify-between'>
        {/* Progress Bar Background */}
        <div className='absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-slate-100' />

        {/* Active Progress Bar */}
        <motion.div
          className='absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-teal-600'
          initial={{ width: '0%' }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className='relative z-10 flex items-center gap-2 bg-white px-2'
            >
              <motion.div
                initial={false}
                animate={{
                  backgroundColor:
                    isActive || isCompleted ? '#0d9488' : '#f1f5f9',
                  color: isActive || isCompleted ? '#ffffff' : '#64748b',
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300`}
              >
                {isCompleted ? <Check className='h-4 w-4' /> : step.id}
              </motion.div>
              <span
                className={`hidden text-sm font-medium sm:block ${isActive ? 'text-teal-700' : 'text-slate-500'}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
