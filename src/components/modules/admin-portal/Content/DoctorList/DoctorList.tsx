'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DoctorFilters from './DoctorFilters';
import DoctorTable, { Doctor } from './DoctorTable';
import { useRouter } from 'next/navigation';
import { PRIVATE_ROUTES } from '@/const/routes';
import { clientFetcher } from '@/lib/fetcher';
import { toast } from 'react-toastify';
import { CreateScheduleModal } from './CreateScheduleModal';

const DoctorList = () => {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyId, setSpecialtyId] = useState('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Schedule Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDoctorForSchedule, setSelectedDoctorForSchedule] =
    useState<Doctor | null>(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(searchQuery && { name: searchQuery }),
        ...(specialtyId && specialtyId !== 'all' && { specialtyId }),
      });

      const response = await clientFetcher.get(
        `/admin/doctors?${queryParams.toString()}`
      );
      if (response.data) {
        setDoctors(response.data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDoctors();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, specialtyId, page]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page on search
  };

  const handleSpecialtyChange = (value: string) => {
    setSpecialtyId(value);
    setPage(1);
  };

  const handleAddSchedule = (doctor: Doctor) => {
    setSelectedDoctorForSchedule(doctor);
    setIsScheduleModalOpen(true);
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-bold text-slate-900'>Doctors</h2>
          <p className='text-sm text-slate-500'>
            Manage doctor profiles, availability, and credentials.
          </p>
        </div>
        <div className='flex gap-3'>
          <Button
            variant='outline'
            className='border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-100 hover:text-teal-800'
          >
            <Calendar className='mr-2 h-4 w-4' />
            Schedule
          </Button>
          <Button
            className='bg-teal-600 hover:bg-teal-700 '
            onClick={() => router.push(PRIVATE_ROUTES.ADMIN_DOCTOR_CREATE)}
          >
            <Plus className='mr-2 h-4 w-4' />
            Create Doctor
          </Button>
        </div>
      </div>

      <DoctorFilters
        onSearch={handleSearch}
        onSpecialtyChange={handleSpecialtyChange}
      />
      <DoctorTable
        doctors={doctors}
        loading={loading}
        onAddSchedule={handleAddSchedule}
      />

      <CreateScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        doctor={selectedDoctorForSchedule}
      />
    </div>
  );
};

export default DoctorList;
