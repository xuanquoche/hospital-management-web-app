import React from 'react';

import { Button } from '@/components/ui/button';

export const DoctorProfileCard = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>Hồ sơ bác sĩ</h3>
        <p className='text-xs text-slate-500'>
          Cập nhật Bio và ảnh đại diện của bạn.
        </p>
      </div>

      <div className='space-y-3 mb-4'>
        <div className='flex justify-between items-start text-xs'>
          <span className='text-slate-600'>Bio</span>
          <span className='font-bold text-slate-900 text-right'>
            Đã cập nhật 3 ngày trước
          </span>
        </div>
        <div className='flex justify-between items-start text-xs'>
          <span className='text-slate-600'>Chứng chỉ / Bằng cấp</span>
          <span className='font-bold text-slate-900 text-right'>
            Do Admin quản lý
          </span>
        </div>
      </div>

      <div className='bg-slate-50 rounded-lg p-3 mb-4'>
        <div className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1 h-3 bg-teal-500 rounded-full mt-0.5 flex-shrink-0' />
          <span>
            Thông tin chứng chỉ/bằng cấp sẽ được kiểm duyệt bởi Admin để đảm bảo
            tính xác thực.
          </span>
        </div>
      </div>

      <div className='text-right'>
        <span className='text-xs text-slate-500 cursor-pointer hover:text-teal-600'>
          Chỉnh sửa hồ sơ bác sĩ
        </span>
      </div>
    </div>
  );
};
