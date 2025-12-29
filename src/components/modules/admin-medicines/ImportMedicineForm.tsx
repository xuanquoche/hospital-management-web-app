'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { clientFetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';
import { Category, Medicine, CreateMedicineBatchDto } from '@/types/medicine';

interface ImportMedicineFormProps {
  readOnly?: boolean;
}

export function ImportMedicineForm({ readOnly }: ImportMedicineFormProps) {
  const { control, setValue, watch } = useFormContext<CreateMedicineBatchDto>();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingMedicines, setLoadingMedicines] = useState(true);

  const selectedCategoryId = watch('categoryId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicinesRes, categoriesRes] = await Promise.all([
          clientFetcher.get('/admin/medicines'),
          clientFetcher.get('/admin/medicine-categories'),
        ]);

        if (medicinesRes.success) {
          setMedicines(medicinesRes.data);
        }
        if (categoriesRes.success) {
          setCategories(categoriesRes.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingMedicines(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setValue('categoryId', categoryId);
    setValue('medicineId', ''); // Reset medicine when category changes
  };

  const handleMedicineChange = (medicineId: string) => {
    setValue('medicineId', medicineId);
  };

  const filteredMedicines = selectedCategoryId
    ? medicines.filter((m) => m.categoryId === selectedCategoryId)
    : [];

  return (
    <div className='rounded-xl border bg-white p-6 shadow-sm'>
      <h3 className='mb-4 font-semibold'>Thông tin thuốc & lô</h3>
      <p className='mb-6 text-xs text-muted-foreground'>
        Chọn thuốc và khai báo thông tin lô nhập kho
      </p>

      <div className='grid gap-6'>
        {/* Row 1: Category, Medicine and Batch Number */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <div>
            <FormField
              control={control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Danh mục <span className='text-red-500'>*</span>
                  </FormLabel>
                  <Select
                    onValueChange={handleCategoryChange}
                    value={field.value}
                    disabled={readOnly}
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
          <div>
            <FormField
              control={control}
              name='medicineId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Thuốc <span className='text-red-500'>*</span>
                  </FormLabel>
                  <Select
                    onValueChange={handleMedicineChange}
                    value={field.value}
                    disabled={readOnly || !selectedCategoryId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            selectedCategoryId
                              ? 'Chọn thuốc'
                              : 'Vui lòng chọn danh mục trước'
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredMedicines.map((medicine) => (
                        <SelectItem key={medicine.id} value={medicine.id}>
                          {medicine.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={control}
              name='batchNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mã lô <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='VD: BATCH-2025-01'
                      {...field}
                      disabled={readOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Row 2: Quantity, Unit, Unit Price */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <FormField
            control={control}
            name='quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Số lượng <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='VD: 500'
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === '' ? 0 : Number(value));
                    }}
                    disabled={readOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Đơn vị</FormLabel>
            <FormControl>
              <Input
                placeholder='Viên, hộp, chai...'
                disabled
                value='(Theo thuốc)'
              />
            </FormControl>
          </FormItem>
          <FormField
            control={control}
            name='unitPrice'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Giá nhập / đơn vị <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='VD: 5.000'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={readOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 3: Selling Price, Expiry Date, Manufacture Date */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <FormField
            control={control}
            name='sellingPrice'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Giá bán / đơn vị <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='VD: 8.000'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={readOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='expiryDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>
                  Hạn sử dụng <span className='text-red-500'>*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                        disabled={readOnly}
                      >
                        {field.value ? (
                          format(new Date(field.value), 'dd/MM/yyyy')
                        ) : (
                          <span>DD/MM/YYYY</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) => date < new Date('1900-01-01')}
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
            name='manufactureDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>
                  Ngày sản xuất <span className='text-red-500'>*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                        disabled={readOnly}
                      >
                        {field.value ? (
                          format(new Date(field.value), 'dd/MM/yyyy')
                        ) : (
                          <span>DD/MM/YYYY</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
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
        </div>

        {/* Row 4: Manufacturer, Supplier */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={control}
            name='manufacturer'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nhà sản xuất <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Tên hãng sản xuất'
                    {...field}
                    disabled={readOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='supplier'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nhà cung cấp <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Tên đơn vị cung cấp'
                    {...field}
                    disabled={readOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 5: Notes */}
        <FormField
          control={control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú (nếu có)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Nhập ghi chú nội bộ cho lô thuốc này'
                  className='resize-none'
                  {...field}
                  disabled={readOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
