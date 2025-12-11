import { Download } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export const PatientListHeader = () => {
  return (
    <div className='flex justify-between items-end mb-6'>
      <div>
        <h2 className='text-xl font-bold text-slate-900'>Bệnh nhân của tôi</h2>
        <p className='text-sm text-slate-500 mt-1'>
          Danh sách những bệnh nhân đã/đang có lịch hẹn với bạn. Chọn bệnh nhân
          để xem hồ sơ chi tiết.
        </p>
      </div>
      <Button
        variant='outline'
        className='text-slate-600 border-slate-200 hover:bg-slate-50'
      >
        <Download className='w-4 h-4 mr-2' />
        Xuất danh sách
      </Button>
    </div>
  );
};
