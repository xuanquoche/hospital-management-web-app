'use client';

import React, { useState } from 'react';
import { DoctorCreationHeader } from './DoctorCreationHeader';
import { DoctorCreationSteps } from './DoctorCreationSteps';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ProfessionalInfoForm } from './ProfessionalInfoForm';

export const CreateDoctorMain = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);

  const handleStepComplete = () => {
    const nextStep = currentStep + 1;
    if (nextStep > maxStep) {
      setMaxStep(nextStep);
    }
    setCurrentStep(nextStep);
  };

  return (
    <div className='flex min-h-screen flex-col bg-slate-50 p-6'>
      <DoctorCreationHeader />

      <div className='flex items-center justify-end mb-4'>
        <span className='text-sm font-medium text-slate-500 mr-2'>Status</span>
        <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
          Draft
        </span>
      </div>

      <div className='flex gap-8'>
        <DoctorCreationSteps
          currentStep={currentStep}
          maxStep={maxStep}
          onStepClick={setCurrentStep}
        />

        {currentStep === 1 && (
          <PersonalInfoForm onComplete={handleStepComplete} />
        )}
        {currentStep === 2 && (
          <ProfessionalInfoForm onComplete={handleStepComplete} />
        )}
        {currentStep > 2 && (
          <div className='flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-center text-slate-400'>
            Step {currentStep} content placeholder
          </div>
        )}
      </div>
    </div>
  );
};

