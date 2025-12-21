'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { clientFetcher } from '@/lib/fetcher';
import { Payment } from '@/types/payment';

import { TransactionFilter } from './TransactionFilter';
import { TransactionListHeader } from './TransactionListHeader';
import { TransactionStats } from './TransactionStats';
import { TransactionTable } from './TransactionTable';

export function TransactionList() {
  const [transactions, setTransactions] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<any>(null);

  const itemsPerPage = 10;

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', itemsPerPage.toString());

      if (filters) {
        if (filters.paymentCode) params.append('paymentCode', filters.paymentCode);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.doctorId) params.append('doctorId', filters.doctorId);
        if (filters.patientSearch) params.append('patientSearch', filters.patientSearch);
        if (filters.status) params.append('status', filters.status);
        if (filters.method) params.append('method', filters.method);
      }

      const res = await clientFetcher.get<any>(`/admin/payments?${params.toString()}`);

      if (res) {
        // Handle response structure based on user provided example
        // { success: true, data: [...], meta: { ... } }
        const dataList = Array.isArray(res.data) ? res.data : [];
        const meta = res.meta || {};

        setTransactions(dataList);

        if (meta.totalPages) {
          setTotalPages(meta.totalPages);
        } else if (meta.totalItems) {
          setTotalPages(Math.ceil(meta.totalItems / itemsPerPage));
        } else {
          setTotalPages(1);
        }
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleFilterChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pageNumbers.push(i);
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 2; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  if (loading && !transactions.length && !filters) {
    return <div>Loading initial data...</div>;
  }

  return (
    <div className='flex flex-col gap-6'>
      <TransactionListHeader />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
        <div className='lg:col-span-3 space-y-6'>
          <TransactionFilter onFilterChange={handleFilterChange} />

          <TransactionTable transactions={transactions} />

          {totalPages > 1 && (
            <div className='py-4'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href='#'
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }}
                      aria-disabled={currentPage === 1}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((pageNumber, index) => (
                    <PaginationItem key={index}>
                      {pageNumber === 'ellipsis' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          href='#'
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber as number);
                          }}
                          isActive={pageNumber === currentPage}
                        >
                          {pageNumber}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href='#'
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }}
                      aria-disabled={currentPage === totalPages}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
        <div>
          <TransactionStats />
        </div>
      </div>
    </div>
  );
}
