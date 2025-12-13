'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { CreateCategoryForm } from '@/components/modules/admin-medicines/CreateCategoryForm';
import { Button } from '@/components/ui/button';
import { PRIVATE_ROUTES } from '@/const/routes';
import { clientFetcher } from '@/lib/fetcher';

const createCategorySchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên danh mục'),
  code: z.string().min(1, 'Vui lòng nhập mã danh mục'),
  description: z.string().min(1, 'Vui lòng nhập mô tả'),
  isActive: z.boolean(),
});

type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;

export default function CreateCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      isActive: true,
    },
  });

  const onSubmit = async (data: CreateCategoryFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await clientFetcher.post(
        '/admin/medicine-categories',
        data
      );

      if (response.success) {
        toast.success('Tạo danh mục thành công');
        router.push(PRIVATE_ROUTES.ADMIN_MEDICINES);
      } else {
        toast.error(response.message || 'Có lỗi xảy ra khi tạo danh mục');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Có lỗi xảy ra khi tạo danh mục');
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
            <h1 className='text-xl font-bold text-slate-800'>
              Tạo danh mục thuốc mới
            </h1>
            <p className='text-sm text-muted-foreground'>
              Thêm danh mục thuốc mới vào hệ thống
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
              {isSubmitting ? 'Đang xử lý...' : 'Tạo danh mục'}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className='grid flex-1 grid-cols-1 gap-6'>
          <CreateCategoryForm />
        </div>
      </form>
    </FormProvider>
  );
}
