import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConsultationItem } from '@/hooks/use-health-record';
import { cn } from '@/lib/utils';

interface VisitHistoryListProps {
  consultations: ConsultationItem[];
  selectedVisitId: string;
  onSelectVisit: (id: string) => void;
  loading?: boolean;
}

const getExaminationTypeLabel = (type: string) => {
  switch (type) {
    case 'OFFLINE':
      return 'offline';
    case 'ONLINE':
      return 'online';
    default:
      return 'offline';
  }
};

export const VisitHistoryList = ({
  consultations,
  selectedVisitId,
  onSelectVisit,
  loading,
}: VisitHistoryListProps) => {
  const [filter, setFilter] = React.useState<'all' | 'offline' | 'online'>(
    'all'
  );

  const filteredVisits = consultations.filter(
    (visit) =>
      filter === 'all' ||
      getExaminationTypeLabel(visit.examinationType) === filter
  );

  if (loading) {
    return (
      <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
        <div className='flex justify-center py-8'>
          <Loader2 className='w-6 h-6 animate-spin text-teal-600' />
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>Lịch sử khám</h3>
          <p className='text-sm text-slate-500'>
            Chọn một lần khám để xem chi tiết.
          </p>
        </div>
        <span className='text-xs text-slate-400 cursor-pointer hover:text-teal-600'>
          Lọc nâng cao
        </span>
      </div>

      <div className='flex gap-2 mb-6'>
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setFilter('all')}
          className={cn(
            'rounded-full',
            filter === 'all'
              ? 'bg-teal-600 hover:bg-teal-700'
              : 'text-slate-600'
          )}
        >
          Tất cả
        </Button>
        <Button
          variant={filter === 'offline' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setFilter('offline')}
          className={cn(
            'rounded-full',
            filter === 'offline'
              ? 'bg-teal-600 hover:bg-teal-700'
              : 'text-slate-600'
          )}
        >
          Khám tại bệnh viện
        </Button>
        <Button
          variant={filter === 'online' ? 'default' : 'outline'}
          size='sm'
          onClick={() => setFilter('online')}
          className={cn(
            'rounded-full',
            filter === 'online'
              ? 'bg-teal-600 hover:bg-teal-700'
              : 'text-slate-600'
          )}
        >
          Khám từ xa
        </Button>
      </div>

      {filteredVisits.length === 0 ? (
        <div className='text-center py-8 text-slate-500'>
          <p className='text-sm'>Chưa có lịch sử khám nào</p>
        </div>
      ) : (
        <div className='space-y-4 max-h-[500px] overflow-y-auto'>
          {filteredVisits.map((visit) => (
            <div
              key={visit.id}
              onClick={() => onSelectVisit(visit.id)}
              className={cn(
                'p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md',
                selectedVisitId === visit.id
                  ? 'bg-teal-50 border-teal-200 ring-1 ring-teal-200'
                  : 'bg-slate-50 border-slate-100 hover:border-teal-100'
              )}
            >
              <div className='flex justify-between items-start mb-2'>
                <span className='text-sm font-bold text-teal-700'>
                  {format(new Date(visit.appointmentDate), 'dd/MM/yyyy')}
                </span>
                <Badge
                  variant='secondary'
                  className='bg-white text-teal-700 border border-teal-100 text-[10px]'
                >
                  {visit.completedAt ? 'Đã hoàn thành' : 'Đang xử lý'}
                </Badge>
              </div>

              <h4 className='font-bold text-slate-900 mb-1'>
                Khám {visit.doctor.primarySpecialty?.name || 'Tổng quát'}
              </h4>
              <p className='text-sm text-slate-500 mb-3'>
                BS. {visit.doctor.user.fullName} •{' '}
                {visit.examinationType === 'ONLINE'
                  ? 'Video call'
                  : 'Tại bệnh viện'}
              </p>

              <div className='flex flex-wrap gap-2'>
                {visit.symptoms && (
                  <Badge
                    variant='outline'
                    className='bg-white text-slate-600 border-slate-200 font-normal'
                  >
                    {visit.symptoms.length > 30
                      ? visit.symptoms.slice(0, 30) + '...'
                      : visit.symptoms}
                  </Badge>
                )}
                {visit.diagnosis && (
                  <Badge
                    variant='outline'
                    className='bg-teal-50 text-teal-700 border-teal-200 font-normal'
                  >
                    {visit.diagnosis.length > 30
                      ? visit.diagnosis.slice(0, 30) + '...'
                      : visit.diagnosis}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
