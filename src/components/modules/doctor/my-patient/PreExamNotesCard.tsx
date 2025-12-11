import { Stethoscope } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export const PreExamNotesCard = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>
          Gợi ý trước khi khám
        </h3>
        <p className='text-xs text-slate-500'>
          Những mục nên kiểm tra trong hồ sơ bệnh nhân.
        </p>
      </div>

      <ul className='space-y-3 mb-6'>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1.5 h-1.5 rounded bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>
            Luôn xem lại dị ứng và thuốc đang dùng trước khi kê đơn mới.
          </span>
        </li>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1.5 h-1.5 rounded bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>
            Kiểm tra các document mới upload (xét nghiệm, chẩn đoán hình ảnh)
            trước khi vào phòng khám.
          </span>
        </li>
        <li className='flex items-start gap-2 text-xs text-slate-600'>
          <span className='w-1.5 h-1.5 rounded bg-slate-400 mt-1.5 flex-shrink-0' />
          <span>
            Ghi chú ngắn gọn về kế hoạch điều trị tiếp theo để bệnh nhân dễ theo
            dõi trên app.
          </span>
        </li>
      </ul>

      <Button className='w-full bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100 shadow-none'>
        <Stethoscope className='w-4 h-4 mr-2' />
        Đi tới "Khám & ghi chép"
      </Button>
    </div>
  );
};
