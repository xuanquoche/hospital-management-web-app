'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  profileImage: z.any().optional(),
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  phone: z.string().nonempty('Phone number is required'),
  email: z.string().email('Invalid email address'),
  primaryDoctor: z.string().optional(),
  dob: z.string().nonempty('Date of birth is required'),
  gender: z.string().nonempty('Gender is required'),
  bloodGroup: z.string().nonempty('Blood group is required'),
  status: z.string().nonempty('Status is required'),

  // 🏠 Address Information
  address1: z.string().optional(),
  address2: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
});

export function CreatePatientForm({ onClose }: { onClose?: () => void }) {
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      primaryDoctor: '',
      dob: '',
      gender: '',
      bloodGroup: '',
      status: '',
      address1: '',
      address2: '',
      country: '',
      city: '',
      state: '',
      pincode: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Patient data:', data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
      <Card className='p-6 space-y-8'>
        {/* 🧍 Patient Information */}
        <section>
          <h3 className='text-base font-semibold mb-3'>Patient Information</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* Profile Image */}
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

            <div>
              <Label className='mb-2'>First Name *</Label>
              <Input
                {...form.register('firstName')}
                placeholder='Enter first name'
              />
              {form.formState.errors.firstName && (
                <p className='text-red-500 text-xs mt-1'>
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Label className='mb-2'>Last Name *</Label>
              <Input
                {...form.register('lastName')}
                placeholder='Enter last name'
              />
              {form.formState.errors.lastName && (
                <p className='text-red-500 text-xs mt-1'>
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <Label className='mb-2'>Phone Number *</Label>
              <Input
                {...form.register('phone')}
                placeholder='+1 000-000-0000'
              />
            </div>

            <div>
              <Label className='mb-2'>Email Address *</Label>
              <Input
                {...form.register('email')}
                placeholder='example@email.com'
              />
            </div>

            <div>
              <Label className='mb-2'>Primary Doctor</Label>
              <Input
                {...form.register('primaryDoctor')}
                placeholder='Doctor name'
              />
            </div>

            <div>
              <Label className='mb-2'>DOB *</Label>
              <Input type='date' {...form.register('dob')} />
            </div>

            <div>
              <Label className='mb-2'>Gender *</Label>
              <Select
                onValueChange={(v) => form.setValue('gender', v)}
                defaultValue={form.watch('gender')}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='male'>Male</SelectItem>
                  <SelectItem value='female'>Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='mb-2'>Blood Group *</Label>
              <Select
                onValueChange={(v) => form.setValue('bloodGroup', v)}
                defaultValue={form.watch('bloodGroup')}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='a+'>A+</SelectItem>
                  <SelectItem value='b+'>B+</SelectItem>
                  <SelectItem value='o+'>O+</SelectItem>
                  <SelectItem value='ab+'>AB+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='mb-2'>Status *</Label>
              <Select
                onValueChange={(v) => form.setValue('status', v)}
                defaultValue={form.watch('status')}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='inactive'>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <Separator />

        {/* 🏠 Address Information */}
        <section>
          <h3 className='text-base font-semibold mb-3'>Address Information</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div>
              <Label className='mb-2'>Address 1</Label>
              <Input
                {...form.register('address1')}
                placeholder='Address line 1'
              />
            </div>

            <div>
              <Label className='mb-2'>Address 2</Label>
              <Input
                {...form.register('address2')}
                placeholder='Address line 2'
              />
            </div>

            <div>
              <Label className='mb-2'>Country</Label>
              <Input
                {...form.register('country')}
                placeholder='Enter country'
              />
            </div>

            <div>
              <Label className='mb-2'>City</Label>
              <Input {...form.register('city')} placeholder='Enter city' />
            </div>

            <div>
              <Label className='mb-2'>State</Label>
              <Input {...form.register('state')} placeholder='Enter state' />
            </div>

            <div>
              <Label className='mb-2'>Pincode</Label>
              <Input
                {...form.register('pincode')}
                placeholder='Enter pincode'
              />
            </div>
          </div>
        </section>
      </Card>

      <div className='flex justify-end gap-2'>
        <Button type='button' variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button type='submit'>Add New Patient</Button>
      </div>
    </form>
  );
}
