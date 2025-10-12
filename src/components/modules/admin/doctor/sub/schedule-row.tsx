'use client';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ScheduleRow() {
  return (
    <div className='flex flex-wrap items-center gap-3'>
      <select className='border rounded-md px-2 py-1'>
        <option>Monday</option>
        <option>Tuesday</option>
      </select>
      <Input type='time' className='w-36' />
      <Input type='time' className='w-36' />
      <Button variant='ghost' size='icon'>
        <Trash2 className='w-4 h-4 text-red-500' />
      </Button>
    </div>
  );
}
