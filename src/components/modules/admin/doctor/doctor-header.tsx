'use client';

import { Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PRIVATE_ROUTES } from '@/const/routes';

export function DoctorHeader() {
  const router = useRouter();
  return (
    <div className='flex items-center justify-between mb-6'>
      <div className='flex justify-center items-center gap-3'>
        <h2 className='text-xl font-semibold'>Doctor Grid</h2>
        <p className='text-sm p-2 border border-blue-700 rounded-xl text-blue-400'>
          Total Doctors: <span className='font-medium'>565</span>
        </p>
      </div>
      <div className='flex gap-2'>
        <Button variant='outline' size='sm'>
          <Filter className='w-4 h-4 mr-2' /> Filter
        </Button>
        <Button
          size='sm'
          className='bg-primary text-white'
          onClick={() => router.push(PRIVATE_ROUTES.CREATE_DOCTOR)}
        >
          + New Doctor
        </Button>
      </div>
    </div>
  );
}
