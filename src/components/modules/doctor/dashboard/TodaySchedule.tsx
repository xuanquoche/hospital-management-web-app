import { Play } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Appointment } from './data';

interface TodayScheduleProps {
  appointments: Appointment[];
}

export const TodaySchedule = ({ appointments }: TodayScheduleProps) => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>Today's Schedule</h3>
          <p className='text-sm text-slate-500'>
            Danh sách ca khám hôm nay (sắp xếp theo giờ).
          </p>
        </div>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          Thứ 3 · 05/08/2025
        </Badge>
      </div>

      <div className='space-y-4'>
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className={cn(
              'p-4 rounded-xl border transition-all',
              apt.status === 'in-progress'
                ? 'bg-teal-50 border-teal-200 ring-1 ring-teal-200'
                : 'bg-slate-50 border-slate-100 hover:border-teal-100'
            )}
          >
            <div className='flex justify-between items-start'>
              <div className='flex gap-4'>
                <div className='min-w-[60px]'>
                  <p
                    className={cn(
                      'font-bold text-lg',
                      apt.status === 'in-progress'
                        ? 'text-teal-700'
                        : 'text-slate-900'
                    )}
                  >
                    {apt.time}
                  </p>
                  <p className='text-xs text-slate-500'>{apt.duration}</p>
                </div>

                <div>
                  <h4 className='font-bold text-slate-900'>
                    {apt.patientName}
                  </h4>
                  <p className='text-sm text-slate-500 mb-2'>
                    {apt.type === 'offline' ? 'Khám trực tiếp' : 'Video call'} ·{' '}
                    {apt.room} · Mã BN: {apt.patientId}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {apt.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant='outline'
                        className='bg-white text-slate-600 border-slate-200 font-normal text-[10px] h-5'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-end gap-2'>
                {apt.status === 'completed' && (
                  <Badge className='bg-slate-200 text-slate-600 hover:bg-slate-300 border-none'>
                    Đã hoàn thành
                  </Badge>
                )}
                {apt.status === 'in-progress' && (
                  <Badge className='bg-teal-100 text-teal-700 hover:bg-teal-200 border-none animate-pulse'>
                    Đang khám
                  </Badge>
                )}
                {apt.status === 'waiting' && (
                  <Badge className='bg-orange-100 text-orange-700 hover:bg-orange-200 border-none'>
                    Đang chờ
                  </Badge>
                )}

                {apt.status === 'in-progress' && (
                  <Button
                    size='sm'
                    variant='outline'
                    className='h-7 text-xs bg-white border-teal-200 text-teal-700 hover:bg-teal-50'
                  >
                    Theo dõi tăng huyết áp
                  </Button>
                )}
                {apt.status === 'waiting' && apt.type === 'online' && (
                  <Button
                    size='sm'
                    variant='outline'
                    className='h-7 text-xs bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  >
                    Tư vấn kết quả xét nghiệm máu
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-6 pt-4 border-t border-slate-100 flex justify-between items-center'>
        <span className='text-sm text-slate-500'>Xem tất cả 8 ca</span>
        <Button className='bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-200'>
          <Play className='w-4 h-4 mr-2' />
          Bắt đầu ca tiếp theo
        </Button>
      </div>
    </div>
  );
};
