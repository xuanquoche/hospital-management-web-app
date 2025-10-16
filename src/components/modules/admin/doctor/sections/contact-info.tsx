'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function ContactInfo({ form }: { form: any }) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('profileImage', file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-semibold'>Contact Information</h2>
      <div className='flex flex-col items-start gap-4'>
        <Label className='text-sm font-medium'>Profile Image</Label>
        <div
          onClick={handleImageClick}
          className='relative w-24 h-24 rounded-full overflow-hidden border bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition'
        >
          {preview ? (
            <Image
              src={preview}
              alt='Profile Preview'
              fill
              className='object-cover'
            />
          ) : (
            <div className='flex flex-col items-center justify-center text-gray-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-8 h-8 mb-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 16a4 4 0 108 0m-4-4a4 4 0 100-8 4 4 0 000 8z'
                />
              </svg>
              <span className='text-xs'>Upload</span>
            </div>
          )}
        </div>
        <Input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          onChange={handleImageChange}
          className='hidden'
        />
      </div>

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
