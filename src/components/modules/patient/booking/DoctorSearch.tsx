'use client';

import { Search } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAppointmentStore } from '@/store/use-appointment-store';

const filters = ['Bác sĩ yêu thích', 'Bác sĩ nữ', 'Có lịch hôm nay', 'Bảo hiểm hỗ trợ'];

export const DoctorSearch = () => {
  const { symptoms, setSymptoms } = useAppointmentStore();

  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>Tìm kiếm bác sĩ</h3>
        <p className='text-slate-500'>Nhập tên bác sĩ hoặc triệu chứng bạn muốn khám.</p>
      </div>

      <div className='mb-6'>
        <div className='mb-2 flex justify-between text-sm'>
          <span className='font-medium text-slate-700'>Tìm kiếm</span>
          <span className='text-slate-400'>Ví dụ: "đau ngực", "BS. Lan"</span>
        </div>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
          <Input
            placeholder='Nhập từ khóa...'
            className='pl-9 border-slate-200 focus-visible:ring-teal-500'
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className='mb-3 flex justify-between text-sm'>
          <span className='font-medium text-slate-700'>Lọc nhanh</span>
          <span className='text-slate-400'>Chọn theo nhu cầu của bạn</span>
        </div>
        <div className='flex flex-wrap gap-2'>
          {filters.map((filter, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='cursor-pointer bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors'
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
