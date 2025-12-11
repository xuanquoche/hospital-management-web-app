import React from 'react';

export const QuickStats = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>
          Thống kê nhanh hôm nay
        </h3>
        <p className='text-xs text-slate-500'>Cập nhật theo thời gian thực.</p>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-teal-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>Tổng số ca</p>
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-bold text-teal-700'>8</span>
            <span className='text-xs font-medium text-teal-600 bg-teal-100 px-1.5 py-0.5 rounded'>
              100%
            </span>
          </div>
          <p className='text-[10px] text-slate-400 mt-1'>
            Bao gồm cả khám từ xa
          </p>
        </div>

        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>Đã khám</p>
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-bold text-slate-700'>3</span>
            <span className='text-xs font-medium text-slate-500'>38%</span>
          </div>
          <p className='text-[10px] text-slate-400 mt-1'>
            Trung bình 25 phút/ca
          </p>
        </div>

        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>Đang chờ</p>
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-bold text-slate-700'>5</span>
            <span className='text-xs font-medium text-slate-500'>
              Ưu tiên 1
            </span>
          </div>
          <p className='text-[10px] text-slate-400 mt-1'>
            1 bệnh nhân ưu tiên cao
          </p>
        </div>

        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>Hủy/Không đến</p>
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-bold text-slate-400'>0</span>
            <span className='text-xs font-medium text-slate-500'>Ổn định</span>
          </div>
          <p className='text-[10px] text-slate-400 mt-1'>Không có ca bị hủy</p>
        </div>
      </div>
    </div>
  );
};
