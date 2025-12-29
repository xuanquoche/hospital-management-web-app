import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { Patient } from './data';

interface RecentPatientsProps {
  patients: Patient[];
}

export const RecentPatients = ({ patients }: RecentPatientsProps) => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-sm font-bold text-slate-900'>Bệnh nhân gần đây</h3>
        <span className='text-xs text-teal-600 cursor-pointer hover:underline'>
          Xem hồ sơ
        </span>
      </div>

      <div className='space-y-3'>
        {patients.map((patient) => (
          <div
            key={patient.id}
            className='flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer'
          >
            <Avatar className='h-10 w-10 border border-slate-100'>
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback>{patient.name?.charAt(0) ?? 'P'}</AvatarFallback>
            </Avatar>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-bold text-slate-900 truncate'>
                {patient.name}
              </p>
              <p className='text-xs text-slate-500 truncate'>
                {patient.time} · {patient.action}
              </p>
            </div>
            {patient.time === 'Đang khám' ? (
              <Badge
                variant='secondary'
                className='bg-teal-50 text-teal-700 text-[10px] h-5 px-1.5'
              >
                Tiếp tục
              </Badge>
            ) : (
              <Badge
                variant='secondary'
                className='bg-slate-100 text-slate-600 text-[10px] h-5 px-1.5'
              >
                Chuẩn bị
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
