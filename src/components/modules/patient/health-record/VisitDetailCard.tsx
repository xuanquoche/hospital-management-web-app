import { format } from 'date-fns';
import { Download, FileText, Loader2 } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConsultationItem } from '@/hooks/use-health-record';

interface VisitDetailCardProps {
  visit: ConsultationItem | null;
  loading?: boolean;
}

export const VisitDetailCard = ({ visit, loading }: VisitDetailCardProps) => {
  if (loading) {
    return (
      <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
        <div className='flex justify-center py-8'>
          <Loader2 className='w-6 h-6 animate-spin text-teal-600' />
        </div>
      </div>
    );
  }

  if (!visit) {
    return (
      <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
        <div className='text-center py-8 text-slate-500'>
          <FileText className='w-12 h-12 mx-auto text-slate-300 mb-2' />
          <p className='text-sm'>Chọn một lần khám để xem chi tiết</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>
            Chi tiết lần khám được chọn
          </h3>
          <p className='text-sm text-slate-500'>
            Tổng quan lần khám ngày{' '}
            {format(new Date(visit.appointmentDate), 'dd/MM/yyyy')} với BS.{' '}
            {visit.doctor.user.fullName}.
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
          Mã hồ sơ: {visit.id.slice(0, 8).toUpperCase()}
        </span>
        <span className='text-slate-400'>|</span>
        <span className='text-slate-600'>
          Thời gian: {visit.timeSlot?.startTime || '--:--'} -{' '}
          {visit.timeSlot?.endTime || '--:--'}
        </span>
        <span className='text-slate-400'>|</span>
        <span className='text-slate-600'>
          Chuyên khoa: {visit.doctor.primarySpecialty?.name || 'Tổng quát'}
        </span>
      </div>

      <div className='space-y-6'>
        {visit.symptoms && (
          <div>
            <h4 className='font-bold text-slate-900 mb-2'>Triệu chứng</h4>
            <p className='text-sm text-slate-600 leading-relaxed'>
              {visit.symptoms}
            </p>
          </div>
        )}

        {visit.diagnosis && (
          <div>
            <h4 className='font-bold text-slate-900 mb-2'>Chẩn đoán</h4>
            <div className='flex gap-2 flex-wrap'>
              <Badge
                variant='secondary'
                className='bg-teal-50 text-teal-700 hover:bg-teal-100'
              >
                {visit.diagnosis}
              </Badge>
            </div>
          </div>
        )}

        {visit.prescriptionItems && visit.prescriptionItems.length > 0 && (
          <div>
            <h4 className='font-bold text-slate-900 mb-3'>Đơn thuốc</h4>
            <div className='space-y-3'>
              {visit.prescriptionItems.map((item) => (
                <div
                  key={item.id}
                  className='flex justify-between items-start border-b border-slate-100 pb-3 last:border-0 last:pb-0'
                >
                  <div>
                    <p className='font-semibold text-slate-900'>
                      {item.medicineBatch.medicine.name}
                    </p>
                    <p className='text-xs text-slate-500 mt-1'>
                      Số lượng: {item.quantity}{' '}
                      {item.medicineBatch.medicine.unit} • {item.dosage}
                    </p>
                  </div>
                  <p className='text-xs text-slate-500 text-right max-w-[40%]'>
                    {item.instructions}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {visit.notes && (
          <div className='bg-yellow-50 rounded-xl p-4 border border-yellow-100'>
            <h4 className='font-bold text-yellow-800 mb-2'>
              Ghi chú của bác sĩ
            </h4>
            <p className='text-sm text-yellow-700 leading-relaxed'>
              {visit.notes}
            </p>
          </div>
        )}

        {!visit.symptoms &&
          !visit.diagnosis &&
          (!visit.prescriptionItems || visit.prescriptionItems.length === 0) &&
          !visit.notes && (
            <div className='text-center py-8 text-slate-500'>
              <p className='text-sm'>
                Chưa có thông tin chi tiết cho lần khám này
              </p>
            </div>
          )}
      </div>
    </div>
  );
};
