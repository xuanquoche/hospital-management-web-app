import { format } from 'date-fns';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const ProfileSidebar = () => {
  const { watch } = useFormContext();
  const values = watch();

  return (
    <div className='space-y-6'>
      {/* Profile Summary */}
      <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
        <div className='mb-4'>
          <h3 className='text-lg font-bold text-slate-900'>Tóm tắt hồ sơ</h3>
          <p className='text-sm text-slate-500'>
            Một số thông tin chính từ hồ sơ hiện tại.
          </p>
        </div>

        <div className='space-y-3'>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-slate-500'>Họ và tên</span>
            <span className='text-sm font-semibold text-slate-900'>
              {values.fullName || '---'}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-slate-500'>Ngày sinh</span>
            <span className='text-sm font-semibold text-slate-900'>
              {values.dateOfBirth
                ? format(values.dateOfBirth, 'dd/MM/yyyy')
                : '---'}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-slate-500'>Giới tính</span>
            <span className='text-sm font-semibold text-slate-900'>
              {values.gender === 'male'
                ? 'Nam'
                : values.gender === 'female'
                  ? 'Nữ'
                  : 'Khác'}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-slate-500'>Nhóm máu</span>
            <span className='text-sm font-semibold text-slate-900'>
              {values.bloodType || 'Chưa cập nhật'}
            </span>
          </div>

          <div className='border-t border-slate-100 my-3'></div>

          <div className='flex justify-between items-center'>
            <span className='text-sm text-slate-500'>Chiều cao / Cân nặng</span>
            <span className='text-sm font-semibold text-slate-900'>
              {values.height || '---'} cm • {values.weight || '---'} kg
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-slate-500'>BHYT</span>
            <span className='text-sm font-semibold text-slate-900'>
              BHYT - Nhà nước
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-slate-500'>Địa chỉ</span>
            <span className='text-sm font-semibold text-slate-900 truncate max-w-[150px]'>
              {values.address || 'Chưa cập nhật đầy đủ'}
            </span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
        <div className='mb-4'>
          <h3 className='text-lg font-bold text-slate-900'>
            Gợi ý hoàn thiện hồ sơ
          </h3>
          <p className='text-sm text-slate-500'>
            Giúp bác sĩ hiểu rõ tình trạng sức khỏe của bạn.
          </p>
        </div>

        <ul className='space-y-2'>
          <li className='flex items-start gap-2 text-sm text-slate-600'>
            <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
            Thêm nhóm máu và thông tin dị ứng để hạn chế rủi ro khi kê đơn
            thuốc.
          </li>
          <li className='flex items-start gap-2 text-sm text-slate-600'>
            <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
            Cập nhật chiều cao, cân nặng định kỳ để bác sĩ theo dõi chỉ số BMI.
          </li>
          <li className='flex items-start gap-2 text-sm text-slate-600'>
            <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
            Ghi rõ các bệnh mạn tính và thuốc đang sử dụng để tránh tương tác
            thuốc.
          </li>
        </ul>
      </div>

      {/* Privacy */}
      <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
        <div className='mb-4'>
          <h3 className='text-lg font-bold text-slate-900'>
            Bảo mật & quyền riêng tư
          </h3>
          <p className='text-sm text-slate-500'>
            Cách chúng tôi bảo vệ dữ liệu của bạn.
          </p>
        </div>

        <ul className='space-y-2'>
          <li className='flex items-start gap-2 text-sm text-slate-600'>
            <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
            Thông tin hồ sơ chỉ được chia sẻ với bác sĩ và nhân viên y tế liên
            quan.
          </li>
          <li className='flex items-start gap-2 text-sm text-slate-600'>
            <span className='w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0' />
            Bạn có thể yêu cầu cập nhật hoặc ẩn một số thông tin nhạy cảm khi
            cần.
          </li>
        </ul>
      </div>
    </div>
  );
};
