import { format } from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Columns,
  Download,
  Loader2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PRIVATE_ROUTES } from '@/const/routes';
import { cn } from '@/lib/utils';
import { BatchStatus, MedicineBatch, Meta } from '@/types/medicine';

interface MedicineTableProps {
  data: MedicineBatch[];
  loading: boolean;
  meta: Meta;
  onPageChange: (page: number) => void;
}

export function MedicineTable({
  data,
  loading,
  meta,
  onPageChange,
}: MedicineTableProps) {
  const router = useRouter();

  if (loading) {
    return <div className='p-8 text-center'>Loading medicines...</div>;
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-muted-foreground'>
          Kho thuốc • Showing {(meta.page - 1) * meta.limit + 1}–
          {Math.min(meta.page * meta.limit, meta.totalItems)} of{' '}
          {meta.totalItems}
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='sm' className='text-muted-foreground'>
            <Columns className='mr-2 size-4' />
            Columns
          </Button>
          <Button variant='ghost' size='sm' className='text-muted-foreground'>
            <Download className='mr-2 size-4' />
            Export
          </Button>
        </div>
      </div>

      <div className='rounded-md border bg-card'>
        <Table>
          <TableHeader className='bg-emerald-50/50'>
            <TableRow>
              <TableHead>Medicine</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Batch ID</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Expiry date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className='text-center py-8'>
                  No medicines found
                </TableCell>
              </TableRow>
            ) : (
              data.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='font-medium' title={batch.medicine.name}>
                        {batch.medicine.name.length > 20
                          ? `${batch.medicine.name.slice(0, 20)}...`
                          : batch.medicine.name}
                      </span>
                      <span
                        className='text-muted-foreground text-xs'
                        title={batch.medicine.description}
                      >
                        {batch.medicine.description.length > 20
                          ? `${batch.medicine.description.slice(0, 20)}...`
                          : batch.medicine.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className='text-sm'
                      title={batch.medicine.category.name}
                    >
                      {batch.medicine.category.name.length > 20
                        ? `${batch.medicine.category.name.slice(0, 20)}...`
                        : batch.medicine.category.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='font-medium'>{batch.batchNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='secondary'
                      className='bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    >
                      {batch.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>{batch.medicine.unit}</span>
                  </TableCell>
                  <TableCell>
                    <span className='font-medium'>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(batch.sellingPrice)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>
                      {format(new Date(batch.expiryDate), 'dd/MM/yyyy')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='secondary'
                      className={cn(
                        'rounded-full font-normal',
                        batch.status === BatchStatus.IN_STOCK &&
                          'bg-emerald-600 text-white hover:bg-emerald-700',
                        batch.status === BatchStatus.LOW_STOCK &&
                          'bg-amber-500 text-white hover:bg-amber-600',
                        batch.status === BatchStatus.OUT_OF_STOCK &&
                          'bg-red-500 text-white hover:bg-red-600',
                        batch.status === BatchStatus.EXPIRED &&
                          'bg-gray-500 text-white hover:bg-gray-600',
                        batch.status === BatchStatus.DISPOSED &&
                          'bg-slate-800 text-white hover:bg-slate-900'
                      )}
                    >
                      {batch.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex items-center justify-end gap-2 text-xs font-medium text-emerald-600'>
                      <button
                        className='hover:underline'
                        onClick={() =>
                          router.push(
                            `${PRIVATE_ROUTES.ADMIN_MEDICINES_IMPORT}?id=${batch.id}&mode=view`
                          )
                        }
                      >
                        View
                      </button>
                      <span className='text-muted-foreground'>•</span>
                      <button
                        className='hover:underline'
                        onClick={() => {
                          if (batch.status === BatchStatus.LOW_STOCK) {
                            router.push(
                              `${PRIVATE_ROUTES.ADMIN_MEDICINES_IMPORT}?id=${batch.id}&mode=edit`
                            );
                          } else if (batch.status === BatchStatus.EXPIRED) {
                            // Dispose logic?
                            // For now, let's map "Adjust" case.
                            router.push(
                              `${PRIVATE_ROUTES.ADMIN_MEDICINES_IMPORT}?id=${batch.id}&mode=edit`
                            );
                          } else {
                            // "Adjust" case
                            router.push(
                              `${PRIVATE_ROUTES.ADMIN_MEDICINES_IMPORT}?id=${batch.id}&mode=edit`
                            );
                          }
                        }}
                      >
                        {batch.status === BatchStatus.LOW_STOCK
                          ? 'Nhập thêm'
                          : batch.status === BatchStatus.EXPIRED
                            ? 'Dispose'
                            : 'Adjust'}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className='flex items-center justify-end gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onPageChange(meta.page - 1)}
            disabled={!meta.hasPreviousPage}
          >
            <ChevronLeft className='h-4 w-4' />
            Previous
          </Button>
          <div className='text-sm font-medium'>
            Page {meta.page} of {meta.totalPages}
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onPageChange(meta.page + 1)}
            disabled={!meta.hasNextPage}
          >
            Next
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  );
}
