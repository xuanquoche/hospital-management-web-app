import React from 'react';

export const HealthOverviewCard = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>
          Tổng quan hồ sơ sức khỏe
        </h3>
        <p className='text-sm text-slate-500'>
          Các chỉ số và thông tin nổi bật.
        </p>
      </div>

      <div className='space-y-3'>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-500'>
            Số lần khám trong 12 tháng
          </span>
          <span className='text-sm font-bold text-slate-900'>6</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-500'>Bệnh mạn tính</span>
          <span className='text-sm font-medium text-slate-900'>
            Chưa ghi nhận
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-500'>Dị ứng</span>
          <span className='text-sm font-medium text-slate-900'>
            Chưa cập nhật
          </span>
        </div>

        <div className='border-t border-slate-100 my-3'></div>

        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-500'>
            Chiều cao / Cân nặng gần nhất
          </span>
          <span className='text-sm font-bold text-slate-900'>
            160 cm • 52 kg
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-slate-500'>Nhóm máu</span>
          <span className='text-sm font-medium text-slate-900'>
            Chưa cập nhật
          </span>
        </div>
      </div>
    </div>
  );
};
