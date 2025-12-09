import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

export const DoctorCreationHeader = () => {
  const router = useRouter();

  return (
    <div className='mb-6 flex items-start justify-between'>
      <div>
        <h1 className='text-2xl font-bold text-slate-900'>Create Doctor</h1>
        <p className='text-slate-500'>
          Add a new doctor profile with personal details.
        </p>
      </div>
      <Button
        variant='ghost'
        className='text-slate-500 hover:text-slate-700'
        onClick={() => router.back()}
      >
        <X className='mr-2 h-4 w-4' />
        Cancel and go back
      </Button>
    </div>
  );
};
