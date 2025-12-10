'use client';

import React from 'react';

export const ProfileInfoTips = () => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <h3 className='mb-4 text-lg font-bold text-slate-900'>
        Thông tin từ hồ sơ cá nhân
      </h3>
      <p className='mb-4 text-sm text-slate-500'>
        Một phần dữ liệu được lấy từ hồ sơ của bạn.
      </p>
      <ul className='space-y-3 text-sm text-slate-600'>
        <li className='flex gap-2'>
          <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400' />
          <span>
            Bạn có thể cập nhật lại trong mục{' '}
            <span className='underline cursor-pointer hover:text-teal-600'>
              Hồ sơ cá nhân
            </span>{' '}
            sau khi hoàn tất đặt lịch.
          </span>
        </li>
        <li className='flex gap-2'>
          <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400' />
          <span>
            Các thay đổi tại bước này chỉ áp dụng cho cuộc hẹn hiện tại.
          </span>
        </li>
      </ul>
    </div>
  );
};
