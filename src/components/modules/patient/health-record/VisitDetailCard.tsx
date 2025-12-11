import { Download } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Visit } from './data';

interface VisitDetailCardProps {
  visit: Visit;
}

export const VisitDetailCard = ({ visit }: VisitDetailCardProps) => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>
            Chi tiết lần khám được chọn
          </h3>
          <p className='text-sm text-slate-500'>
            Tổng quan lần khám ngày {visit.date.split('-').reverse().join('/')}{' '}
            với {visit.doctor}.
          </p>
        </div>
        <Button
          variant='outline'
          size='sm'
          className='text-teal-600 border-teal-200 hover:bg-teal-50'
        >
          <Download className='w-4 h-4 mr-2' />
          Tải PDF
        </Button>
      </div>

      <div className='bg-slate-50 rounded-lg p-3 mb-6 flex flex-wrap gap-4 items-center text-sm'>
        <span className='font-semibold text-teal-700'>
          Mã hồ sơ: {visit.id}
        </span>
        <span className='text-slate-400'>|</span>
        <span className='text-slate-600'>Thời gian: {visit.time}</span>
        <span className='text-slate-400'>|</span>
        <span className='text-slate-600'>Phòng khám: {visit.department}</span>
      </div>

      <div className='space-y-6'>
        {/* Reason */}
        <div>
          <h4 className='font-bold text-slate-900 mb-2'>Lý do khám</h4>
          <p className='text-sm text-slate-600 leading-relaxed'>
            {visit.reason}
          </p>
        </div>

        {/* Vitals */}
        {visit.vitals && (
          <div>
            <h4 className='font-bold text-slate-900 mb-3'>
              Chỉ số tại thời điểm khám
            </h4>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex justify-between p-3 bg-slate-50 rounded-lg'>
                <span className='text-sm text-slate-500'>Huyết áp</span>
                <span className='text-sm font-bold text-slate-900'>
                  {visit.vitals.bloodPressure} mmHg
                </span>
              </div>
              <div className='flex justify-between p-3 bg-slate-50 rounded-lg'>
                <span className='text-sm text-slate-500'>Nhịp tim</span>
                <span className='text-sm font-bold text-slate-900'>
                  {visit.vitals.heartRate} bpm
                </span>
              </div>
              <div className='flex justify-between p-3 bg-slate-50 rounded-lg'>
                <span className='text-sm text-slate-500'>Chiều cao</span>
                <span className='text-sm font-bold text-slate-900'>
                  {visit.vitals.height} cm
                </span>
              </div>
              <div className='flex justify-between p-3 bg-slate-50 rounded-lg'>
                <span className='text-sm text-slate-500'>Cân nặng</span>
                <span className='text-sm font-bold text-slate-900'>
                  {visit.vitals.weight} kg
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Diagnosis */}
        <div>
          <h4 className='font-bold text-slate-900 mb-2'>Chẩn đoán chính</h4>
          <div className='flex gap-2'>
            {visit.diagnosisTags?.map((tag) => (
              <Badge
                key={tag}
                variant='secondary'
                className='bg-teal-50 text-teal-700 hover:bg-teal-100'
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Prescription */}
        {visit.prescription && visit.prescription.length > 0 && (
          <div>
            <h4 className='font-bold text-slate-900 mb-3'>Đơn thuốc</h4>
            <div className='space-y-3'>
              {visit.prescription.map((drug, index) => (
                <div
                  key={index}
                  className='flex justify-between items-start border-b border-slate-100 pb-3 last:border-0 last:pb-0'
                >
                  <div>
                    <p className='font-semibold text-slate-900'>{drug.name}</p>
                    <p className='text-xs text-slate-500 mt-1'>
                      Số lượng: {drug.dosage} •{' '}
                      {drug.instruction.split(',')[1] || 'Theo chỉ định'}
                    </p>
                  </div>
                  <p className='text-xs text-slate-500 text-right max-w-[40%]'>
                    {drug.instruction.split(',')[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doctor Note */}
        {visit.doctorNote && (
          <div className='bg-yellow-50 rounded-xl p-4 border border-yellow-100'>
            <h4 className='font-bold text-yellow-800 mb-2'>
              Ghi chú của bác sĩ
            </h4>
            <p className='text-sm text-yellow-700 leading-relaxed'>
              {visit.doctorNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
