import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { profileSchema, ProfileFormValues } from '@/types/profile';

import { ContactSettingsSection } from './ContactSettingsSection';
import { HealthStatsSection } from './HealthStatsSection';
import { PersonalInfoSection } from './PersonalInfoSection';

interface EditProfileModalProps {
  children: React.ReactNode;
}

export const EditProfileModal = ({ children }: EditProfileModalProps) => {
  const [open, setOpen] = React.useState(false);

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
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-4xl h-[90vh] flex flex-col p-0 gap-0'>
        <DialogHeader className='p-6 border-b border-slate-100'>
          <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
        </DialogHeader>

        <div className='flex-1 p-6 bg-slate-50/50 overflow-y-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <PersonalInfoSection />
              <HealthStatsSection />
              <ContactSettingsSection />

              <div className='flex justify-end gap-4 pt-4'>
                <Button
                  type='button'
                  variant='ghost'
                  onClick={() => setOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  type='submit'
                  className='bg-teal-600 hover:bg-teal-700 text-white'
                >
                  Lưu thay đổi
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
