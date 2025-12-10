'use client';

import React from 'react';

export const BookingTips = () => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <h3 className='mb-4 text-lg font-bold text-slate-900'>Mẹo chọn bác sĩ</h3>
      <p className='mb-4 text-sm text-slate-500'>
        Một vài gợi ý giúp bạn chọn bác sĩ phù hợp.
      </p>
      <ul className='space-y-3 pl-4 text-sm text-slate-700'>
        <li className='list-disc marker:text-teal-500'>
          Ưu tiên bác sĩ theo chuyên khoa đúng với triệu chứng hiện tại.
        </li>
        <li className='list-disc marker:text-teal-500'>
          Kiểm tra cơ sở khám gần bạn nhất để thuận tiện di chuyển.
        </li>
        <li className='list-disc marker:text-teal-500'>
          Tham khảo lịch sử khám trước đây để tiếp tục với cùng bác sĩ.
        </li>
      </ul>
    </div>
  );
};
