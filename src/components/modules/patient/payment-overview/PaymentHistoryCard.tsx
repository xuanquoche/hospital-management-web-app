import React from 'react';

export const PaymentHistoryCard = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>
          Tổng quan thanh toán
        </h3>
        <p className='text-sm text-slate-500'>
          Tóm tắt nhanh tình hình công nợ và hoạt động gần đây.
        </p>
      </div>

      <div className='space-y-3 mb-6'>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-500'>
            Hóa đơn chưa thanh toán
          </span>
          <span className='text-sm font-bold text-slate-900'>
            2 • 1.250.000 đ
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-500'>
            Hóa đơn đã thanh toán trong năm
          </span>
          <span className='text-sm font-bold text-slate-900'>
            8 • 5.800.000 đ
          </span>
        </div>
      </div>

      <div className='space-y-4'>
        <div className='border-t border-slate-100 pt-4'>
          <div className='flex justify-between items-start mb-1'>
            <p className='text-sm font-bold text-slate-900'>
              Thanh toán HD-2025-0102-03
            </p>
            <span className='text-xs text-slate-500'>
              02/01/2025 • 350.000 đ
            </span>
          </div>
          <p className='text-xs text-slate-500'>
            Phương thức: Thẻ Visa **** 1234
          </p>
        </div>

        <div className='border-t border-slate-100 pt-4'>
          <div className='flex justify-between items-start mb-1'>
            <p className='text-sm font-bold text-slate-900'>
              Thanh toán HD-2024-1205-08
            </p>
            <span className='text-xs text-slate-500'>
              05/12/2024 • 780.000 đ
            </span>
          </div>
          <p className='text-xs text-slate-500'>
            Phương thức: Chuyển khoản ngân hàng
          </p>
        </div>
      </div>
    </div>
  );
};
