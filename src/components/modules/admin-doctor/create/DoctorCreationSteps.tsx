import React from 'react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  label: string;
}

const steps: Step[] = [
  { id: 1, label: 'Personal info' },
  { id: 2, label: 'Professional' },
  { id: 3, label: 'Education' },
  { id: 4, label: 'Awards' },
  { id: 5, label: 'Certifications' },
];

interface DoctorCreationStepsProps {
  currentStep: number;
  maxStep: number;
  onStepClick: (stepId: number) => void;
}

export const DoctorCreationSteps: React.FC<DoctorCreationStepsProps> = ({
  currentStep,
  maxStep,
  onStepClick,
}) => {
  return (
    <div className='w-64 shrink-0 space-y-1'>
      <div className='mb-4'>
        <h3 className='font-semibold text-slate-900'>Doctor profile setup</h3>
        <p className='text-sm text-slate-500'>
          Only basic personal information is required on this step.
        </p>
      </div>
      <nav className='flex flex-col space-y-1'>
        {steps.map((step) => {
          const isDisabled = step.id > maxStep;
          return (
            <button
              key={step.id}
              onClick={() => !isDisabled && onStepClick(step.id)}
              disabled={isDisabled}
              className={cn(
                'flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors w-full text-left',
                currentStep === step.id
                  ? 'bg-teal-600 text-white'
                  : isDisabled
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              <span
                className={cn(
                  'mr-3 flex h-6 w-6 items-center justify-center rounded text-xs font-bold',
                  currentStep === step.id
                    ? 'bg-white/20 text-white'
                    : isDisabled
                    ? 'bg-slate-100 text-slate-300'
                    : 'bg-slate-200 text-slate-600'
                )}
              >
                {step.id}
              </span>
              {step.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
