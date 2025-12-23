import { format } from 'date-fns';
import { Columns } from 'lucide-react';
import { useState } from 'react';

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
import { Payment, PaymentStatus } from '@/types/payment';

import { PaymentDetailModal } from './PaymentDetailModal';

interface TransactionTableProps {
  transactions: Payment[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleViewClick = (id: string) => {
    setSelectedPaymentId(id);
    setIsModalOpen(true);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-muted-foreground'>
          Lịch sử thanh toán • Showing {transactions.length} results
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
              <TableHead>Payment Code</TableHead>
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
                <TableCell className='font-medium'>
                  {transaction.paymentCode}
                </TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span>
                      {format(new Date(transaction.createdAt), 'dd MMM yyyy')}
                    </span>
                    <span className='text-muted-foreground text-xs'>
                      {format(new Date(transaction.createdAt), 'HH:mm')}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar className='size-9'>
                      <AvatarImage
                        src={transaction.appointment.patient.user.avatar}
                        alt={transaction.appointment.patient.user.fullName}
                      />
                      <AvatarFallback>
                        {transaction.appointment.patient.user.fullName.charAt(
                          0
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                      <span className='font-medium'>
                        {transaction.appointment.patient.user.fullName}
                      </span>
                      <span className='text-muted-foreground text-xs'>
                        {transaction.appointment.patient.user.phone}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='font-medium'>
                    {transaction.appointment.doctor.user.fullName}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='font-medium'>
                    {formatCurrency(transaction.appointment.consultationFee)}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant='secondary'
                    className={cn(
                      'rounded-full font-normal',
                      transaction.status === PaymentStatus.SUCCESS &&
                        'bg-emerald-600 text-white hover:bg-emerald-700',
                      transaction.status === PaymentStatus.PENDING &&
                        'bg-amber-500 text-white hover:bg-amber-600',
                      transaction.status === PaymentStatus.FAILED &&
                        'bg-red-500 text-white hover:bg-red-600',
                      transaction.status === PaymentStatus.REFUNDED &&
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
                    <button
                      className='hover:underline'
                      onClick={() => handleViewClick(transaction.id)}
                    >
                      View
                    </button>
                    <span className='text-muted-foreground'>•</span>
                    <button className='hover:underline'>
                      {transaction.status === PaymentStatus.SUCCESS
                        ? 'Refund'
                        : transaction.status === PaymentStatus.FAILED
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

      <PaymentDetailModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        paymentId={selectedPaymentId}
      />
    </div>
  );
}
