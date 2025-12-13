'use client';

import { useEffect, useState } from 'react';

import { useDebounceSearch } from '@/hooks/use-debounce-search';
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

  const [filters, setFilters] = useState<QueryMedicineBatchDto>({
    page: 1,
    limit: 10,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounceSearch(searchQuery, 500);

  const fetchMedicines = async (params: QueryMedicineBatchDto) => {
    try {
      setLoading(true);
      const queryString = new URLSearchParams();

      if (params.page) queryString.append('page', params.page.toString());
      if (params.limit) queryString.append('limit', params.limit.toString());
      if (params.status) queryString.append('status', params.status);
      if (params.categoryId)
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
  };

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: debouncedSearch, page: 1 }));
  }, [debouncedSearch]);

  useEffect(() => {
    fetchMedicines(filters);
  }, [
    filters.page,
    filters.limit,
    filters.status,
    filters.categoryId,
    filters.search,
    filters.expiryDateBefore,
    filters.expiryDateAfter,
  ]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleFilterChange = (newFilters: Partial<QueryMedicineBatchDto>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  return (
    <div className='flex h-[calc(100vh-100px)] gap-6'>
      <div className='flex flex-1 flex-col gap-6 overflow-hidden rounded-xl bg-white p-6 shadow-sm'>
        <MedicineListHeader />

        <MedicineFilter
          onSearchChange={setSearchQuery}
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
