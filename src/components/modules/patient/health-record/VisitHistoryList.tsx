import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Visit } from './data';

interface VisitHistoryListProps {
  visits: Visit[];
  selectedVisitId: string;
  onSelectVisit: (id: string) => void;
}

export const VisitHistoryList = ({
  visits,
  selectedVisitId,
  onSelectVisit,
}: VisitHistoryListProps) => {
  const [filter, setFilter] = React.useState<'all' | 'offline' | 'online'>(
    'all'
  );

  const filteredVisits = visits.filter(
    (visit) => filter === 'all' || visit.type === filter
  );

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

      <div className='space-y-4'>
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
                {visit.date.split('-').reverse().join('/')}
              </span>
              <Badge
                variant='secondary'
                className='bg-white text-teal-700 border border-teal-100 text-[10px]'
              >
                Đã hoàn thành
              </Badge>
            </div>

            <h4 className='font-bold text-slate-900 mb-1'>{visit.title}</h4>
            <p className='text-sm text-slate-500 mb-3'>
              {visit.doctor} • {visit.facility}
            </p>

            <div className='flex flex-wrap gap-2'>
              {visit.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant='outline'
                  className='bg-white text-slate-600 border-slate-200 font-normal'
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
