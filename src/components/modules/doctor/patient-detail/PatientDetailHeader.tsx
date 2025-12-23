'use client';

import { ArrowLeft, Edit3, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMe } from '@/hooks/use-me';

import { CreatePrescriptionModal } from './CreatePrescriptionModal';
import { PatientDetail } from './data';

interface PatientDetailHeaderProps {
  patient: PatientDetail;
}

export const PatientDetailHeader = ({ patient }: PatientDetailHeaderProps) => {
  const { user } = useMe();
  const router = useRouter();

  return (
    <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6'>
      <div
        className='flex items-center gap-2 text-sm text-slate-500 mb-4 cursor-pointer hover:text-teal-600 w-fit'
        onClick={() => router.back()}
      >
        <ArrowLeft className='w-4 h-4' />
        <span>Bệnh nhân của tôi</span>
        <span>/</span>
        <span className='font-bold text-slate-900'>{patient.id}</span>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-start gap-6'>
        <div className='flex gap-4'>
          <Avatar className='h-16 w-16 border border-slate-100'>
            <AvatarImage src={patient.avatar} alt={patient.name} />
            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className='flex items-center gap-3 mb-1'>
              <h1 className='text-xl font-bold text-slate-900'>
                {patient.name}
              </h1>
              <Badge
                variant='secondary'
                className='bg-slate-100 text-slate-600 font-normal'
              >
                {patient.id}
              </Badge>
            </div>
            <p className='text-sm text-slate-500 mb-2'>
              {patient.gender} · {patient.age} tuổi · {patient.dob} ·{' '}
              {patient.address}
            </p>
            <div className='flex flex-wrap gap-2'>
              {patient.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant='secondary'
                  className={`font-normal ${tag.includes('Dị ứng') ? 'bg-red-50 text-red-700' : 'bg-teal-50 text-teal-700'}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-end gap-2 w-full md:w-auto'>
          <div className='text-right text-xs text-slate-500 mb-2'>
            <p>
              Lần khám gần nhất:{' '}
              <span className='font-bold text-slate-900'>Hôm nay - 08:00</span>
            </p>
            <p>
              Bác sĩ phụ trách:{' '}
              <span className='font-bold text-slate-900'>{user?.fullName}</span>
            </p>
            <Badge className='bg-green-500 hover:bg-green-600 text-white border-none mt-1'>
              Đã khám xong
            </Badge>
          </div>
          <div className='flex gap-2 w-full md:w-auto'>
            <Button
              variant='outline'
              className='flex-1 md:flex-none text-teal-600 border-teal-200 bg-teal-50 hover:bg-teal-100'
            >
              <Calendar className='w-4 h-4 mr-2' />
              Mở buổi khám hôm nay
            </Button>
            <CreatePrescriptionModal appointmentId={patient.todayVisit.id} />
          </div>
        </div>
      </div>

      <div className='mt-4 pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600'>
        <span className='font-bold text-slate-900 whitespace-nowrap'>
          Kế hoạch hiện tại:
        </span>
        <span>{patient.currentPlan}</span>
      </div>
    </div>
  );
};
