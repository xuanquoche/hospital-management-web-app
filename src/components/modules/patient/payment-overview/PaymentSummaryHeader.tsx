import { HelpCircle } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export const PaymentSummaryHeader = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h2 className='text-xl font-bold text-slate-900'>
            Thanh toán & hóa đơn
          </h2>
          <p className='text-sm text-slate-500 mt-1'>
            Xem và thanh toán các hóa đơn khám bệnh, xét nghiệm và dịch vụ liên
            quan.
          </p>
        </div>
        <span className='text-sm text-slate-500 cursor-pointer hover:text-teal-600'>
          Lịch sử thanh toán
        </span>
      </div>

      <div className='bg-slate-50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6'>
        <div className='flex-1 w-full'>
          <p className='text-sm text-slate-500 mb-1'>
            Tổng số dư cần thanh toán
          </p>
          <div className='flex items-baseline gap-1'>
            <span className='text-3xl font-bold text-slate-900'>
              1.250.000 đ
            </span>
          </div>
          <p className='text-xs text-slate-400 mt-2'>
            Bao gồm 2 hóa đơn chưa thanh toán
          </p>
        </div>

        <div className='flex-1 w-full flex flex-col items-end gap-3'>
          <div className='text-right'>
            <div className='flex justify-end gap-8 text-sm'>
              <span className='text-slate-500'>
                Đã thanh toán trong 30 ngày
              </span>
              <span className='font-bold text-slate-900'>2.300.000 đ</span>
            </div>
            <div className='flex justify-end gap-8 text-sm mt-1'>
              <span className='text-slate-500'>Ví sức khỏe</span>
              <span className='font-bold text-slate-900'>0 đ</span>
            </div>
          </div>

          <Button
            variant='outline'
            className='bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100'
          >
            <HelpCircle className='w-4 h-4 mr-2' />
            Hướng dẫn thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};
