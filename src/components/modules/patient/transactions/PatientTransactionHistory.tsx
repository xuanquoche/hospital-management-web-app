'use client';

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Filter,
  Search,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { clientFetcher } from '@/lib/fetcher';
import {
  TransactionHistoryResponse,
  TransactionHistoryMeta,
  TransactionItem,
} from '@/types/payment';

import { TransactionCard } from './TransactionCard';

export const PatientTransactionHistory = () => {
  const [page, setPage] = useState(1);
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [meta, setMeta] = useState<TransactionHistoryMeta | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await clientFetcher.get(
          `/patients/me/payments?page=${page}&limit=10`
        );
        const data = res as TransactionHistoryResponse;
        setTransactions(data.data || []);
        setMeta(data.meta || null);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [page, filterPeriod]);

  const handleNextPage = () => {
    if (meta?.hasNextPage) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (meta?.hasPreviousPage) setPage((prev) => prev - 1);
  };

  return (
    <div className='max-w-[1200px] mx-auto p-4 md:p-8'>
      {/* Header Section */}
      <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>
            Lịch sử giao dịch
          </h1>
          <p className='text-slate-500 mt-1'>
            Quản lý và theo dõi các khoản thanh toán của bạn.
          </p>
        </div>

        {/* Filters & Actions */}
        <div className='flex flex-wrap items-center gap-3'>
          <div className='relative w-full md:w-64'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <Input
              placeholder='Tìm theo mã giao dịch...'
              className='pl-9 bg-white border-slate-200'
            />
          </div>
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className='w-[140px] bg-white border-slate-200'>
              <div className='flex items-center gap-2'>
                <Calendar className='h-4 w-4 text-slate-500' />
                <SelectValue placeholder='Thời gian' />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả</SelectItem>
              <SelectItem value='this_month'>Tháng này</SelectItem>
              <SelectItem value='last_month'>Tháng trước</SelectItem>
              <SelectItem value='3_months'>3 tháng qua</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline' className='gap-2 bg-white text-slate-600'>
            <Filter className='h-4 w-4' />
            <span className='hidden sm:inline'>Bộ lọc</span>
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className='space-y-6'>
        {isLoading ? (
          // Loading Skeletons
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-5'
            >
              <Skeleton className='h-10 w-10 rounded-full' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-24' />
              </div>
              <Skeleton className='h-8 w-24' />
            </div>
          ))
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
        ) : transactions.length === 0 ? (
          <div className='flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center'>
            <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm'>
              <CreditCard className='h-8 w-8 text-slate-400' />
            </div>
            <h3 className='text-lg font-bold text-slate-900'>
              Chưa có giao dịch nào
            </h3>
            <p className='mt-2 max-w-sm text-sm text-slate-500'>
              Bạn chưa thực hiện bất kỳ giao dịch thanh toán nào. Khi bạn đặt
              lịch khám, lịch sử thanh toán sẽ xuất hiện ở đây.
            </p>
            <Button className='mt-6 bg-teal-600 hover:bg-teal-700'>
              Đặt lịch khám ngay
            </Button>
          </div>
        ) : (
          <>
            <div className='grid gap-4'>
              {transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
              <div className='flex items-center justify-between border-t border-slate-100 pt-6'>
                <p className='text-sm text-slate-500'>
                  Hiển thị {(meta.page - 1) * meta.limit + 1} -{' '}
                  {Math.min(meta.page * meta.limit, meta.totalItems)} trong tổng
                  số{' '}
                  <span className='font-medium text-slate-900'>
                    {meta.totalItems}
                  </span>{' '}
                  giao dịch
                </p>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handlePrevPage}
                    disabled={!meta.hasPreviousPage}
                    className='h-8 w-8 p-0'
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </Button>
                  <span className='text-sm font-medium text-slate-700'>
                    Trang {meta.page}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleNextPage}
                    disabled={!meta.hasNextPage}
                    className='h-8 w-8 p-0'
                  >
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
