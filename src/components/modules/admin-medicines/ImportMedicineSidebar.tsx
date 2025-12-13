'use client';

import { useFormContext } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { CreateMedicineBatchDto } from '@/types/medicine';

export function ImportMedicineSidebar() {
  const { watch } = useFormContext<CreateMedicineBatchDto>();
  const quantity = watch('quantity') || 0;
  const unitPrice = watch('unitPrice') || 0;
  const totalValue = quantity * unitPrice;

  // Count filled required fields
  const formValues = watch();
  const requiredFields: (keyof CreateMedicineBatchDto)[] = [
    'medicineId',
    'batchNumber',
    'quantity',
    'unitPrice',
    'sellingPrice',
    'manufactureDate',
    'expiryDate',
    'manufacturer',
    'supplier',
  ];

  const filledCount = requiredFields.filter(
    (field) => !!formValues[field]
  ).length;

  return (
    <div className='flex flex-col gap-6'>
      <div className='rounded-xl border bg-white p-6 shadow-sm'>
        <h3 className='mb-4 font-semibold'>Tổng quan lô nhập</h3>
        <p className='mb-4 text-xs text-muted-foreground'>
          Kiểm tra nhanh trước khi lưu
        </p>

        <div className='mb-6 space-y-1'>
          <div className='text-sm font-medium text-muted-foreground'>
            Trạng thái
          </div>
          <div className='flex items-center gap-2'>
            <Badge
              variant='secondary'
              className='bg-blue-50 text-blue-700 hover:bg-blue-100'
            >
              Đang soạn
            </Badge>
          </div>
          <p className='text-xs text-muted-foreground'>
            Lô chỉ được tính vào tồn kho sau khi bạn bấm "Nhập lô thuốc".
          </p>
        </div>

        <div className='mb-6 space-y-1'>
          <div className='flex items-center justify-between'>
            <div className='text-sm font-medium text-muted-foreground'>
              Tổng giá trị ước tính
            </div>
            <div className='text-xs text-muted-foreground'>
              Số lượng x giá nhập
            </div>
          </div>
          <div className='text-2xl font-bold text-emerald-600'>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(totalValue)}
          </div>
          <p className='text-xs text-muted-foreground'>
            Tự động tính sau khi nhập dữ liệu
          </p>
        </div>

        <div className='mb-6 space-y-1'>
          <div className='flex items-center justify-between'>
            <div className='text-sm font-medium text-muted-foreground'>
              Ảnh / tài liệu đính kèm
            </div>
            <div className='text-xs text-muted-foreground'>Tùy chọn</div>
          </div>
          <div className='rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground'>
            Tải lên hóa đơn, phiếu nhập kho...
          </div>
        </div>

        <div className='space-y-3 border-t pt-4'>
          <div className='text-sm font-medium'>Tóm tắt</div>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>
              Trường bắt buộc đã điền
            </span>
            <span className='font-medium'>
              {filledCount} / {requiredFields.length}
            </span>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>
              Sắp hết hạn (&lt; 6 tháng)
            </span>
            <span className='font-medium text-muted-foreground'>
              Chưa xác định
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
