import { Edit3 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export const ShiftNotesCard = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>Ghi chú ca khám</h3>
        <p className='text-xs text-slate-500'>
          Chuẩn bị nhanh trước khi vào buổi khám.
        </p>
      </div>

      <ul className='space-y-2 mb-4'>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>
            Ôn lại dị ứng và thuốc đang dùng của bệnh nhân trước khi kê đơn.
          </span>
        </li>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>
            Ghi rõ chẩn đoán chính và chẩn đoán phân biệt để bệnh nhân theo dõi.
          </span>
        </li>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>
            Tải lên kết quả xét nghiệm, hình ảnh siêu âm sau khi có để bệnh nhân
            xem trên app.
          </span>
        </li>
      </ul>

      <Button
        variant='outline'
        className='w-full text-teal-600 border-teal-100 hover:bg-teal-50 hover:text-teal-700 bg-teal-50/30 h-8 text-xs'
      >
        <Edit3 className='w-3 h-3 mr-2' />
        Mở form ghi chép
      </Button>
    </div>
  );
};
