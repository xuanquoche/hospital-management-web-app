'use client';

import { Filter } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { PatientModal } from './patient-modal';

interface Props {
  total: number;
}

export function PatientHeader({ total }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold'>Patient Grid</h2>
          <span className='text-sm text-muted-foreground'>
            Total Patients:{' '}
            <span className='ml-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full'>
              {total}
            </span>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline'>
            <Filter className='w-4 h-4 mr-2' /> Filter
          </Button>
          <Button onClick={() => setOpen(true)}>+ New Patient</Button>
        </div>
      </div>

      <PatientModal open={open} onOpenChange={setOpen} />
    </>
  );
}
