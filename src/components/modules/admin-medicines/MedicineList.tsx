'use client';

import { useEffect, useState, useCallback } from 'react'; // Import useCallback

import { clientFetcher } from '@/lib/fetcher';
import {
  MedicineBatch,
  MedicineBatchResponse,
  QueryMedicineBatchDto,
  BatchStatus,
} from '@/types/medicine';

import { MedicineFilter } from './MedicineFilter';
import { MedicineListHeader } from './MedicineListHeader';
import { MedicineRightPanel } from './MedicineRightPanel';
import { MedicineTable } from './MedicineTable';

export const MedicineList = () => {
  const [data, setData] = useState<MedicineBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // 1. Quản lý toàn bộ filters trong state này (bao gồm cả search)
  const [filters, setFilters] = useState<QueryMedicineBatchDto>({
    page: 1,
    limit: 10,
    search: '', // Khởi tạo search rỗng
  });

  // 2. Hàm fetch dữ liệu (giữ nguyên logic fetch, chỉ thêm clean params)
  const fetchMedicines = useCallback(async (params: QueryMedicineBatchDto) => {
    try {
      setLoading(true);
      const queryString = new URLSearchParams();

      if (params.page) queryString.append('page', params.page.toString());
      if (params.limit) queryString.append('limit', params.limit.toString());

      // Xử lý logic 'all' hoặc string rỗng thì không gửi lên params
      if (params.status) queryString.append('status', params.status);
      if (params.categoryId && params.categoryId !== 'all')
        queryString.append('categoryId', params.categoryId);

      if (params.search) queryString.append('search', params.search);
      if (params.expiryDateBefore)
        queryString.append('expiryDateBefore', params.expiryDateBefore);
      if (params.expiryDateAfter)
        queryString.append('expiryDateAfter', params.expiryDateAfter);

      const response: MedicineBatchResponse = await clientFetcher.get(
        `/admin/medicine-batches?${queryString.toString()}`
      );

      if (response.success) {
        setData(response.data);
        setMeta(response.meta);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. CORE FIX: Debounce toàn bộ useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMedicines(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchMedicines, filters]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleFilterChange = (newFilters: Partial<QueryMedicineBatchDto>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
  };

  return (
    <div className='flex h-[calc(100vh-100px)] gap-6'>
      <div className='flex flex-1 flex-col gap-6 overflow-hidden rounded-xl bg-white p-6 shadow-sm'>
        <MedicineListHeader />

        <MedicineFilter
          onSearchChange={handleSearchChange}
          onStatusChange={(status) =>
            handleFilterChange({ status: status as BatchStatus })
          }
          onCategoryChange={(categoryId) => handleFilterChange({ categoryId })}
          onExpiryDateBeforeChange={(date) =>
            handleFilterChange({ expiryDateBefore: date })
          }
          onExpiryDateAfterChange={(date) =>
            handleFilterChange({ expiryDateAfter: date })
          }
        />

        <MedicineTable
          data={data}
          loading={loading}
          meta={meta}
          onPageChange={handlePageChange}
        />
      </div>

      <MedicineRightPanel />
    </div>
  );
};
