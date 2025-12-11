import { ChevronRight } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Patient } from './data';

interface PatientTableProps {
  patients: Patient[];
}

export const PatientTable = ({ patients }: PatientTableProps) => {
  return (
    <div className='bg-white rounded-b-2xl shadow-sm border border-t-0 border-slate-100 overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left'>
          <thead className='bg-teal-50/50 text-slate-600 font-medium border-b border-slate-100'>
            <tr>
              <th className='px-6 py-4 w-[50px]'>#</th>
              <th className='px-6 py-4'>Bệnh nhân</th>
              <th className='px-6 py-4'>Lần khám gần nhất</th>
              <th className='px-6 py-4'>Loại khám</th>
              <th className='px-6 py-4'>Thông tin chính</th>
              <th className='px-6 py-4'>Trạng thái</th>
              <th className='px-6 py-4 text-right'>Thao tác</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100'>
            {patients.map((patient, index) => (
              <tr
                key={patient.id}
                className='hover:bg-slate-50/50 transition-colors group'
              >
                <td className='px-6 py-4 text-slate-500'>{index + 1}</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10 border border-slate-100'>
                      <AvatarImage src={patient.avatar} alt={patient.name} />
                      <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-bold text-slate-900'>{patient.name}</p>
                      <p className='text-xs text-slate-500'>
                        {patient.gender} · {patient.age} tuổi · {patient.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <p className='text-slate-900 font-medium'>
                    {patient.lastVisit.time}
                  </p>
                  <p className='text-xs text-slate-500'>
                    {patient.lastVisit.reason}
                  </p>
                </td>
                <td className='px-6 py-4'>
                  <Badge
                    variant='secondary'
                    className={cn(
                      'font-normal',
                      patient.visitType.type === 'video'
                        ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                    )}
                  >
                    {patient.visitType.type === 'video'
                      ? 'Khám từ xa · Video call'
                      : 'Khám trực tiếp · ' + patient.visitType.detail}
                  </Badge>
                </td>
                <td className='px-6 py-4 max-w-[200px]'>
                  <p className='text-xs text-slate-600 truncate'>
                    <span className='text-slate-400'>Dị ứng:</span>{' '}
                    {patient.keyInfo.allergies}
                  </p>
                  <p className='text-xs text-slate-600 truncate'>
                    <span className='text-slate-400'>Thuốc đang dùng:</span>{' '}
                    {patient.keyInfo.medications}
                  </p>
                </td>
                <td className='px-6 py-4'>
                  {patient.status === 'examined' && (
                    <Badge className='bg-slate-100 text-slate-600 hover:bg-slate-200 border-none font-normal'>
                      Đã khám
                    </Badge>
                  )}
                  {patient.status === 'waiting' && (
                    <Badge className='bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-100 font-normal'>
                      Đang khám
                    </Badge>
                  )}
                  {patient.status === 'cancelled' && (
                    <Badge className='bg-red-50 text-red-700 hover:bg-red-100 border-none font-normal'>
                      Đã hủy
                    </Badge>
                  )}
                </td>
                <td className='px-6 py-4 text-right'>
                  <Button
                    variant='ghost'
                    className='text-teal-600 hover:text-teal-700 hover:bg-teal-50 p-0 h-auto font-medium text-xs flex items-center gap-1 ml-auto'
                    onClick={() => {
                      if (patient.status === 'examined') {
                        window.location.href = `/doctor/my-patient/detail/${patient.id}`;
                      }
                    }}
                  >
                    {patient.status === 'waiting'
                      ? 'Tiếp tục khám'
                      : patient.status === 'examined'
                        ? 'Xem hồ sơ'
                        : 'Chuẩn bị khám'}
                    <ChevronRight className='w-4 h-4' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500'>
        <span>Hiển thị 1-6 trên 42 bệnh nhân</span>
        <div className='flex gap-2'>
          <span className='cursor-pointer hover:text-teal-600'>Trước</span>
          <span className='w-6 h-6 flex items-center justify-center bg-teal-50 text-teal-700 rounded font-medium cursor-pointer'>
            1
          </span>
          <span className='w-6 h-6 flex items-center justify-center hover:bg-slate-50 rounded cursor-pointer'>
            2
          </span>
          <span className='w-6 h-6 flex items-center justify-center hover:bg-slate-50 rounded cursor-pointer'>
            3
          </span>
          <span className='cursor-pointer hover:text-teal-600'>Tiếp</span>
        </div>
      </div>
    </div>
  );
};
