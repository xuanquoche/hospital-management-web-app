'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useMe } from '@/hooks/use-me';
import { profileSchema, ProfileFormValues } from '@/types/profile';

import { ContactSettingsSection } from './ContactSettingsSection';
import { HealthStatsSection } from './HealthStatsSection';
import { PersonalInfoSection } from './PersonalInfoSection';
import { ProfileHeader } from './ProfileHeader';
import { ProfileSidebar } from './ProfileSidebar';

export const ProfileForm = () => {
  const { user, profile, loading } = useMe();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      gender: 'other',
      dateOfBirth: new Date(),
      idNumber: '',
      address: '',
      insuranceType: '',
      insuranceNumber: '',
      height: 0,
      weight: 0,
      bloodType: '',
      smoking: false,
      phone: '',
      email: '',
      notificationSms: false,
      notificationEmail: false,
    },
  });

  useEffect(() => {
    if (user && profile) {
      form.reset({
        fullName: user.fullName || '',
        gender: (profile.gender?.toLowerCase() as any) || 'other',
        dateOfBirth: profile.dateOfBirth
          ? new Date(profile.dateOfBirth)
          : new Date(),
        idNumber: '', // API doesn't return idNumber yet
        address: user.address || '',
        insuranceType: 'bhyt', // Default
        insuranceNumber: profile.healthInsuranceNumber || '',
        height: profile.height || 0,
        weight: profile.weight || 0,
        bloodType: profile.bloodType || '',
        smoking: false,
        allergies: profile.allergies || '',
        chronicDiseases: '',
        phone: user.phone || '',
        email: user.email || '',
        notificationSms: true,
        notificationEmail: true,
      });
    }
  }, [user, profile, form]);

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
