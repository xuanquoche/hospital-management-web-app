import { Stethoscope, UserSearch, Upload } from 'lucide-react';
import React from 'react';

export const QuickActions = () => {
  return (
    <div className='mb-6'>
      <h3 className='text-sm font-bold text-slate-900 mb-3'>Hành động nhanh</h3>
      <p className='text-xs text-slate-500 mb-4'>
        Truy cập nhanh các chức năng thường dùng.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-teal-50/50 hover:bg-teal-50 border border-teal-100 rounded-xl p-4 cursor-pointer transition-all group'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='font-bold text-teal-800 group-hover:text-teal-900'>
                Tiếp tục ca khám hiện tại
              </p>
              <p className='text-xs text-teal-600/80 mt-1'>
                Mở form ghi chép, đơn thuốc, tài liệu
              </p>
            </div>
            <Stethoscope className='w-5 h-5 text-teal-600' />
          </div>
        </div>

        <div className='bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl p-4 cursor-pointer transition-all group'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='font-bold text-slate-800 group-hover:text-slate-900'>
                Tìm bệnh nhân
              </p>
              <p className='text-xs text-slate-500 mt-1'>
                Xem lịch sử khám, dị ứng, thuốc đang dùng
              </p>
            </div>
            <UserSearch className='w-5 h-5 text-slate-500' />
          </div>
        </div>

        <div className='bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl p-4 cursor-pointer transition-all group'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='font-bold text-slate-800 group-hover:text-slate-900'>
                Tải tài liệu
              </p>
              <p className='text-xs text-slate-500 mt-1'>
                Thêm kết quả xét nghiệm, siêu âm...
              </p>
            </div>
            <Upload className='w-5 h-5 text-slate-500' />
          </div>
        </div>
      </div>
    </div>
  );
};
