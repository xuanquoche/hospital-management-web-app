import React from 'react';

export const DoctorSuggestionsCard = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>Gợi ý từ bác sĩ</h3>
        <p className='text-sm text-slate-500'>
          Một số khuyến nghị theo dõi thêm.
        </p>
      </div>

      <ul className='space-y-2'>
        <li className='flex items-start gap-2 text-sm text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
          Đặt lịch khám lại sau 3 tháng nếu triệu chứng đau đầu, mất ngủ không
          cải thiện.
        </li>
        <li className='flex items-start gap-2 text-sm text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
          Cập nhật thông tin dị ứng thuốc và bệnh mạn tính (nếu có) trong Hồ sơ
          cá nhân.
        </li>
        <li className='flex items-start gap-2 text-sm text-slate-600'>
          <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
          Xem hướng dẫn chăm sóc sức khỏe tinh thần trong mục Tài liệu được chia
          sẻ.
        </li>
      </ul>
    </div>
  );
};
