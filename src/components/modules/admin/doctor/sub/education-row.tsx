'use client';

import { Trash2 } from 'lucide-react';
import { memo } from 'react';
import { Controller, Control } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EducationRowProps {
  control: Control<any>;
  index: number;
  remove: (index: number) => void;
}

export const EducationRow = memo(function EducationRow({
  control,
  index,
  remove,
}: EducationRowProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-5 gap-3 items-end'>
      <Controller
        name={`educations.${index}.degree`}
        control={control}
        render={({ field }) => <Input {...field} placeholder='Degree' />}
      />
      <Controller
        name={`educations.${index}.university`}
        control={control}
        render={({ field }) => <Input {...field} placeholder='University' />}
      />
      <Controller
        name={`educations.${index}.from`}
        control={control}
        render={({ field }) => <Input type='date' {...field} />}
      />
      <Controller
        name={`educations.${index}.to`}
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
});
