'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function ContactInfo({ form }: { form: any }) {
  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-semibold'>Contact Information</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          <Label className='mb-2'>Name</Label>
          <Input {...form.register('name')} placeholder='Name' />
        </div>
        <div>
          <Label className='mb-2'>Username</Label>
          <Input {...form.register('username')} placeholder='Username' />
        </div>
        <div>
          <Label className='mb-2'>Phone Number</Label>
          <Input {...form.register('phone')} placeholder='Phone' />
        </div>
        <div>
          <Label className='mb-2'>Email Address</Label>
          <Input {...form.register('email')} placeholder='Email' />
        </div>
        <div>
          <Label className='mb-2'>Date of Birth</Label>
          <Input type='date' {...form.register('dob')} />
        </div>
        <div>
          <Label className='mb-2'>Years of Experience</Label>
          <Input type='number' {...form.register('experience')} />
        </div>
        <div>
          <Label className='mb-2'>Department</Label>
          <Input {...form.register('department')} placeholder='Department' />
        </div>
        <div>
          <Label className='mb-2'>Designation</Label>
          <Input {...form.register('designation')} placeholder='Designation' />
        </div>
        <div>
          <Label className='mb-2'>Medical License Number</Label>
          <Input {...form.register('license')} placeholder='License' />
        </div>
        <div>
          <Label className='mb-2'>Feature on Website</Label>
          <Switch />
        </div>
      </div>
    </div>
  );
}
