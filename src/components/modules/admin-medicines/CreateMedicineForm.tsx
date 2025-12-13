'use client';

import { useEffect, useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { clientFetcher } from '@/lib/fetcher';
import { CreateMedicineDto, Category, MedicineUnit } from '@/types/medicine';

export function CreateMedicineForm() {
  const { control } = useFormContext<CreateMedicineDto>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await clientFetcher.get('/admin/medicine-categories');
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='rounded-xl border bg-white p-6 shadow-sm'>
      <h3 className='mb-4 font-semibold'>Thông tin thuốc</h3>
      <p className='mb-6 text-xs text-muted-foreground'>
        Khai báo thông tin thuốc mới
      </p>

      <div className='grid gap-6'>
        {/* Row 1: Name, Code */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên thuốc <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='VD: Paracetamol 500mg' {...field} />
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
                  Mã thuốc <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='VD: PARA500' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 2: Active Ingredient, Category */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={control}
            name='activeIngredient'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Hoạt chất <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='VD: Paracetamol' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Danh mục <span className='text-red-500'>*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn danh mục' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 3: Unit, Dosage, Manufacturer */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <FormField
            control={control}
            name='unit'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Đơn vị tính <span className='text-red-500'>*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn đơn vị' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(MedicineUnit).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
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
            name='dosage'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Hàm lượng <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='VD: 500mg' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='manufacturer'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nhà sản xuất <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='VD: Dược Hậu Giang' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 4: Low Stock Threshold */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={control}
            name='lowStockThreshold'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mức cảnh báo sắp hết hàng</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='VD: 100'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
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
                  placeholder='Mô tả chi tiết về thuốc'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={control}
            name='requiresPrescription'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Thuốc kê đơn</FormLabel>
                  <FormDescription>
                    Thuốc này yêu cầu phải có đơn thuốc của bác sĩ
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
                    Thuốc này sẽ được hiển thị trong hệ thống
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
    </div>
  );
}
