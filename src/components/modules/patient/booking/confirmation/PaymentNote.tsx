import { Info } from 'lucide-react';
import React from 'react';

export const PaymentNote = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <h3 className='text-lg font-bold text-slate-900 mb-4'>
        Lưu ý thanh toán
      </h3>
      <p className='text-sm text-slate-500 mb-4'>
        Một số thông tin dành cho bạn.
      </p>

      <div className='bg-teal-50 rounded-lg p-4 mb-4 flex gap-3'>
        <Info className='w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5' />
        <p className='text-sm text-teal-800 leading-relaxed'>
          Phí đặt lịch trực tuyến không hoàn lại nếu bạn hủy cuộc hẹn trong vòng
          2 giờ trước thời gian khám.
        </p>
      </div>

      <ul className='space-y-2'>
        <li className='flex items-start gap-2 text-sm text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
          Sau khi thanh toán thành công, mã xác nhận sẽ được gửi qua SMS và
          email.
        </li>
        <li className='flex items-start gap-2 text-sm text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
          Vui lòng đến sớm 10–15 phút để hoàn tất thủ tục tiếp nhận.
        </li>
        <li className='flex items-start gap-2 text-sm text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
          Đem theo CMND/CCCD và thẻ bảo hiểm (nếu sử dụng).
        </li>
      </ul>
    </div>
  );
};
