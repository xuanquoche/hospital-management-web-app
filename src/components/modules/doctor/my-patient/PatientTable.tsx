import { format } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MyPatient } from '@/types/my-patient';

interface PatientTableProps {
  patients: MyPatient[];
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
            {patients.map((patient, index) => {
              const age = patient.dateOfBirth
                ? new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()
                : 'N/A';

              return (
                <tr key={patient.id} className='hover:bg-slate-50/50 transition-colors group'>
                  <td className='px-6 py-4 text-slate-500'>{index + 1}</td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-10 w-10 border border-slate-100'>
                        <AvatarImage src={patient.user.avatar || ''} alt={patient.user.fullName} />
                        <AvatarFallback>{patient.user.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='font-bold text-slate-900'>{patient.user.fullName}</p>
                        <p className='text-xs text-slate-500'>
                          {patient.gender || 'N/A'} · {age} tuổi · {patient.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    {patient.lastAppointment ? (
                      <>
                        <p className='text-slate-900 font-medium'>
                          {format(new Date(patient.lastAppointment.appointmentDate), 'dd/MM/yyyy HH:mm')}
                        </p>
                        <p className='text-xs text-slate-500 truncate max-w-[150px]'>
                          {patient.lastAppointment.symptoms || 'Không có triệu chứng'}
                        </p>
                      </>
                    ) : (
                      <p className='text-slate-500 italic'>Chưa khám</p>
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    {/* Assuming visit type logic or default */}
                    <Badge variant='secondary' className='bg-teal-50 text-teal-700 hover:bg-teal-100 font-normal'>
                      Khám trực tiếp
                    </Badge>
                  </td>
                  <td className='px-6 py-4 max-w-[200px]'>
                    <p className='text-xs text-slate-600 truncate'>
                      <span className='text-slate-400'>Dị ứng:</span> {patient.allergies || 'Không'}
                    </p>
                    <p className='text-xs text-slate-600 truncate'>
                      <span className='text-slate-400'>Bệnh mãn tính:</span> {patient.chronicDisease || 'Không'}
                    </p>
                  </td>
                  <td className='px-6 py-4'>
                    {patient.lastAppointment?.status === 'COMPLETED' && (
                      <Badge className='bg-slate-100 text-slate-600 hover:bg-slate-200 border-none font-normal'>
                        Đã khám
                      </Badge>
                    )}
                    {patient.lastAppointment?.status === 'CONFIRMED' && (
                      <Badge className='bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-100 font-normal'>
                        Đang chờ
                      </Badge>
                    )}
                    {patient.lastAppointment?.status === 'CANCELLED' && (
                      <Badge className='bg-red-50 text-red-700 hover:bg-red-100 border-none font-normal'>Đã hủy</Badge>
                    )}
                    {!patient.lastAppointment && (
                      <Badge className='bg-gray-50 text-gray-500 border-gray-200 font-normal'>Mới</Badge>
                    )}
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <Button
                      variant='ghost'
                      className='text-teal-600 hover:text-teal-700 hover:bg-teal-50 p-0 h-auto font-medium text-xs flex items-center gap-1 ml-auto'
                      onClick={() => {
                        window.location.href = `/doctor/my-patient/detail/${patient.id}`;
                      }}
                    >
                      Xem hồ sơ
                      <ChevronRight className='w-4 h-4' />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className='p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500'>
        <span>Hiển thị {patients.length} bệnh nhân</span>
        {/* Pagination UI can be implemented later if API supports it in meta */}
      </div>
    </div>
  );
};
