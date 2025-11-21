'use client';

import React, { useState } from 'react';
import { DoctorCreationHeader } from './DoctorCreationHeader';
import { DoctorCreationSteps } from './DoctorCreationSteps';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ProfessionalInfoForm } from './ProfessionalInfoForm';
import { EducationInfoForm } from './EducationInfoForm';
import { AwardsInfoForm } from './AwardsInfoForm';
import { CertificationsInfoForm } from './CertificationsInfoForm';
import { DoctorCreationComplete } from './DoctorCreationComplete';

export const CreateDoctorMain = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const handleStepComplete = () => {
    const nextStep = currentStep + 1;
    if (nextStep > 5) {
      // All steps completed
      setIsComplete(true);
    } else {
      if (nextStep > maxStep) {
        setMaxStep(nextStep);
      }
      setCurrentStep(nextStep);
    }
  };

  // If completed, show completion screen
  if (isComplete) {
    return (
      <div className='flex min-h-screen flex-col bg-slate-50 p-6'>
        <DoctorCreationComplete />
      </div>
    );
  }

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
        {currentStep === 3 && (
          <EducationInfoForm onComplete={handleStepComplete} />
        )}
        {currentStep === 4 && (
          <AwardsInfoForm onComplete={handleStepComplete} />
        )}
        {currentStep === 5 && (
          <CertificationsInfoForm onComplete={handleStepComplete} />
        )}
      </div>
    </div>
  );
};
