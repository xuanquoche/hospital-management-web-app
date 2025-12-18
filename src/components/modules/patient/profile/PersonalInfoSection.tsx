import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { HealthInsuranceType } from '@/types/profile';

export const PersonalInfoSection = () => {
  const { control } = useFormContext();

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>
            Thông tin cá nhân
          </h3>
          <p className='text-sm text-slate-500'>
            Chỉnh sửa thông tin cơ bản được dùng trong tất cả cuộc hẹn.
          </p>
        </div>
        <Button
          variant='ghost'
          className='text-teal-600 hover:text-teal-700 hover:bg-teal-50'
        >
          Đặt lại
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <FormField
          control={control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder='Nhập họ và tên' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giới tính</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn giới tính' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='male'>Nam</SelectItem>
                  <SelectItem value='female'>Nữ</SelectItem>
                  <SelectItem value='other'>Khác</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='dateOfBirth'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Ngày sinh</FormLabel>
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
                        <span>Chọn ngày sinh</span>
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
                      date > new Date() || date < new Date('1900-01-01')
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
          control={control}
          name='idNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số CMND / CCCD</FormLabel>
              <FormControl>
                <Input placeholder='Nhập số CMND / CCCD' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='md:col-span-2'>
          <FormField
            control={control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ hiện tại</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name='insuranceType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bảo hiểm y tế</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn loại bảo hiểm' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={HealthInsuranceType.BHYT}>
                    BHYT - Bảo hiểm y tế nhà nước
                  </SelectItem>
                  <SelectItem value={HealthInsuranceType.PRIVATE}>
                    Bảo hiểm tư nhân
                  </SelectItem>
                  <SelectItem value={HealthInsuranceType.NONE}>
                    Không có
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='insuranceNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã số thẻ BHYT</FormLabel>
              <FormControl>
                <Input placeholder='Nhập mã số thẻ bảo hiểm...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
