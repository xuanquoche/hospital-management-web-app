'use client'

import React from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DoctorFilters from './DoctorFilters';
import DoctorTable from './DoctorTable';
import { useRouter } from 'next/navigation';
import { PRIVATE_ROUTES } from '@/const/routes';

const DoctorList = () => {
  const router = useRouter();

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
          <Button className='bg-teal-600 hover:bg-teal-700 ' onClick={() => router.push(PRIVATE_ROUTES.ADMIN_DOCTOR_CREATE)}>
            <Plus className='mr-2 h-4 w-4' />
            Create Doctor
          </Button>
        </div>
      </div>

      <DoctorFilters />
      <DoctorTable />
    </div>
  );
};

export default DoctorList;
