import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Doctor } from './DoctorTable';
import { clientFetcher } from '@/lib/fetcher';
import { toast } from 'react-toastify';

const timeSlotSchema = z.object({
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  examinationType: z.enum(['IN_PERSON', 'ONLINE', 'HOME_VISIT']),
  maxPatients: z.number().min(1, 'Max patients must be at least 1'),
});

const formSchema = z.object({
  dateRangeType: z.enum(['specific', 'weekly', 'custom']),
  startDate: z.date(),
  endDate: z.date(),
  daysOfWeek: z.array(z.string()).min(1, 'Select at least one day'),
  timezone: z.string(),
  timeSlots: z.array(timeSlotSchema).min(1, 'Add at least one time slot'),
});

type ScheduleFormValues = z.infer<typeof formSchema>;

interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

const DAYS = [
  { label: 'Thứ 2', value: 'MONDAY' },
  { label: 'Thứ 3', value: 'TUESDAY' },
  { label: 'Thứ 4', value: 'WEDNESDAY' },
  { label: 'Thứ 5', value: 'THURSDAY' },
  { label: 'Thứ 6', value: 'FRIDAY' },
  { label: 'Thứ 7', value: 'SATURDAY' },
  { label: 'CN', value: 'SUNDAY' },
];

export const CreateScheduleModal: React.FC<CreateScheduleModalProps> = ({
  isOpen,
  onClose,
  doctor,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRangeType: 'custom',
      daysOfWeek: [],
      timezone: 'Asia/Ho_Chi_Minh',
      timeSlots: [
        {
          startTime: '08:00',
          endTime: '12:00',
          examinationType: 'IN_PERSON',
          maxPatients: 10,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'timeSlots',
  });

  const onSubmit = async (values: ScheduleFormValues) => {
    if (!doctor) return;

    setIsLoading(true);
    try {
      // Expand time slots for each selected day
      const expandedTimeSlots = values.daysOfWeek.flatMap((day) =>
        values.timeSlots.map((slot) => ({
          dayOfWeek: day,
          startTime: slot.startTime,
          endTime: slot.endTime,
          examinationType: slot.examinationType,
          maxPatients: slot.maxPatients,
        }))
      );

      const payload = {
        doctorId: doctor.id,
        startDate: format(values.startDate, 'yyyy-MM-dd'),
        endDate: format(values.endDate, 'yyyy-MM-dd'),
        daysOfWeek: values.daysOfWeek,
        timezone: values.timezone,
        isActive: true,
        timeSlots: expandedTimeSlots,
      };

      await clientFetcher.post('/admin/doctor-schedules', payload);
      toast.success('Schedule created successfully');
      onClose();
    } catch (error) {
      console.error('Error creating schedule:', error);
      toast.error('Failed to create schedule');
    } finally {
      setIsLoading(false);
    }
  };

  const watchDays = form.watch('daysOfWeek');
  const watchStartDate = form.watch('startDate');
  const watchEndDate = form.watch('endDate');
  const watchTimeSlots = form.watch('timeSlots');

  return (
    <div className="w-[70%]">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-[80vw] w-[100%] p-0 gap-0 overflow-hidden'>
          <div className='flex h-[80vh]'>
            {/* Left Panel - Form */}
            <div className='flex-1 overflow-y-auto p-6'>
              <DialogHeader className='mb-6'>
                <div className='flex items-center justify-between'>
                  <DialogTitle className='text-xl font-bold'>
                    Thêm khung giờ làm việc
                  </DialogTitle>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                  <span className='inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700'>
                    {doctor?.user.fullName} • {doctor?.primarySpecialty?.name}
                  </span>
                </div>
                <p className='text-sm text-slate-500 mt-1'>
                  Áp dụng cho khoảng ngày tùy chỉnh · Bệnh nhân sẽ chỉ thấy các khung giờ đã lưu.
                </p>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                  {/* Scope Section */}
                  <div className='space-y-4'>
                    <h3 className='font-semibold text-slate-900'>Phạm vi áp dụng</h3>
                    
                    <div className='flex gap-2'>
                      {/* Simplified for now, focusing on Custom Range as per image */}
                      <Button type='button' variant='outline' className='bg-teal-600 text-white hover:bg-teal-700 hover:text-white border-transparent'>
                          Khoảng ngày tùy chỉnh
                      </Button>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <FormField
                        control={form.control}
                        name='startDate'
                        render={({ field }) => (
                          <FormItem className='flex flex-col'>
                            <FormLabel>Từ ngày</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={'outline'}
                                    className={cn(
                                      'w-full pl-3 text-left font-normal',
                                      !field.value && 'text-muted-foreground'
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, 'dd/MM/yyyy')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className='w-auto p-0' align='start'>
                                <Calendar
                                  mode='single'
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='endDate'
                        render={({ field }) => (
                          <FormItem className='flex flex-col'>
                            <FormLabel>Đến ngày</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={'outline'}
                                    className={cn(
                                      'w-full pl-3 text-left font-normal',
                                      !field.value && 'text-muted-foreground'
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, 'dd/MM/yyyy')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className='w-auto p-0' align='start'>
                                <Calendar
                                  mode='single'
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormLabel className='mb-2 block'>Áp dụng cho các ngày trong tuần</FormLabel>
                      <div className='flex flex-wrap gap-2'>
                        {DAYS.map((day) => (
                          <FormField
                            key={day.value}
                            control={form.control}
                            name='daysOfWeek'
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={day.value}
                                  className='flex flex-row items-start space-x-3 space-y-0'
                                >
                                  <FormControl>
                                    <div
                                      className={cn(
                                        'cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors border',
                                        field.value?.includes(day.value)
                                          ? 'bg-teal-50 border-teal-200 text-teal-700'
                                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                      )}
                                      onClick={() => {
                                        const newValue = field.value?.includes(day.value)
                                          ? field.value.filter((v) => v !== day.value)
                                          : [...(field.value || []), day.value];
                                        field.onChange(newValue);
                                      }}
                                    >
                                      {day.label}
                                    </div>
                                  </FormControl>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage>{form.formState.errors.daysOfWeek?.message}</FormMessage>
                    </div>
                  </div>

                  {/* Time Slots Section */}
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-semibold text-slate-900'>Thiết lập khung giờ</h3>
                      <div className='flex items-center gap-2 text-sm text-slate-500'>
                        <span>Múi giờ</span>
                        <span className='font-medium text-slate-900'>GMT+7 · Asia/Ho Chi Minh</span>
                      </div>
                    </div>

                    <div className='space-y-3'>
                      <div className='grid grid-cols-12 gap-4 text-xs font-medium text-slate-500 mb-2'>
                          <div className='col-span-3'>Bắt đầu</div>
                          <div className='col-span-3'>Kết thúc</div>
                          <div className='col-span-3'>Loại ca khám</div>
                          <div className='col-span-2'>Số slot</div>
                          <div className='col-span-1'></div>
                      </div>
                      
                      {fields.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-12 gap-4 items-center'>
                          <div className='col-span-3'>
                            <FormField
                              control={form.control}
                              name={`timeSlots.${index}.startTime`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input type='time' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='col-span-3'>
                            <FormField
                              control={form.control}
                              name={`timeSlots.${index}.endTime`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input type='time' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='col-span-3'>
                            <FormField
                              control={form.control}
                              name={`timeSlots.${index}.examinationType`}
                              render={({ field }) => (
                                <FormItem>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder='Select type' />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value='IN_PERSON'>Khám trực tiếp</SelectItem>
                                      <SelectItem value='ONLINE'>Khám Online</SelectItem>
                                      <SelectItem value='HOME_VISIT'>Khám tại nhà</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='col-span-2'>
                            <FormField
                              control={form.control}
                              name={`timeSlots.${index}.maxPatients`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                        <Input 
                                          type='number' 
                                          {...field} 
                                          className="pr-8" 
                                          onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">bệnh nhân</span>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='col-span-1 flex justify-end'>
                            <Button
                              type='button'
                              variant='ghost'
                              size='icon'
                              className='text-slate-400 hover:text-red-500'
                              onClick={() => remove(index)}
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      type='button'
                      variant='ghost'
                      className='text-teal-600 hover:text-teal-700 hover:bg-teal-50 pl-0'
                      onClick={() =>
                        append({
                          startTime: '',
                          endTime: '',
                          examinationType: 'IN_PERSON',
                          maxPatients: 10,
                        })
                      }
                    >
                      <Plus className='mr-2 h-4 w-4' />
                      Thêm khung giờ khác
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            {/* Right Panel - Summary */}
            <div className=' bg-teal-50/50 p-6 border-l border-slate-100 overflow-y-auto'>
              <h3 className='font-semibold text-teal-900 mb-4'>Tổng quan lịch trong khoảng</h3>
              
              <div className='bg-white rounded-lg p-4 shadow-sm mb-4'>
                  <div className='flex items-start justify-between mb-2'>
                      <span className='text-sm font-medium text-slate-900'>Lịch làm việc</span>
                  </div>
                  <p className='text-xs text-slate-500 mb-1'>
                      {watchStartDate ? format(watchStartDate, 'dd/MM/yyyy') : '...'} - {watchEndDate ? format(watchEndDate, 'dd/MM/yyyy') : '...'}
                  </p>
                  <p className='text-xs text-slate-500'>
                      Áp dụng cho: {watchDays && watchDays.length > 0 ? watchDays.map(d => DAYS.find(day => day.value === d)?.label).join(', ') : 'Chưa chọn ngày'}
                  </p>
              </div>

              <div className='space-y-3'>
                  {watchTimeSlots.map((slot, idx) => (
                      <div key={idx} className='flex items-start justify-between'>
                          <div>
                              <p className='text-sm font-bold text-slate-900'>{slot.startTime} - {slot.endTime}</p>
                              <p className='text-xs text-slate-500'>
                                  {slot.examinationType === 'IN_PERSON' ? 'Khám trực tiếp' : slot.examinationType === 'ONLINE' ? 'Khám Online' : 'Khám tại nhà'} · {slot.maxPatients} slot / ngày
                              </p>
                          </div>
                          <span className='text-xs font-medium bg-white px-2 py-1 rounded border border-slate-200'>
                              {parseInt(slot.startTime) < 12 ? 'Ca sáng' : 'Ca chiều'}
                          </span>
                      </div>
                  ))}
              </div>

              <div className='mt-6 pt-6 border-t border-teal-100'>
                  <h4 className='font-semibold text-teal-900 mb-2'>Tổng cộng (mỗi ngày)</h4>
                  <p className='text-sm text-slate-600'>
                      {watchTimeSlots.reduce((acc, curr) => acc + Number(curr.maxPatients || 0), 0)} slot / ngày
                  </p>
              </div>
              
              <div className='mt-8 text-xs text-slate-500'>
                  <p className='mb-2'>Thay đổi trong màn hình này sẽ chỉ áp dụng cho các lịch hẹn mới được tạo trong khoảng ngày đã chọn.</p>
                  <p>Bạn có thể sao chép khung giờ này sang các ngày khác sau khi lưu.</p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className='border-t border-slate-100 p-4 bg-white flex items-center justify-between'>
              <div className='text-sm text-slate-500'>
                  <p className='font-medium text-slate-900'>Chưa lưu khung giờ mới</p>
                  <p>Nhấn "Save time slots" để áp dụng.</p>
              </div>
              <div className='flex items-center gap-3'>
                  <Button variant='ghost' onClick={onClose}>Hủy</Button>
                  <Button variant='outline' className='bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100'>Lưu dưới dạng bản nháp</Button>
                  <Button className='bg-teal-600 hover:bg-teal-700' onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save time slots'}
                  </Button>
              </div>
          </div>
        </DialogContent>
    </Dialog>
    </div>
  );
};
