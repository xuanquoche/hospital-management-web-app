import { Clock, Play } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const WelcomeSection = () => {
  return (
    <div className='mb-6'>
      <div className='flex justify-between items-end mb-6'>
        <div>
          <h2 className='text-xl font-bold text-slate-900'>
            Trang chủ & Dashboard
          </h2>
          <p className='text-sm text-slate-500 mt-1'>
            Theo dõi lịch khám hôm nay và tình hình bệnh nhân trong ngày.
          </p>
        </div>
        <div className='flex items-center gap-2 text-slate-500 text-sm'>
          <Clock className='w-4 h-4' />
          <span>Toàn bộ lịch trong tuần</span>
        </div>
      </div>

      <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6'>
        <div className='flex-1'>
          <h3 className='text-lg font-bold text-slate-900 mb-2'>
            Lịch khám hôm nay của bạn
          </h3>
          <p className='text-sm text-slate-500 mb-4'>
            Bắt đầu ca làm việc lúc 08:00 · Phòng khám Nội tổng quát tầng 3.
          </p>
          <div className='flex gap-3'>
            <Badge
              variant='secondary'
              className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal py-1 px-3'
            >
              8 ca khám đã đặt
            </Badge>
            <Badge
              variant='secondary'
              className='bg-blue-50 text-blue-700 hover:bg-blue-100 font-normal py-1 px-3'
            >
              3 khám trực tiếp
            </Badge>
            <Badge
              variant='secondary'
              className='bg-purple-50 text-purple-700 hover:bg-purple-100 font-normal py-1 px-3'
            >
              5 khám từ xa (video)
            </Badge>
          </div>
        </div>

        <div className='bg-teal-50 rounded-xl p-4 w-full md:w-auto min-w-[300px] flex flex-col gap-4 border border-teal-100'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-sm font-bold text-slate-900'>
                Trạng thái hiện tại
              </p>
              <p className='text-xs text-slate-500 mt-1 max-w-[150px]'>
                Bệnh nhân đang chờ tiếp theo
              </p>
            </div>
            <Badge className='bg-blue-500 hover:bg-blue-600 text-white border-none'>
              09:30
            </Badge>
          </div>
          <Button className='w-full bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-200'>
            <Play className='w-4 h-4 mr-2' />
            Bắt đầu ca khám
          </Button>
        </div>
      </div>
    </div>
  );
};
