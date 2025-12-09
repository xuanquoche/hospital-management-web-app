import { Columns } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { cn } from '@/lib/utils';

export interface Transaction {
  id: string;
  date: string;
  time: string;
  patient: {
    name: string;
    phone: string;
    avatarUrl?: string;
  };
  doctor: {
    name: string;
    avatarUrl?: string;
  };
  amount: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  method: 'Cash' | 'Card' | 'Online';
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-muted-foreground'>
          Lịch sử thanh toán • Showing 1–6 of 284
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='sm' className='text-muted-foreground'>
            <Columns className='mr-2 size-4' />
            Columns
          </Button>
        </div>
      </div>

      <div className='rounded-md border bg-card'>
        <Table>
          <TableHeader className='bg-emerald-50/50'>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date & time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className='font-medium'>{transaction.id}</TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span>{transaction.date}</span>
                    <span className='text-muted-foreground text-xs'>
                      {transaction.time}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar className='size-9'>
                      <AvatarImage
                        src={transaction.patient.avatarUrl}
                        alt={transaction.patient.name}
                      />
                      <AvatarFallback>
                        {transaction.patient.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                      <span className='font-medium'>
                        {transaction.patient.name}
                      </span>
                      <span className='text-muted-foreground text-xs'>
                        {transaction.patient.phone}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='font-medium'>{transaction.doctor.name}</span>
                </TableCell>
                <TableCell>
                  <span className='font-medium'>{transaction.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant='secondary'
                    className={cn(
                      'rounded-full font-normal',
                      transaction.status === 'Paid' &&
                        'bg-emerald-600 text-white hover:bg-emerald-700',
                      transaction.status === 'Pending' &&
                        'bg-amber-500 text-white hover:bg-amber-600',
                      transaction.status === 'Failed' &&
                        'bg-red-500 text-white hover:bg-red-600',
                      transaction.status === 'Refunded' &&
                        'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>{transaction.method}</span>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-2 text-xs font-medium text-emerald-600'>
                    <button className='hover:underline'>View</button>
                    <span className='text-muted-foreground'>•</span>
                    <button className='hover:underline'>
                      {transaction.status === 'Paid'
                        ? 'Refund'
                        : transaction.status === 'Failed'
                          ? 'Retry'
                          : 'Details'}
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
