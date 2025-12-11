import React from 'react';

import { Badge } from '@/components/ui/badge';

import { PatientDetail } from './data';

interface VitalsCardProps {
  vitals: PatientDetail['vitals'];
}

export const VitalsCard = ({ vitals }: VitalsCardProps) => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>Sinh hiệu gần nhất</h3>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal'
        >
          Ổn định
        </Badge>
      </div>
      <p className='text-xs text-slate-500 mb-6'>Đo trong buổi khám hôm nay.</p>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-teal-50/50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>Huyết áp</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.bp}</p>
          <p className='text-[10px] text-slate-500'>mmHg · Ngồi nghỉ</p>
        </div>
        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>Nhịp tim</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.heartRate}</p>
          <p className='text-[10px] text-slate-500'>lần/phút</p>
        </div>
        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>Nhiệt độ</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.temp}°C</p>
          <p className='text-[10px] text-slate-500'>Nhiệt độ da</p>
        </div>
        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>SpO₂</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.spO2}%</p>
          <p className='text-[10px] text-slate-500'>Khí phòng</p>
        </div>
        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>Nhịp thở</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.respRate}</p>
          <p className='text-[10px] text-slate-500'>lần/phút</p>
        </div>
        <div className='bg-slate-50 rounded-xl p-3'>
          <p className='text-xs text-slate-500 mb-1'>Cân nặng</p>
          <p className='text-lg font-bold text-slate-900'>{vitals.weight} kg</p>
          <p className='text-[10px] text-slate-500'>
            So với lần trước: {vitals.weightChange}
          </p>
        </div>
      </div>
    </div>
  );
};
