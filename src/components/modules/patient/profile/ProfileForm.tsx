'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { profileSchema, ProfileFormValues } from '@/types/profile';

import { ContactSettingsSection } from './ContactSettingsSection';
import { HealthStatsSection } from './HealthStatsSection';
import { PersonalInfoSection } from './PersonalInfoSection';
import { ProfileHeader } from './ProfileHeader';
import { ProfileSidebar } from './ProfileSidebar';

export const ProfileForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'Nguyễn Minh Anh',
      gender: 'female',
      dateOfBirth: new Date('1995-03-12'),
      idNumber: '079195001234',
      address: 'Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      insuranceType: 'bhyt',
      insuranceNumber: 'DN479023456789',
      height: 160,
      weight: 52,
      bloodType: 'O',
      smoking: false,
      phone: '0912 345 678',
      email: 'minh.anh@example.com',
      notificationSms: true,
      notificationEmail: true,
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
    toast.success('Cập nhật hồ sơ thành công!');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <ProfileHeader />

        <div className='grid grid-cols-1 xl:grid-cols-12 gap-8'>
          <div className='xl:col-span-8 space-y-8'>
            <PersonalInfoSection />
            <HealthStatsSection />
            <ContactSettingsSection />

            <div className='flex justify-end gap-4 pt-4'>
              <Button type='button' variant='ghost' className='text-slate-500'>
                Hủy thay đổi
              </Button>
              <Button
                type='submit'
                className='bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-200'
              >
                Lưu thay đổi hồ sơ
              </Button>
            </div>
          </div>

          <div className='xl:col-span-4'>
            <ProfileSidebar />
          </div>
        </div>
      </form>
    </Form>
  );
};
