import React from 'react';

import { clientFetcher } from '@/lib/fetcher';
import { AIDoctorInfo, AIRecommendation } from '@/types/ai-booking';
import { Doctor } from '@/types/doctor';

import { DoctorCard, DoctorProps } from './DoctorCard';

interface DoctorListProps {
  selectedDoctorId?: string | number | null;
  onSelectDoctor?: (doctor: Doctor | AIDoctorInfo) => void;
  doctors?: (Doctor | AIRecommendation)[];
  isLoading?: boolean;
}

export const DoctorList = ({
  selectedDoctorId,
  onSelectDoctor,
  doctors = [],
  isLoading = false,
}: DoctorListProps) => {
  const handleSelectDoctor = async (item: Doctor | AIRecommendation) => {
    // If it's already a Doctor object (has 'user' property), just select it
    if ('user' in item) {
      onSelectDoctor?.(item);
      return;
    }

    // Otherwise it is AIRecommendation, try to fetch full doctor details
    try {
      const response = await clientFetcher.get(`/doctors/${item.doctor.id}`);
      if (response.data) {
        onSelectDoctor?.(response.data);
      } else {
        // Fallback: pass the AIDoctorInfo part if fetch fails/empty
        onSelectDoctor?.(item.doctor);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      // Fallback: pass the AIDoctorInfo part
      onSelectDoctor?.(item.doctor);
    }
  };
  console.log('doctor in doctorlist', doctors);
  if (isLoading) {
    return <div className='p-6 text-center'>Loading doctors...</div>;
  }

  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>Select Doctor</h3>
          <p className='text-slate-500'>
            List of doctors based on selected specialty.
          </p>
        </div>
        <button className='text-sm font-medium text-slate-500 hover:text-teal-600'>
          Sort
        </button>
      </div>

      <div className='space-y-4'>
        {doctors.length === 0 ? (
          <div className='text-center py-8 text-slate-500'>
            No doctors found.
          </div>
        ) : (
          doctors.map((item) => {
            let doctorProps: DoctorProps;
            let doctorId: string | number;

            if ('user' in item) {
              // It's a Doctor
              doctorId = item.id;
              doctorProps = {
                id: item.id,
                name: item.user.fullName,
                specialty: item.primarySpecialty?.name || 'General',
                experience: `${item.yearsOfExperience} years experience`,
                location: item.user.address || 'Main Hospital',
                availability: 'Check availability',
                slots:
                  item.schedules?.reduce(
                    (acc, s) => acc + s.timeSlots.length,
                    0
                  ) || 0,
                tags: [],
                image: item.image || '/images/doctor.png',
                isFemale: false,
              };
            } else {
              // It's an AIRecommendation
              doctorId = item.doctor.id;
              doctorProps = {
                id: item.doctor.id,
                name: item.doctor.fullName,
                specialty: item.doctor.specialty,
                experience: `${item.doctor.yearsOfExperience} years experience`,
                location: 'Hospital', // Fallback
                availability: 'Check availability',
                slots: item.availableSlots.length,
                tags: ['Recommended'], // Highlight it's an AI recommendation
                image: item.doctor.avatar || '/images/doctor.png',
                isFemale: false,
              };
            }

            const isSelected = selectedDoctorId === doctorId;

            return (
              <DoctorCard
                key={doctorId}
                doctor={doctorProps}
                isSelected={isSelected}
                onSelect={() => handleSelectDoctor(item)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
