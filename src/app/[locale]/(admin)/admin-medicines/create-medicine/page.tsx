'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { CreateMedicineForm } from '@/components/modules/admin-medicines/CreateMedicineForm';
import { Button } from '@/components/ui/button';
import { PRIVATE_ROUTES } from '@/const/routes';
import { clientFetcher } from '@/lib/fetcher';

const createMedicineSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên thuốc'),
  code: z.string().min(1, 'Vui lòng nhập mã thuốc'),
  activeIngredient: z.string().min(1, 'Vui lòng nhập hoạt chất'),
  description: z.string().min(1, 'Vui lòng nhập mô tả'),
  unit: z.string().min(1, 'Vui lòng nhập đơn vị tính'),
  dosage: z.string().min(1, 'Vui lòng nhập hàm lượng'),
  manufacturer: z.string().min(1, 'Vui lòng nhập nhà sản xuất'),
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục'),
  lowStockThreshold: z.number().min(0, 'Mức cảnh báo phải lớn hơn hoặc bằng 0'),
  requiresPrescription: z.boolean(),
  isActive: z.boolean(),
});

type CreateMedicineFormValues = z.infer<typeof createMedicineSchema>;

export default function CreateMedicinePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<CreateMedicineFormValues>({
    resolver: zodResolver(createMedicineSchema),
    defaultValues: {
      name: '',
      code: '',
      activeIngredient: '',
      description: '',
      unit: '',
      dosage: '',
      manufacturer: '',
      categoryId: '',
      lowStockThreshold: 0,
      requiresPrescription: false,
      isActive: true,
    },
  });

  const onSubmit = async (data: CreateMedicineFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await clientFetcher.post('/admin/medicines', data);

      if (response.success) {
        toast.success('Tạo thuốc thành công');
        router.push(PRIVATE_ROUTES.ADMIN_MEDICINES);
      } else {
        toast.error(response.message || 'Có lỗi xảy ra khi tạo thuốc');
      }
    } catch (error) {
      console.error('Error creating medicine:', error);
      toast.error('Có lỗi xảy ra khi tạo thuốc');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='flex h-[calc(100vh-100px)] flex-col gap-6'
      >
        {/* Header */}
        <div className='flex items-center justify-between rounded-xl bg-white p-6 shadow-sm'>
          <div>
            <h1 className='text-xl font-bold text-slate-800'>Tạo thuốc mới</h1>
            <p className='text-sm text-muted-foreground'>
              Thêm thuốc mới vào hệ thống
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Button
              type='button'
              variant='ghost'
              className='text-muted-foreground hover:text-slate-800'
              onClick={() => router.push(PRIVATE_ROUTES.ADMIN_MEDICINES)}
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Quay lại kho thuốc
            </Button>
            <Button
              type='submit'
              className='bg-emerald-600 hover:bg-emerald-700'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Tạo thuốc'}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className='grid flex-1 grid-cols-1 gap-6'>
          <CreateMedicineForm />
        </div>
      </form>
    </FormProvider>
  );
}
