'use client';

import {
  CalendarX,
  Search,
  Filter,
  Calendar as CalendarIcon,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { clientFetcher } from '@/lib/fetcher';
import { Appointment, AppointmentHistoryResponse } from '@/types/appointment';

import { AppointmentCard } from './AppointmentCard';

export const AppointmentHistoryList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 2,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setIsError(false);
      try {
        // Build query string with filters
        const queryParams = new URLSearchParams({
          page: meta.page.toString(),
          limit: meta.limit.toString(),
        });

        if (searchTerm) queryParams.append('search', searchTerm);
        if (statusFilter !== 'all') queryParams.append('status', statusFilter);
        if (timeFilter !== 'all') queryParams.append('period', timeFilter);

        const response = await clientFetcher.get(
          `/patients/me/appointments?${queryParams.toString()}`
        );
        const data = response as AppointmentHistoryResponse;
        setAppointments(data.data || []);
        setMeta(data.meta || meta);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.page, statusFilter, timeFilter]); // Debounce search in a real app

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.totalPages) {
      setMeta((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className='space-y-6'>
      {/* Management Tools: Search & Filters */}
      <div className='flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border shadow-sm'>
        <div className='relative w-full md:w-72'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm bác sĩ, triệu chứng...'
            className='pl-9 bg-muted/50 border-input/60 focus:bg-background transition-colors'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='flex w-full md:w-auto gap-3 overflow-x-auto pb-2 md:pb-0'>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className='w-[160px] bg-muted/50 border-input/60'>
              <div className='flex items-center gap-2'>
                <Filter className='h-4 w-4 text-muted-foreground' />
                <SelectValue placeholder='Trạng thái' />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả trạng thái</SelectItem>
              <SelectItem value='UPCOMING'>Sắp tới</SelectItem>
              <SelectItem value='COMPLETED'>Đã khám</SelectItem>
              <SelectItem value='CANCELLED'>Đã hủy</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className='w-[150px] bg-muted/50 border-input/60'>
              <div className='flex items-center gap-2'>
                <CalendarIcon className='h-4 w-4 text-muted-foreground' />
                <SelectValue placeholder='Thời gian' />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Toàn bộ</SelectItem>
              <SelectItem value='this_month'>Tháng này</SelectItem>
              <SelectItem value='last_month'>Tháng trước</SelectItem>
              <SelectItem value='upcoming'>Sắp tới</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className='h-32 w-full rounded-xl' />
          ))}
        </div>
      ) : isError ? (
        <div className='flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50 p-8 text-center'>
          <p className='font-medium text-red-600'>
            Đã có lỗi xảy ra khi tải dữ liệu.
          </p>
          <Button
            variant='outline'
            className='mt-4 border-red-200 text-red-600 hover:bg-red-100'
            onClick={() => window.location.reload()}
          >
            Thử lại
          </Button>
        </div>
      ) : appointments.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 text-center border rounded-xl bg-slate-50/50 border-dashed'>
          <div className='bg-white p-4 rounded-full mb-4 shadow-sm ring-1 ring-slate-100'>
            <CalendarX className='w-10 h-10 text-muted-foreground/70' />
          </div>
          <h3 className='text-lg font-semibold text-foreground'>
            Không tìm thấy lịch hẹn
          </h3>
          <p className='text-muted-foreground max-w-sm mt-1 mb-6'>
            Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.
          </p>
          {(searchTerm || statusFilter !== 'all' || timeFilter !== 'all') && (
            <Button
              variant='outline'
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTimeFilter('all');
              }}
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className='grid gap-4'>
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>

          {meta.totalPages > 1 && (
            <div className='flex justify-center pt-8 border-t'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href='#'
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(meta.page - 1);
                      }}
                      className={
                        meta.page <= 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href='#'
                          isActive={page === meta.page}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href='#'
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(meta.page + 1);
                      }}
                      className={
                        meta.page >= meta.totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};
