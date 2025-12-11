import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Invoice } from './data';

interface InvoiceListProps {
  invoices: Invoice[];
  selectedInvoiceId: string;
  onSelectInvoice: (id: string) => void;
}

export const InvoiceList = ({
  invoices,
  selectedInvoiceId,
  onSelectInvoice,
}: InvoiceListProps) => {
  const [filter, setFilter] = React.useState<'all' | 'unpaid' | 'paid'>(
    'unpaid'
  );

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === 'all') return true;
    return invoice.status === filter;
  });

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>Hóa đơn của bạn</h3>
          <p className='text-sm text-slate-500'>
            Chọn hóa đơn để xem chi tiết và thanh toán.
          </p>
        </div>
        <span className='text-xs text-slate-400 cursor-pointer hover:text-teal-600'>
          Lọc nâng cao
        </span>
      </div>

      <div className='flex gap-2 mb-6'>
        <Button
          variant={filter === 'unpaid' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setFilter('unpaid')}
          className={cn(
            'rounded-full',
            filter === 'unpaid'
              ? 'bg-teal-600 hover:bg-teal-700'
              : 'text-slate-600'
          )}
        >
          Chưa thanh toán (
          {invoices.filter((i) => i.status === 'unpaid').length})
        </Button>
        <Button
          variant={filter === 'paid' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setFilter('paid')}
          className={cn(
            'rounded-full',
            filter === 'paid'
              ? 'bg-teal-600 hover:bg-teal-700'
              : 'text-slate-600'
          )}
        >
          Đã thanh toán
        </Button>
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setFilter('all')}
          className={cn(
            'rounded-full',
            filter === 'all'
              ? 'bg-teal-600 hover:bg-teal-700'
              : 'text-slate-600'
          )}
        >
          Tất cả
        </Button>
      </div>

      <div className='space-y-4'>
        {filteredInvoices.map((invoice) => (
          <div
            key={invoice.id}
            onClick={() => onSelectInvoice(invoice.id)}
            className={cn(
              'p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md',
              selectedInvoiceId === invoice.id
                ? 'bg-teal-50 border-teal-200 ring-1 ring-teal-200'
                : 'bg-slate-50 border-slate-100 hover:border-teal-100'
            )}
          >
            <div className='flex justify-between items-start mb-2'>
              <h4 className='font-bold text-slate-900 flex-1 mr-4'>
                {invoice.title}
              </h4>
              <span className='font-bold text-slate-900 whitespace-nowrap'>
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(invoice.amount)}
              </span>
            </div>

            <p className='text-xs text-slate-500 mb-3'>
              Mã hóa đơn: {invoice.id} • Ngày{' '}
              {invoice.date.split('-').reverse().join('/')} • {invoice.facility}
            </p>

            <div className='flex justify-end'>
              {invoice.status === 'unpaid' ? (
                <Badge className='bg-orange-500 hover:bg-orange-600 text-white border-none'>
                  Chưa thanh toán
                </Badge>
              ) : (
                <Badge className='bg-green-500 hover:bg-green-600 text-white border-none'>
                  Đã thanh toán
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
