import React from 'react';

import { Badge } from '@/components/ui/badge';

import { PatientDetail } from './data';

interface VisitSummaryCardProps {
  visit: PatientDetail['todayVisit'];
}

export const VisitSummaryCard = ({ visit }: VisitSummaryCardProps) => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>Lần khám hôm nay</h3>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal'
        >
          Đã lưu kết luận
        </Badge>
      </div>
      <p className='text-xs text-slate-500 mb-6'>
        Tóm tắt buổi khám lúc {visit.time} - {visit.room}.
      </p>

      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2'>
          <span className='text-sm text-slate-500'>Lý do khám</span>
          <span className='text-sm font-medium text-slate-900'>
            {visit.reason}
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2'>
          <span className='text-sm text-slate-500'>Chẩn đoán sơ bộ</span>
          <span className='text-sm font-medium text-slate-900'>
            {visit.diagnosis}
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2'>
          <span className='text-sm text-slate-500'>Kế hoạch điều trị</span>
          <span className='text-sm font-medium text-slate-900'>
            {visit.plan}
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2'>
          <span className='text-sm text-slate-500'>Thuốc kê</span>
          <span className='text-sm font-medium text-slate-900'>
            {visit.prescription}
          </span>
        </div>
      </div>

      <div className='mt-6 pt-4 border-t border-slate-100'>
        <p className='text-xs font-bold text-slate-500 mb-2'>Ghi chú nhanh:</p>
        <ul className='space-y-1'>
          {visit.notes.map((note, index) => (
            <li
              key={index}
              className='text-xs text-slate-600 flex items-start gap-2'
            >
              <span className='w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0' />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
