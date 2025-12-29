'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useMe, ProfileData } from '@/hooks/use-me';
import { clientFetcher } from '@/lib/fetcher';
import {
  profileSchema,
  ProfileFormValues,
  HealthInsuranceType,
} from '@/types/profile';

import { ContactSettingsSection } from './ContactSettingsSection';
import { HealthStatsSection } from './HealthStatsSection';
import { PersonalInfoSection } from './PersonalInfoSection';
import { ProfileHeader } from './ProfileHeader';
import { ProfileSidebar } from './ProfileSidebar';

// Type guard to check if profile is ProfileData
const isProfileData = (profile: any): profile is ProfileData => {
  return profile && 'gender' in profile;
};

export const ProfileForm = () => {
  const { user, profile, refetch } = useMe();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      gender: 'other',
      dateOfBirth: new Date(),
      idNumber: '',
      address: '',
      insuranceType: HealthInsuranceType.BHYT,
      insuranceNumber: '',
      height: 0,
      weight: 0,
      bloodType: '',
      smoking: false,
      phone: '',
      email: '',
      emergencyContact: '',
      notificationSms: false,
      notificationEmail: false,
    },
  });

  useEffect(() => {
    if (user && profile) {
      form.reset({
        fullName: user.fullName || '',
        gender:
          (isProfileData(profile) && (profile.gender?.toLowerCase() as any)) ||
          'other',
        dateOfBirth:
          isProfileData(profile) && profile.dateOfBirth
            ? new Date(profile.dateOfBirth)
            : new Date(),
        idNumber: isProfileData(profile) ? profile.identityNumber || '' : '',
        address: user.address || '',
        insuranceType: HealthInsuranceType.BHYT, // Default
        insuranceNumber: isProfileData(profile)
          ? profile.healthInsuranceNumber || ''
          : '',
        height: isProfileData(profile) ? profile.height || 0 : 0,
        weight: isProfileData(profile) ? profile.weight || 0 : 0,
        bloodType: isProfileData(profile) ? profile.bloodType || '' : '',
        smoking: false,
        allergies: isProfileData(profile) ? profile.allergies || '' : '',
        chronicDiseases: isProfileData(profile)
          ? profile.chronicDisease || ''
          : '',
        phone: user.phone || '',
        email: user.email || '',
        emergencyContact: isProfileData(profile)
          ? profile.emergencyContact || ''
          : '',
        notificationSms: true,
        notificationEmail: true,
      });
    }
  }, [user, profile, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const payload = {
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        avatar: user?.avatar || '', // Preserve existing avatar
        height: data.height,
        weight: data.weight,
        bloodType: data.bloodType,
        allergies: data.allergies,
        dateOfBirth: format(data.dateOfBirth, 'yyyy-MM-dd'),
        gender: data.gender.toUpperCase(),
        healthInsuranceNumber: data.insuranceNumber,
        emergencyContact: data.emergencyContact,
        identityNumber: data.idNumber,
        chronicDisease: data.chronicDiseases,
      };

      const response = await clientFetcher.patch('/patients/me', payload);

      if (response.success) {
        toast.success('Cập nhật hồ sơ thành công!');
        refetch();
      } else {
        toast.error(response.message || 'Cập nhật hồ sơ thất bại');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Có lỗi xảy ra khi cập nhật hồ sơ');
    }
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
