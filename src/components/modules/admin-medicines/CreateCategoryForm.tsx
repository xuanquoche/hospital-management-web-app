'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { CreateCategoryDto } from '@/types/medicine';

export function CreateCategoryForm() {
  const { control } = useFormContext<CreateCategoryDto>();

  return (
    <div className='rounded-xl border bg-white p-6 shadow-sm'>
      <h3 className='mb-4 font-semibold'>Thông tin danh mục</h3>
      <p className='mb-6 text-xs text-muted-foreground'>
        Khai báo thông tin danh mục thuốc mới
      </p>

      <div className='grid gap-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên danh mục <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='VD: Kháng sinh' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Mã danh mục <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='VD: ANTIBIOTICS' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Mô tả chi tiết về danh mục thuốc'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='isActive'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>
                  Trạng thái hoạt động
                </FormLabel>
                <FormDescription>
                  Danh mục này sẽ được hiển thị trong hệ thống
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
