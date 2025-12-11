import React from 'react';

import { Button } from '@/components/ui/button';

export const SupportCard = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>
          Hỗ trợ & câu hỏi thường gặp
        </h3>
        <p className='text-sm text-slate-500'>
          Liên hệ nếu bạn cần trợ giúp về thanh toán hoặc hóa đơn.
        </p>
      </div>

      <ul className='space-y-2 mb-4'>
        <li className='flex items-start gap-2 text-sm text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
          <span>
            Nếu hóa đơn của bạn đã thanh toán nhưng vẫn hiển thị là "Chưa thanh
            toán", vui lòng liên hệ bộ phận hỗ trợ khách hàng.
          </span>
        </li>
        <li className='flex items-start gap-2 text-sm text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
          <span>
            Bạn có thể yêu cầu xuất hóa đơn VAT trong vòng 7 ngày kể từ ngày
            thanh toán.
          </span>
        </li>
        <li className='flex items-start gap-2 text-sm text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
          <span>
            Để thay đổi email nhận hóa đơn, cập nhật tại mục "Hồ sơ cá nhân".
          </span>
        </li>
      </ul>

      <div className='text-right'>
        <Button
          variant='link'
          className='text-slate-500 hover:text-teal-600 p-0 h-auto font-normal'
        >
          Liên hệ hỗ trợ
        </Button>
      </div>
    </div>
  );
};
