'use client';

import React from 'react';

export const BookingInfoTips = () => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <h3 className='mb-4 text-lg font-bold text-slate-900'>
        Lưu ý khi nhập thông tin
      </h3>
      <p className='mb-4 text-sm text-slate-500'>
        Một số gợi ý giúp bạn thao tác nhanh hơn.
      </p>
      <ul className='space-y-3 text-sm text-slate-600'>
        <li className='flex gap-2'>
          <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400' />
          <span>
            Ưu tiên dùng số điện thoại và email bạn thường xuyên sử dụng để nhận
            mã xác nhận.
          </span>
        </li>
        <li className='flex gap-2'>
          <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400' />
          <span>
            Nếu đặt giúp người thân, hãy dùng đúng thông tin của người được khám
            để tiện tra cứu hồ sơ.
          </span>
        </li>
        <li className='flex gap-2'>
          <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400' />
          <span>
            Kiểm tra kỹ mã số thẻ bảo hiểm để tránh ảnh hưởng quyền lợi thanh
            toán.
          </span>
        </li>
      </ul>
    </div>
  );
};
