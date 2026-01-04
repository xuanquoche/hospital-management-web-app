'use client';

import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppointmentStore } from '@/store/use-appointment-store';
import { AIDoctorInfo } from '@/types/ai-booking';
import { Doctor } from '@/types/doctor';

interface StepSelectDateProps {
  selectedDoctor: Doctor | AIDoctorInfo | null;
}

export const StepSelectDate = ({ selectedDoctor }: StepSelectDateProps) => {
  const {
    selectedDate,
    selectedTime,
    timeSlotId,
    examinationType,
    symptoms,
    notes,
    setSelectedDate,
    setSelectedTime,
    setTimeSlotId,
    setExaminationType,
    setSymptoms,
    setNotes,
  } = useAppointmentStore();

  // Get time slots for the selected date

  // Get time slots for the selected date

  // console.log('selectedDoctor: ', selectedDoctor?.schedules);
  const availableTimeSlots = useMemo(() => {
    // Check if selectedDoctor is null or doesn't have schedules
    if (
      !selectedDoctor ||
      !('schedules' in selectedDoctor) ||
      !selectedDoctor.schedules ||
      !selectedDate
    )
      return [];

    const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');

    // Find all schedules that cover the selected date
    const validSchedules = selectedDoctor.schedules.filter((s) => {
      const startDate = new Date(s.startDate);
      const endDate = new Date(s.endDate);
      // Reset hours to compare dates only
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      const targetDate = new Date(selectedDate);
      targetDate.setHours(0, 0, 0, 0);

      return targetDate >= startDate && targetDate <= endDate;
    });

    // Collect matching time slots from valid schedules
    const slots = validSchedules.flatMap((schedule) => {
      return schedule.timeSlots.filter((slot) => {
        return slot.availableDates?.includes(formattedSelectedDate);
      });
    });

    return slots;
  }, [selectedDoctor, selectedDate]);

  // Group time slots by period
  const groupedTimeSlots = useMemo(() => {
    const groups = {
      morning: [] as any[],
      afternoon: [] as any[],
      evening: [] as any[],
    };

    availableTimeSlots.forEach((slot) => {
      const hour = parseInt(slot.startTime.split(':')[0]);
      if (hour < 12) groups.morning.push(slot);
      else if (hour < 18) groups.afternoon.push(slot);
      else groups.evening.push(slot);
    });

    return groups;
  }, [availableTimeSlots]);

  const handleTimeSelect = (slot: any) => {
    setSelectedTime(`${slot.startTime} - ${slot.endTime}`);
    setTimeSlotId(slot.id);
    // Assuming examinationType comes from the slot or defaults to IN_PERSON
    setExaminationType(slot.examinationType || 'IN_PERSON');
  };

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
              Lịch khả dụng của{' '}
              {selectedDoctor
                ? 'user' in selectedDoctor
                  ? selectedDoctor.user?.fullName
                  : selectedDoctor.fullName
                : ''}
            </p>
          </div>

          <div className='flex justify-center'>
            <Calendar
              mode='single'
              selected={selectedDate || undefined}
              onSelect={(date) => setSelectedDate(date || null)}
              className='rounded-md border w-[80%]'
              classNames={{
                day_selected:
                  'bg-teal-600 text-white hover:bg-teal-600 hover:text-white focus:bg-teal-600 focus:text-white',
                day_today: 'bg-slate-100 text-slate-900',
              }}
              disabled={(date) => {
                // Disable dates not in availableDates
                // This is a simplified check. In a real app, you'd check against the full schedule logic.
                // For now, let's just disable past dates
                return date < new Date(new Date().setHours(0, 0, 0, 0));
              }}
            />
          </div>
        </div>

        {/* Time Slots Section */}
        <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='font-bold text-slate-900'>Chọn khung giờ</h3>
            <span className='text-sm font-medium text-slate-900'>
              {selectedDate
                ? format(selectedDate, 'EEEE, dd/MM/yyyy', { locale: vi })
                : ''}
            </span>
          </div>
          <p className='mb-6 text-sm text-slate-500'>
            Khung giờ trống trong ngày
          </p>

          {availableTimeSlots.length === 0 ? (
            <p className='text-center text-slate-500 py-4'>
              Không có lịch khám cho ngày này.
            </p>
          ) : (
            <div className='space-y-4'>
              {groupedTimeSlots.morning.length > 0 && (
                <div>
                  <h4 className='mb-3 text-sm font-medium text-slate-700'>
                    Buổi sáng
                  </h4>
                  <div className='flex flex-wrap gap-3'>
                    {groupedTimeSlots.morning.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => handleTimeSelect(slot)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                          timeSlotId === slot.id
                            ? 'bg-teal-600 text-white shadow-md'
                            : 'bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                        }`}
                      >
                        {slot.startTime} - {slot.endTime}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {groupedTimeSlots.afternoon.length > 0 && (
                <div>
                  <h4 className='mb-3 text-sm font-medium text-slate-700'>
                    Buổi chiều
                  </h4>
                  <div className='flex flex-wrap gap-3'>
                    {groupedTimeSlots.afternoon.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => handleTimeSelect(slot)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                          timeSlotId === slot.id
                            ? 'bg-teal-600 text-white shadow-md'
                            : 'bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                        }`}
                      >
                        {slot.startTime} - {slot.endTime}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {groupedTimeSlots.evening.length > 0 && (
                <div>
                  <h4 className='mb-3 text-sm font-medium text-slate-700'>
                    Buổi tối
                  </h4>
                  <div className='flex flex-wrap gap-3'>
                    {groupedTimeSlots.evening.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => handleTimeSelect(slot)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                          timeSlotId === slot.id
                            ? 'bg-teal-600 text-white shadow-md'
                            : 'bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                        }`}
                      >
                        {slot.startTime} - {slot.endTime}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
              <AvatarImage
                src={
                  selectedDoctor
                    ? 'user' in selectedDoctor
                      ? selectedDoctor.image
                      : (selectedDoctor as any).avatar
                    : undefined
                }
              />
              <AvatarFallback className='bg-teal-50 text-teal-700'>
                {selectedDoctor
                  ? ('user' in selectedDoctor
                      ? selectedDoctor.user?.fullName
                      : selectedDoctor.fullName
                    )
                      ?.split(' ')
                      .pop()
                      ?.charAt(0)
                  : ''}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className='font-bold text-slate-900 text-sm'>
                {selectedDoctor
                  ? 'user' in selectedDoctor
                    ? selectedDoctor.user?.fullName
                    : selectedDoctor.fullName
                  : ''}
              </h4>
              <p className='text-xs text-slate-500 mb-1'>
                {selectedDoctor
                  ? 'primarySpecialty' in selectedDoctor
                    ? selectedDoctor.primarySpecialty?.name
                    : selectedDoctor.specialty
                  : ''}
                {' • '}
                {selectedDoctor?.yearsOfExperience} years
              </p>
              <div className='flex flex-wrap gap-1'>
                <Badge
                  variant='secondary'
                  className='bg-slate-100 text-[10px] text-slate-600 h-5 px-1.5'
                >
                  {selectedDoctor
                    ? 'user' in selectedDoctor
                      ? selectedDoctor.user?.address
                      : 'Hospital'
                    : 'Hospital'}
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
                {selectedDoctor
                  ? 'user' in selectedDoctor
                    ? selectedDoctor.user?.fullName
                    : selectedDoctor.fullName
                  : ''}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Chuyên khoa</span>
              <span className='font-medium text-slate-900 text-right'>
                {selectedDoctor
                  ? 'primarySpecialty' in selectedDoctor
                    ? selectedDoctor.primarySpecialty?.name
                    : selectedDoctor.specialty
                  : ''}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Ngày khám</span>
              <span className='font-medium text-slate-900 text-right'>
                {selectedDate
                  ? format(selectedDate, 'dd/MM/yyyy', { locale: vi })
                  : 'Chưa chọn'}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Khung giờ</span>
              <span className='font-bold text-slate-900 text-right'>
                {selectedTime || 'Chưa chọn'}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-slate-500'>Hình thức</span>
              <span className='font-medium text-slate-900 text-right'>
                {examinationType === 'IN_PERSON'
                  ? 'Khám trực tiếp'
                  : 'Khám online'}
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
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
