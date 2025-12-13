import { History, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PRIVATE_ROUTES } from '@/const/routes';

export function MedicineListHeader() {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Medicines</h1>
        <p className='text-muted-foreground mt-1 text-sm'>
          Quản lý kho thuốc, số lượng tồn và hạn sử dụng.
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          className='bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800'
        >
          <History className='mr-2 size-4' />
          Import history
        </Button>
        <div className='flex items-center gap-3'>
          <Button
            variant='outline'
            className='border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800'
            onClick={() =>
              router.push(PRIVATE_ROUTES.ADMIN_MEDICINES_CREATE_CATEGORY)
            }
          >
            <Plus className='mr-2 h-4 w-4' />
            Tạo danh mục
          </Button>
          <Button
            variant='outline'
            className='border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800'
            onClick={() =>
              router.push(PRIVATE_ROUTES.ADMIN_MEDICINES_CREATE_MEDICINE)
            }
          >
            <Plus className='mr-2 h-4 w-4' />
            Tạo thuốc
          </Button>
          <Button
            className='bg-emerald-600 hover:bg-emerald-700'
            onClick={() => router.push(PRIVATE_ROUTES.ADMIN_MEDICINES_IMPORT)}
          >
            <Plus className='mr-2 h-4 w-4' />
            Nhập lô thuốc
          </Button>
        </div>
      </div>
    </div>
  );
}
