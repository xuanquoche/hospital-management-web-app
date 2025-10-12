'use client';
import { AwardRow } from '@/components/modules/admin/doctor/sub/award-row';
import { Button } from '@/components/ui/button';

export function AwardsCertifications({ form }: { form: any }) {
  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-semibold'>Awards & Certifications</h2>
      <AwardRow />
      <Button size='sm' variant='outline'>
        + Add Award
      </Button>
    </div>
  );
}
