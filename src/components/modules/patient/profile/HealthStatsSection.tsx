import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import {
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
import { Textarea } from '@/components/ui/textarea';
import { BloodType } from '@/types/profile';

export const HealthStatsSection = () => {
  const { control } = useFormContext();

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>Chỉ số sức khỏe</h3>
          <p className='text-sm text-slate-500'>
            Lưu các chỉ số cơ bản để bác sĩ tham khảo nhanh.
          </p>
        </div>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-100'
        >
          Cập nhật định kỳ
        </Badge>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <FormField
          control={control}
          name='height'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between'>
                <FormLabel>Chiều cao</FormLabel>
                <span className='text-xs text-slate-400'>cm</span>
              </div>
              <FormControl>
                <Input
                  type='number'
                  placeholder='160'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='weight'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between'>
                <FormLabel>Cân nặng</FormLabel>
                <span className='text-xs text-slate-400'>kg</span>
              </div>
              <FormControl>
                <Input
                  type='number'
                  placeholder='52'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='bloodType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhóm máu</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn nhóm máu...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(BloodType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='smoking'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hút thuốc / Uống rượu</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value === 'true')}
                defaultValue={field.value ? 'true' : 'false'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='false'>
                    Không hút thuốc, thỉnh thoảng uống rượu
                  </SelectItem>
                  <SelectItem value='true'>Có sử dụng thường xuyên</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='md:col-span-2'>
          <FormField
            control={control}
            name='allergies'
            render={({ field }) => (
              <FormItem>
                <div className='flex justify-between'>
                  <FormLabel>Dị ứng (nếu có)</FormLabel>
                  <span className='text-xs text-slate-400'>
                    Thuốc, thức ăn, môi trường...
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    placeholder='Ví dụ: Dị ứng penicillin, hải sản, phấn hoa...'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='md:col-span-2'>
          <FormField
            control={control}
            name='chronicDiseases'
            render={({ field }) => (
              <FormItem>
                <div className='flex justify-between'>
                  <FormLabel>Bệnh lý mạn tính</FormLabel>
                  <span className='text-xs text-slate-400'>
                    Tăng huyết áp, đái tháo đường...
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    placeholder='Ghi rõ các bệnh mạn tính đang điều trị (nếu có)...'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
