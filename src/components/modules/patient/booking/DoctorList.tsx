'use client';

import React, { useEffect, useState } from 'react';

import { clientFetcher } from '@/lib/fetcher';
import { Doctor } from '@/types/doctor';

import { DoctorCard, DoctorProps } from './DoctorCard';

interface DoctorListProps {
  selectedDoctorId?: string | number | null;
  onSelectDoctor?: (doctor: Doctor) => void;
}

export const DoctorList = ({
  selectedDoctorId,
  onSelectDoctor,
}: DoctorListProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectingId, setSelectingId] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await clientFetcher.get('/doctors');
        if (response.data) {
          setDoctors(response.data);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSelectDoctor = async (doctor: Doctor) => {
    try {
      setSelectingId(doctor.id);
      const response = await clientFetcher.get(`/doctors/${doctor.id}`);
      if (response.data) {
        onSelectDoctor?.(response.data);
      } else {
        // Fallback if API fails or returns empty, though unlikely if list exists
        onSelectDoctor?.(doctor);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      // Fallback to existing data
      onSelectDoctor?.(doctor);
    } finally {
      setSelectingId(null);
    }
  };

  if (loading) {
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
        {doctors.map((doctor) => {
          const doctorProps: DoctorProps = {
            id: doctor.id,
            name: doctor.user.fullName,
            specialty: doctor.primarySpecialty?.name || 'General',
            experience: `${doctor.yearsOfExperience} years experience`,
            location: doctor.user.address || 'Main Hospital',
            availability: 'Check availability',
            slots:
              doctor.schedules?.reduce(
                (acc, s) => acc + s.timeSlots.length,
                0
              ) || 0,
            tags: [],
            image: doctor.image || '/images/doctor.png',
            isFemale: false,
          };

          const isSelected = selectedDoctorId === doctor.id;
          const isSelecting = selectingId === doctor.id;

          return (
            <DoctorCard
              key={doctor.id}
              doctor={doctorProps}
              isSelected={isSelected}
              onSelect={() => handleSelectDoctor(doctor)}
            />
          );
        })}
      </div>
    </div>
  );
};
