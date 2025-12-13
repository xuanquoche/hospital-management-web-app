'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { ImportMedicineForm } from '@/components/modules/admin-medicines/ImportMedicineForm';
import { ImportMedicineSidebar } from '@/components/modules/admin-medicines/ImportMedicineSidebar';
import { Button } from '@/components/ui/button';
import { PRIVATE_ROUTES } from '@/const/routes';
import { clientFetcher } from '@/lib/fetcher';
import { BatchStatus, CreateMedicineBatchDto } from '@/types/medicine';

const createBatchSchema = z.object({
  categoryId: z.string().min(1, 'Vui lòng chọn thuốc để có danh mục'),
  medicineId: z.string().min(1, 'Vui lòng chọn thuốc'),
  batchNumber: z.string().min(1, 'Vui lòng nhập mã lô'),
  quantity: z.number().min(1, 'Số lượng phải lớn hơn 0'),
  unitPrice: z.number().min(0, 'Giá nhập không được âm'),
  sellingPrice: z.number().min(0, 'Giá bán không được âm'),
  manufactureDate: z.string().min(1, 'Vui lòng chọn ngày sản xuất'),
  expiryDate: z.string().min(1, 'Vui lòng chọn hạn sử dụng'),
  manufacturer: z.string().min(1, 'Vui lòng nhập nhà sản xuất'),
  supplier: z.string().min(1, 'Vui lòng nhập nhà cung cấp'),
  status: z.nativeEnum(BatchStatus),
  notes: z.string().optional(),
});

type CreateBatchFormValues = z.infer<typeof createBatchSchema>;

export default function ImportMedicinePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const mode = searchParams.get('mode') as 'view' | 'edit' | null;
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const methods = useForm<CreateBatchFormValues>({
    resolver: zodResolver(createBatchSchema),
    defaultValues: {
      categoryId: '',
      medicineId: '',
      batchNumber: '',
      quantity: 0,
      unitPrice: 0,
      sellingPrice: 0,
      manufactureDate: '',
      expiryDate: '',
      manufacturer: '',
      supplier: '',
      status: BatchStatus.IN_STOCK,
      notes: '',
    },
  });

  useEffect(() => {
    if (id) {
      const fetchBatch = async () => {
        try {
          setLoading(true);
          const response = await clientFetcher.get(
            `/admin/medicine-batches/${id}`
          );
          if (response.success && response.data) {
            const batch = response.data;
            methods.reset({
              categoryId: batch.medicine.categoryId,
              medicineId: batch.medicineId,
              batchNumber: batch.batchNumber,
              quantity: batch.quantity,
              unitPrice: batch.unitPrice,
              sellingPrice: batch.sellingPrice,
              manufactureDate: batch.manufactureDate,
              expiryDate: batch.expiryDate,
              manufacturer: batch.manufacturer,
              supplier: batch.supplier,
              status: batch.status,
              notes: batch.notes || '',
            });
          } else {
            toast.error('Không tìm thấy thông tin lô thuốc');
            router.push(PRIVATE_ROUTES.ADMIN_MEDICINES);
          }
        } catch (error) {
          console.error('Error fetching batch:', error);
          toast.error('Có lỗi xảy ra khi tải thông tin lô thuốc');
        } finally {
          setLoading(false);
        }
      };
      fetchBatch();
    }
  }, [id, methods, router]);

  const onSubmit = async (data: CreateBatchFormValues) => {
    if (isViewMode) return;

    try {
      setIsSubmitting(true);
      let response;
      const { categoryId, medicineId, ...restData } = data;
      if (isEditMode && id) {
        response = await clientFetcher.patch(
          `/admin/medicine-batches/${id}`,
          restData
        );
      } else {
        response = await clientFetcher.post('/admin/medicine-batches', data);
      }

      if (response.success) {
        toast.success(
          isEditMode
            ? 'Cập nhật lô thuốc thành công'
            : 'Nhập lô thuốc thành công'
        );
        router.push(PRIVATE_ROUTES.ADMIN_MEDICINES);
      } else {
        toast.error(response.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error submitting batch:', error);
      toast.error('Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center'>Loading...</div>
    );
  }

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
              {isViewMode
                ? 'Chi tiết lô thuốc'
                : isEditMode
                  ? 'Cập nhật lô thuốc'
                  : 'Nhập lô thuốc mới'}
            </h1>
            <p className='text-sm text-muted-foreground'>
              {isViewMode
                ? 'Xem thông tin chi tiết lô thuốc'
                : 'Quản lý thông tin lô thuốc, số lượng và giá cả.'}
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
            {!isViewMode && (
              <Button
                type='button'
                variant='outline'
                className='border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800'
              >
                Lưu nháp
              </Button>
            )}
            {!isViewMode && (
              <Button
                type='submit'
                className='bg-emerald-600 hover:bg-emerald-700'
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Đang xử lý...'
                  : isEditMode
                    ? 'Cập nhật'
                    : 'Nhập lô thuốc'}
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className='grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <ImportMedicineForm readOnly={isViewMode} />
          </div>
          <div>
            <ImportMedicineSidebar />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
