import { Bell, Calendar, Search, ChevronDown } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export const DashboardHeader = () => {
  return (
    <div className='bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between mb-6'>
      <div className='flex items-center gap-3'>
        <h1 className='text-lg font-bold text-slate-900'>
          Xin chào, BS. Trần Quốc Huy
        </h1>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal'
        >
          Bác sĩ Nội tổng quát
        </Badge>
      </div>

      <div className='flex items-center gap-6 flex-1 justify-end'>
        <div className='relative w-full max-w-md hidden md:block'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
          <Input
            placeholder='Tìm bệnh nhân, mã hồ sơ, lịch hẹn...'
            className='pl-9 bg-slate-50 border-slate-100 focus-visible:ring-teal-500'
          />
        </div>

        <div className='flex items-center gap-4'>
          <button className='text-slate-500 hover:text-teal-600 transition-colors'>
            <Bell className='w-5 h-5' />
          </button>
          <div className='flex items-center gap-2 text-slate-500 hover:text-teal-600 cursor-pointer transition-colors'>
            <Calendar className='w-5 h-5' />
            <span className='text-sm font-medium hidden lg:inline'>
              Lịch làm việc
            </span>
          </div>

          <div className='h-8 w-[1px] bg-slate-200 mx-2'></div>

          <div className='flex items-center gap-3 cursor-pointer'>
            <Avatar className='h-9 w-9 border border-slate-200'>
              <AvatarImage src='https://github.com/shadcn.png' alt='Doctor' />
              <AvatarFallback>QH</AvatarFallback>
            </Avatar>
            <div className='hidden lg:block text-left'>
              <p className='text-sm font-bold text-slate-900'>
                BS. Trần Quốc Huy
              </p>
              <p className='text-xs text-slate-500'>Mã: DR-10245</p>
            </div>
            <ChevronDown className='w-4 h-4 text-slate-400 hidden lg:block' />
          </div>
        </div>
      </div>
    </div>
  );
};
