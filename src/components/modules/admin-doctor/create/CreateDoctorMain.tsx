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
import { clientFetcher } from '@/lib/fetcher';
import { toast } from 'react-toastify';

export interface DoctorFormData {
  email: string;
  username: string;
  phone: string;
  fullName: string;
  avatar: string;
  address: string;
  primarySpecialtyId: string;
  subSpecialty: string;
  professionalTitle: string;
  yearsOfExperience: number;
  consultationFee: number;
  bio: string;
  educations: {
    school: string;
    degree: string;
    graduationYear: number;
  }[];
  awards: {
    title: string;
    organization: string;
    year: number;
    description: string;
  }[];
  certifications: {
    certificateName: string;
    issuingAuthority: string;
    licenseNumber: string;
    issueDate: string;
    expiryDate: string;
    documentUrl: string;
  }[];
  status: 'ACTIVE' | 'INACTIVE';
}

const initialFormData: DoctorFormData = {
  email: '',
  username: '',
  phone: '',
  fullName: '',
  avatar: '',
  address: '',
  primarySpecialtyId: '',
  subSpecialty: '',
  professionalTitle: '',
  yearsOfExperience: 0,
  consultationFee: 0,
  bio: '',
  educations: [],
  awards: [],
  certifications: [],
  status: 'ACTIVE',
};

export const CreateDoctorMain = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState<DoctorFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateFormData = (data: Partial<DoctorFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleStepComplete = () => {
    const nextStep = currentStep + 1;
    if (nextStep > 5) {
      handleSubmit();
    } else {
      if (nextStep > maxStep) {
        setMaxStep(nextStep);
      }
      setCurrentStep(nextStep);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Ensure numeric values are numbers and dates are ISO strings
      const payload = {
        ...formData,
        yearsOfExperience: Number(formData.yearsOfExperience),
        consultationFee: Number(formData.consultationFee),
        educations: formData.educations.map((e) => ({
          ...e,
          graduationYear: Number(e.graduationYear),
        })),
        awards: formData.awards.map((a) => ({
          ...a,
          year: Number(a.year),
        })),
        certifications: formData.certifications.map((c) => ({
          ...c,
          issueDate: c.issueDate ? new Date(c.issueDate).toISOString() : '',
          expiryDate: c.expiryDate
            ? new Date(c.expiryDate).toISOString()
            : undefined,
        })),
      };

      await clientFetcher.post('/admin/doctors', payload);
      toast.success('Doctor created successfully');
      setIsComplete(true);
    } catch (error: any) {
      console.error('Error creating doctor:', error);
      toast.error(error.message || 'Failed to create doctor');
    } finally {
      setIsLoading(false);
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
          <PersonalInfoForm
            initialData={formData}
            onUpdate={handleUpdateFormData}
            onComplete={handleStepComplete}
          />
        )}
        {currentStep === 2 && (
          <ProfessionalInfoForm
            initialData={formData}
            onUpdate={handleUpdateFormData}
            onComplete={handleStepComplete}
          />
        )}
        {currentStep === 3 && (
          <EducationInfoForm
            initialData={formData}
            onUpdate={handleUpdateFormData}
            onComplete={handleStepComplete}
          />
        )}
        {currentStep === 4 && (
          <AwardsInfoForm
            initialData={formData}
            onUpdate={handleUpdateFormData}
            onComplete={handleStepComplete}
          />
        )}
        {currentStep === 5 && (
          <CertificationsInfoForm
            initialData={formData}
            onUpdate={handleUpdateFormData}
            onComplete={handleSubmit} // Final step calls submit directly
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
