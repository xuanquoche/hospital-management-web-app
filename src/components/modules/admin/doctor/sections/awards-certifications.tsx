'use client';

import { useFieldArray } from 'react-hook-form';

import { AwardRow } from '@/components/modules/admin/doctor/sub/award-row';
import { Button } from '@/components/ui/button';

export function AwardsCertifications({ control }: { control: any }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'awards',
  });

  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-semibold'>Awards & Certifications</h2>
      <div className='space-y-2'>
        {fields.map((field, index) => (
          <AwardRow
            key={field.id}
            index={index}
            remove={remove}
            control={control}
          />
        ))}

        <Button
          size='sm'
          variant='outline'
          type='button'
          onClick={() => append({ name: '', date: '' }, { shouldFocus: false })}
        >
          + Add Award
        </Button>
      </div>
    </div>
  );
}
