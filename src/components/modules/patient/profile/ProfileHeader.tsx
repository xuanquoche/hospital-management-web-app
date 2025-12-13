import { format } from 'date-fns';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProfileFormValues } from '@/types/profile';

export const ProfileHeader = () => {
  const { watch } = useFormContext<ProfileFormValues>();
  const values = watch();

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='flex items-start gap-4'>
        <Avatar className='h-16 w-16 border-2 border-white shadow-sm'>
          <AvatarImage src='https://github.com/shadcn.png' alt='User' />
          <AvatarFallback>
            {values.fullName ? values.fullName.charAt(0).toUpperCase() : 'U'}
          </AvatarFallback>
        </Avatar>

        <div className='space-y-1'>
          <h2 className='text-xl font-bold text-slate-900'>
            {values.fullName || 'User'}
          </h2>
          <p className='text-sm text-slate-500'>
            Mã bệnh nhân: {values.idNumber || '---'}
          </p>

          <div className='flex gap-2 mt-2'>
            <Badge
              variant='secondary'
              className='bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              {values.gender === 'male'
                ? 'Nam'
                : values.gender === 'female'
                  ? 'Nữ'
                  : 'Khác'}
            </Badge>
            <Badge
              variant='secondary'
              className='bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-100'
            >
              Sinh{' '}
              {values.dateOfBirth
                ? format(values.dateOfBirth, 'dd/MM/yyyy')
                : '---'}
            </Badge>
            <Badge
              variant='secondary'
              className='bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100'
            >
              Thành viên từ 2021
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
