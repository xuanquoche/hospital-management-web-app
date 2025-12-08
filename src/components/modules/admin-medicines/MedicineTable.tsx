import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Columns, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Medicine {
  id: string;
  name: string;
  description: string;
  batchId: string;
  quantity: number;
  unit: string;
  price: string;
  expiryDate: string;
  status: 'In stock' | 'Low stock' | 'Expired';
}

interface MedicineTableProps {
  medicines: Medicine[];
}

export function MedicineTable({ medicines }: MedicineTableProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-muted-foreground'>
          Kho thuốc • Showing 1–6 of 87
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
            {medicines.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell>
                  <div className='flex flex-col'>
                    <span className='font-medium'>{medicine.name}</span>
                    <span className='text-muted-foreground text-xs'>
                      {medicine.description}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span className='font-medium'>{medicine.batchId}</span>
                    <span className='text-muted-foreground text-xs'>01</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant='secondary'
                    className='bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  >
                    {medicine.quantity.toLocaleString()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>{medicine.unit}</span>
                </TableCell>
                <TableCell>
                  <span className='font-medium'>{medicine.price}</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>{medicine.expiryDate}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant='secondary'
                    className={cn(
                      'rounded-full font-normal',
                      medicine.status === 'In stock' &&
                        'bg-emerald-600 text-white hover:bg-emerald-700',
                      medicine.status === 'Low stock' &&
                        'bg-amber-500 text-white hover:bg-amber-600',
                      medicine.status === 'Expired' &&
                        'bg-red-500 text-white hover:bg-red-600'
                    )}
                  >
                    {medicine.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-2 text-xs font-medium text-emerald-600'>
                    <button className='hover:underline'>View</button>
                    <span className='text-muted-foreground'>•</span>
                    <button className='hover:underline'>
                      {medicine.status === 'Low stock'
                        ? 'Nhập thêm'
                        : medicine.status === 'Expired'
                          ? 'Dispose'
                          : 'Adjust'}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
