import React from 'react';

export const PatientSummaryCard = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>
          Tóm tắt bệnh nhân hôm nay
        </h3>
        <p className='text-xs text-slate-500'>
          Chỉ tính những bệnh nhân có lịch hẹn trong ngày.
        </p>
      </div>

      <div className='space-y-3 mb-6'>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-slate-600'>Tổng bệnh nhân hôm nay</span>
          <span className='font-bold text-slate-900'>8</span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-slate-600'>Đã khám</span>
          <span className='font-bold text-slate-900'>3</span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-slate-600'>Đang chờ</span>
          <span className='font-bold text-slate-900'>5</span>
        </div>
      </div>

      <div className='space-y-3 border-t border-slate-100 pt-4'>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-slate-600'>Khám trực tiếp</span>
          <span className='font-bold text-slate-900'>5 bệnh nhân</span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-slate-600'>Khám từ xa (video)</span>
          <span className='font-bold text-slate-900'>3 bệnh nhân</span>
        </div>
      </div>
    </div>
  );
};
