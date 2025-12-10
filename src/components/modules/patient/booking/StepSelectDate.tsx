'use client';

import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface StepSelectDateProps {
  selectedDoctor: any;
}

const timeSlots = {
  morning: ['08:00 - 08:30', '09:30 - 10:00', '10:00 - 10:30', '11:00 - 11:30'],
  afternoon: ['14:00 - 14:30', '15:00 - 15:30', '16:00 - 16:30'],
  evening: ['18:00 - 18:30', '19:00 - 19:30'],
};

export const StepSelectDate = ({ selectedDoctor }: StepSelectDateProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('09:30 - 10:00');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='grid grid-cols-1 gap-6 lg:grid-cols-12'
    >
      {/* Left Column: Calendar & Time */}
      <div className='space-y-6 lg:col-span-8'>
        {/* Calendar Section */}
        <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
          <div className='mb-4'>
            <h3 className='text-lg font-bold text-slate-900'>Chọn ngày khám</h3>
            <p className='text-sm text-slate-500'>
              Lịch khả dụng của {selectedDoctor?.name}
            </p>
          </div>

          <div className='flex justify-center'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              className='rounded-md border w-[80%]'
              classNames={{
                day_selected:
                  'bg-teal-600 text-white hover:bg-teal-600 hover:text-white focus:bg-teal-600 focus:text-white',
                day_today: 'bg-slate-100 text-slate-900',
              }}
            />
          </div>
        </div>

        {/* Time Slots Section */}
        <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='font-bold text-slate-900'>Chọn khung giờ</h3>
            <span className='text-sm font-medium text-slate-900'>
              {date ? format(date, 'EEEE, dd/MM/yyyy', { locale: vi }) : ''}
            </span>
          </div>
          <p className='mb-6 text-sm text-slate-500'>
            Khung giờ trống trong ngày
          </p>

          <div className='space-y-4'>
            <div>
              <h4 className='mb-3 text-sm font-medium text-slate-700'>
                Buổi sáng
              </h4>
              <div className='flex flex-wrap gap-3'>
                {timeSlots.morning.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className='mb-3 text-sm font-medium text-slate-700'>
                Buổi chiều
              </h4>
              <div className='flex flex-wrap gap-3'>
                {timeSlots.afternoon.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className='mb-3 text-sm font-medium text-slate-700'>
                Buổi tối
              </h4>
              <div className='flex flex-wrap gap-3'>
                {timeSlots.evening.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Summary & Notes */}
      <div className='space-y-6 lg:col-span-4'>
        {/* Doctor Info Card */}
        <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='font-bold text-slate-900'>Bác sĩ & cơ sở khám</h3>
            <button className='text-xs font-medium text-slate-400 hover:text-teal-600'>
              Thay đổi
            </button>
          </div>
          <p className='mb-4 text-xs text-slate-500'>
            Thông tin được chọn từ Bước 1.
          </p>

          <div className='flex items-start gap-3'>
            <Avatar className='h-12 w-12 border border-slate-100'>
              <AvatarImage src={selectedDoctor?.image} />
              <AvatarFallback className='bg-teal-50 text-teal-700'>
                {selectedDoctor?.name.split(' ').pop()?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className='font-bold text-slate-900 text-sm'>
                {selectedDoctor?.name}
              </h4>
              <p className='text-xs text-slate-500 mb-1'>
                {selectedDoctor?.specialty} • {selectedDoctor?.experience}
              </p>
              <div className='flex flex-wrap gap-1'>
                <Badge
                  variant='secondary'
                  className='bg-slate-100 text-[10px] text-slate-600 h-5 px-1.5'
                >
                  {selectedDoctor?.location}
                </Badge>
                <Badge
                  variant='secondary'
                  className='bg-teal-50 text-[10px] text-teal-700 h-5 px-1.5'
                >
                  Phòng khám số 302
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Summary */}
        <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
          <div className='mb-4'>
            <h3 className='font-bold text-slate-900'>Tóm tắt lịch hẹn</h3>
            <p className='text-xs text-slate-500'>
              Kiểm tra lại trước khi sang Bước 3.
            </p>
          </div>

          <div className='space-y-3 text-sm'>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Bác sĩ</span>
              <span className='font-medium text-slate-900 text-right'>
                {selectedDoctor?.name}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Chuyên khoa</span>
              <span className='font-medium text-slate-900 text-right'>
                {selectedDoctor?.specialty}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Ngày khám</span>
              <span className='font-medium text-slate-900 text-right'>
                {date
                  ? format(date, 'dd/MM/yyyy', { locale: vi })
                  : 'Chưa chọn'}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Khung giờ</span>
              <span className='font-bold text-slate-900 text-right'>
                {selectedTime}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Hình thức</span>
              <span className='font-medium text-slate-900 text-right'>
                Khám trực tiếp tại cơ sở
              </span>
            </div>
          </div>
        </div>

        {/* Notes Input */}
        <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
          <div className='mb-4'>
            <h3 className='font-bold text-slate-900'>Triệu chứng & ghi chú</h3>
            <p className='text-xs text-slate-500'>
              Giúp bác sĩ chuẩn bị trước cho buổi khám.
            </p>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Label className='text-sm font-medium text-slate-700'>
                  Triệu chứng chính
                </Label>
                <span className='text-xs text-slate-400'>
                  Ví dụ: sốt nhẹ, ho khan...
                </span>
              </div>
              <Textarea
                placeholder='Mô tả ngắn các triệu chứng mà bạn đang gặp...'
                className='min-h-[80px] resize-none border-slate-200 focus-visible:ring-teal-500'
              />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between'>
                <Label className='text-sm font-medium text-slate-700'>
                  Ghi chú cho bác sĩ
                </Label>
                <span className='text-xs text-slate-400'>Không bắt buộc</span>
              </div>
              <Textarea
                placeholder='Thêm thông tin về tiền sử bệnh, thuốc đang dùng...'
                className='min-h-[80px] resize-none border-slate-200 focus-visible:ring-teal-500'
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
