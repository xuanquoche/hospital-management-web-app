'use client';

import { Trash2 } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AwardRow({
  index,
  remove,
  control,
}: {
  index: number;
  remove: (index: number) => void;
  control: any;
}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 items-end'>
      <Controller
        name={`awards.${index}.name`}
        control={control}
        render={({ field }) => <Input {...field} placeholder='Award Name' />}
      />

      <Controller
        name={`awards.${index}.date`}
        control={control}
        render={({ field }) => <Input type='date' {...field} />}
      />

      <Button
        variant='ghost'
        size='icon'
        type='button'
        onClick={() => remove(index)}
      >
        <Trash2 className='text-red-500 w-4 h-4' />
      </Button>
    </div>
  );
}
