import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const ProfileHeader = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='flex items-start gap-4'>
        <Avatar className='h-16 w-16 border-2 border-white shadow-sm'>
          <AvatarImage src='https://github.com/shadcn.png' alt='User' />
          <AvatarFallback>NM</AvatarFallback>
        </Avatar>

        <div className='space-y-1'>
          <h2 className='text-xl font-bold text-slate-900'>Nguyễn Minh Anh</h2>
          <p className='text-sm text-slate-500'>Mã bệnh nhân: BN-20458</p>

          <div className='flex gap-2 mt-2'>
            <Badge
              variant='secondary'
              className='bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              Nữ
            </Badge>
            <Badge
              variant='secondary'
              className='bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-100'
            >
              Sinh 12/03/1995
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
