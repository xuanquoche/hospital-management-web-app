import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const ContactSettingsSection = () => {
  const { control } = useFormContext();

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>Cài đặt liên hệ</h3>
        <p className='text-sm text-slate-500'>
          Quản lý cách bệnh viện liên lạc với bạn.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <FormField
          control={control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại chính</FormLabel>
              <FormControl>
                <Input placeholder='(+84) 912 345 678' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email chính</FormLabel>
              <FormControl>
                <Input placeholder='minh.anh@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='emergencyContact'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại khẩn cấp</FormLabel>
              <FormControl>
                <Input placeholder='(+84) 987 654 321' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='md:col-span-2 space-y-4'>
          <FormField
            control={control}
            name='notificationSms'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600'
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel className='text-sm font-normal text-slate-600'>
                    Nhận thông báo lịch hẹn và kết quả khám qua SMS.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='notificationEmail'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600'
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel className='text-sm font-normal text-slate-600'>
                    Nhận thông báo và tài liệu chăm sóc sức khỏe qua email.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
