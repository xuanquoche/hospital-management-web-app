import { FileText, Image as ImageIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export const DocumentsCard = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>Tài liệu & báo cáo</h3>
        <p className='text-sm text-slate-500'>
          Các file PDF và hình ảnh đã lưu.
        </p>
      </div>

      <div className='space-y-4'>
        <div className='flex items-start gap-3'>
          <div className='p-2 bg-slate-100 rounded-lg'>
            <FileText className='w-5 h-5 text-slate-500' />
          </div>
          <div className='flex-1'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm font-bold text-slate-900'>
                  Tóm tắt khám 05-07-2025
                </p>
                <p className='text-xs text-slate-500 mt-0.5'>
                  PDF • 320 KB • Tải lên: 05/07/2025
                </p>
              </div>
              <Button
                variant='ghost'
                size='sm'
                className='h-7 text-xs text-teal-600 bg-teal-50 hover:bg-teal-100 hover:text-teal-700'
              >
                Tải xuống
              </Button>
            </div>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='p-2 bg-slate-100 rounded-lg'>
            <ImageIcon className='w-5 h-5 text-slate-500' />
          </div>
          <div className='flex-1'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-sm font-bold text-slate-900'>
                  Ảnh kết quả X-quang 02-01-2025
                </p>
                <p className='text-xs text-slate-500 mt-0.5'>
                  Ảnh JPG • 1.2 MB
                </p>
              </div>
              <Button
                variant='ghost'
                size='sm'
                className='h-7 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200'
              >
                Xem
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
