'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AddressInfo({ form }: { form: any }) {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-4'>Address Information</h2>
      <Label className='mb-2'>Address</Label>
      <Input {...form.register('address')} placeholder='Enter address' />
    </div>
  );
}
