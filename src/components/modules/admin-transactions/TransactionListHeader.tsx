import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function TransactionListHeader() {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Transactions</h1>
        <p className='text-muted-foreground mt-1 text-sm'>
          Lịch sử thanh toán và thống kê doanh thu khám bệnh.
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='sm' className='text-muted-foreground'>
          <Download className='mr-2 size-4' />
          Export
        </Button>
      </div>
    </div>
  );
}
