'use client';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AwardRow() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 items-end'>
      <Input placeholder='Award Name' />
      <Input type='date' />
      <Button variant='ghost' size='icon'>
        <Trash2 className='text-red-500 w-4 h-4' />
      </Button>
    </div>
  );
}
