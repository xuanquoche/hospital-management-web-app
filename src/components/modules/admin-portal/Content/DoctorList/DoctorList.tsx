'use client';

import { Plus, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PRIVATE_ROUTES } from '@/const/routes';
import { clientFetcher } from '@/lib/fetcher';
import { PaginatedResponse } from '@/types/api-responses';

import { CreateScheduleModal } from './CreateScheduleModal';
import DoctorFilters from './DoctorFilters';
import DoctorTable, { Doctor } from './DoctorTable';

const DoctorList = () => {
  const t = useTranslations('Admin.DoctorList');
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyId, setSpecialtyId] = useState('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Schedule Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDoctorForSchedule, setSelectedDoctorForSchedule] =
    useState<Doctor | null>(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(searchQuery && { name: searchQuery }),
        ...(specialtyId && specialtyId !== 'all' && { specialtyId }),
      });

      const response = await clientFetcher.get<PaginatedResponse<Doctor>>(
        `/admin/doctors?${queryParams.toString()}`
      );
      if (response.success && response.data) {
        setDoctors(response.data);
        if (response.meta) {
          setTotalPages(response.meta.totalPages);
          setTotalItems(response.meta.total);
        }
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDoctors();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, specialtyId, page]);

  const handleSearch = React.useCallback((query: string) => {
    setSearchQuery((prev) => {
      if (prev !== query) {
        setPage(1); // Reset only if query changed
        return query;
      }
      return prev;
    });
  }, []);

  const handleSpecialtyChange = React.useCallback((value: string) => {
    setSpecialtyId((prev) => {
      if (prev !== value) {
        setPage(1);
        return value;
      }
      return prev;
    });
  }, []);

  const handleAddSchedule = (doctor: Doctor) => {
    setSelectedDoctorForSchedule(doctor);
    setIsScheduleModalOpen(true);
  };

  const prevButtonClass =
    page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer';
  const nextButtonClass =
    page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer';

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-bold text-slate-900'>{t('title')}</h2>
          <p className='text-sm text-slate-500'>{t('subtitle')}</p>
        </div>
        <div className='flex gap-3'>
          <Button
            variant='outline'
            className='border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-100 hover:text-teal-800'
          >
            <Calendar className='mr-2 h-4 w-4' />
            {t('schedule')}
          </Button>
          <Button
            className='bg-teal-600 hover:bg-teal-700 '
            onClick={() => router.push(PRIVATE_ROUTES.ADMIN_DOCTOR_CREATE)}
          >
            <Plus className='mr-2 h-4 w-4' />
            {t('createDoctor')}
          </Button>
        </div>
      </div>

      <DoctorFilters
        onSearch={handleSearch}
        onSpecialtyChange={handleSpecialtyChange}
      />
      <DoctorTable
        doctors={doctors}
        loading={loading}
        totalItems={totalItems}
        onAddSchedule={handleAddSchedule}
      />

      {/* Pagination */}
      {doctors.length > 0 && totalPages > 1 && (
        <Pagination className='mt-4 justify-end'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
                className={prevButtonClass}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {(() => {
              const pages = [];
              // Always show page 1
              pages.push(1);

              if (page > 3) {
                pages.push('ellipsis-start');
              }

              // Pages around current
              const start = Math.max(2, page - 1);
              const end = Math.min(totalPages - 1, page + 1);

              for (let i = start; i <= end; i++) {
                pages.push(i);
              }

              if (page < totalPages - 2) {
                pages.push('ellipsis-end');
              }

              // Always show last page if > 1
              if (totalPages > 1) {
                pages.push(totalPages);
              }

              return pages.map((p, index) => {
                if (p === 'ellipsis-start' || p === 'ellipsis-end') {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href='#'
                      isActive={page === p}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(p as number);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                );
              });
            })()}

            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage(page + 1);
                }}
                className={nextButtonClass}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <CreateScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        doctor={selectedDoctorForSchedule}
      />
    </div>
  );
};

export default DoctorList;
