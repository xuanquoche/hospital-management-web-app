import { Download, CreditCard } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

import { Invoice } from './data';

interface InvoiceDetailCardProps {
  invoice: Invoice;
}

export const InvoiceDetailCard = ({ invoice }: InvoiceDetailCardProps) => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>
            Chi tiết hóa đơn được chọn
          </h3>
          <p className='text-sm text-slate-500'>
            {invoice.title} - Ngày {invoice.date.split('-').reverse().join('/')}
            .
          </p>
        </div>
        <Button
          variant='outline'
          size='sm'
          className='text-teal-600 border-teal-200 hover:bg-teal-50'
        >
          <Download className='w-4 h-4 mr-2' />
          Tải hóa đơn
        </Button>
      </div>

      <div className='bg-slate-50 rounded-lg p-3 mb-6 flex flex-wrap gap-4 items-center text-sm'>
        <span className='font-semibold text-teal-700'>
          Mã hóa đơn: {invoice.id}
        </span>
        <span className='text-slate-400'>|</span>
        <span className='text-slate-600'>
          Thanh toán trước: {invoice.dueDate?.split('-').reverse().join('/')}
        </span>
      </div>

      <div className='space-y-4 mb-6'>
        {invoice.services?.map((service, index) => (
          <div
            key={index}
            className='flex justify-between items-center text-sm'
          >
            <span className='text-slate-600'>{service.name}</span>
            <span className='font-bold text-slate-900'>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(service.amount)}
            </span>
          </div>
        ))}
      </div>

      <div className='border-t border-slate-100 pt-4 space-y-3 mb-6'>
        <div className='flex justify-between items-center text-sm'>
          <span className='font-semibold text-slate-700'>
            Tổng tiền dịch vụ
          </span>
          <span className='font-bold text-slate-900'>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(invoice.amount)}
          </span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='font-semibold text-slate-700'>
            Giảm giá / Bảo hiểm
          </span>
          <span className='font-bold text-slate-900'>0 ₫</span>
        </div>
        <div className='flex justify-between items-center text-lg'>
          <span className='font-bold text-slate-900'>Cần thanh toán</span>
          <span className='font-bold text-teal-700'>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(invoice.total || 0)}
          </span>
        </div>
      </div>

      <p className='text-xs text-slate-500 mb-4'>
        Lưu ý: Sau khi thanh toán thành công, hóa đơn sẽ được chuyển sang mục
        "Đã thanh toán" và gửi về email của bạn.
      </p>

      <div className='flex justify-end items-center gap-4'>
        <span className='text-sm font-medium text-slate-600'>
          Thanh toán sau
        </span>
        <Button className='bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-200'>
          <CreditCard className='w-4 h-4 mr-2' />
          Thanh toán{' '}
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(invoice.total || 0)}
        </Button>
      </div>
    </div>
  );
};
