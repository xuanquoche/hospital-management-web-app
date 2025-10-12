'use client';
import { useFieldArray } from 'react-hook-form';

import { EducationRow } from '@/components/modules/admin/doctor/sub/education-row';
import { Button } from '@/components/ui/button';

export function EducationInfo({ control }: { control: any }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
  });

  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-semibold'>Educational Information</h2>
      <div className='space-y-2'>
        {fields.map((field, index) => (
          <EducationRow
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
          onClick={() =>
            append(
              { degree: '', university: '', from: '', to: '' },
              { shouldFocus: false }
            )
          }
        >
          + Add Education
        </Button>
      </div>
    </div>
  );
}
