import React from 'react';

import { Textarea } from '@/components/ui/textarea';
import { useAppointmentStore } from '@/store/use-appointment-store';

export const BookingNote = () => {
  const { note, setNote } = useAppointmentStore();

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>
          Ghi chú cho lễ tân (tùy chọn)
        </h3>
        <span className='text-xs text-slate-400'>
          Ví dụ: cần xuất hóa đơn công ty...
        </span>
      </div>

      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder='Nhập thêm yêu cầu về thủ tục, giấy tờ, hóa đơn (nếu có)...'
        className='min-h-[100px] resize-none border-slate-200 focus:border-teal-500 focus:ring-teal-500'
      />
    </div>
  );
};
