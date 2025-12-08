'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Columns, Download, Loader2 } from 'lucide-react';
import { clientFetcher } from '@/lib/fetcher';
import { toast } from 'react-toastify';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import CreateSpecialtyModal from './CreateSpecialtyModal';

interface Specialty {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  department: {
    id: string;
    name: string;
  } | null;
}

interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface SpecialtyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Specialty[];
  meta: PaginationMeta;
}

const ITEMS_PER_PAGE = 10;

const SpecialtyList = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(
    null
  );

  const fetchSpecialties = async (page: number) => {
    try {
      setIsLoading(true);

      const res = await clientFetcher.get(
        `/specialties?page=${page}&limit=${ITEMS_PER_PAGE}`
      );

      const responseData = res as SpecialtyResponse;

      if (responseData.success) {
        setSpecialties(responseData.data);
        setMeta(responseData.meta);
      }
    } catch (error) {
      console.error('Error fetching specialties:', error);
      toast.error('Failed to fetch specialties');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= meta.totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setIsModalOpen(true);
  };

  const handleDelete = async (specialtyId: string) => {
    if (!confirm('Are you sure you want to delete this specialty?')) return;
    try {
      setIsLoading(true);
      const res = await clientFetcher.delete(`/specialties/${specialtyId}`);
      const responseData = res as SpecialtyResponse;
      if (responseData.success) {
        toast.success('Specialty deleted successfully');
        fetchSpecialties(currentPage);
      }
    } catch (error) {
      console.error('Error deleting specialty:', error);
      toast.error('Failed to delete specialty');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSpecialty(null);
  };

  const handleModalSuccess = () => {
    fetchSpecialties(currentPage);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-slate-500'>
          Specialty List • Showing{' '}
          {specialties.length > 0 ? (meta.page - 1) * meta.limit + 1 : 0}–
          {Math.min(meta.page * meta.limit, meta.totalItems)} of{' '}
          {meta.totalItems}
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='h-8 gap-2 text-slate-600'
          >
            <Columns className='h-4 w-4' />
            Columns
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='h-8 gap-2 text-slate-600'
          >
            <Download className='h-4 w-4' />
            Export
          </Button>
        </div>
      </div>

      <div className='rounded-md border bg-white'>
        <Table>
          <TableHeader className='bg-teal-50/50'>
            <TableRow>
              <TableHead className='font-semibold text-teal-900'>
                Name
              </TableHead>
              <TableHead className='font-semibold text-teal-900'>
                Description
              </TableHead>
              <TableHead className='font-semibold text-teal-900'>
                Department
              </TableHead>
              <TableHead className='font-semibold text-teal-900'>
                Status
              </TableHead>
              <TableHead className='font-semibold text-teal-900'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  <div className='flex justify-center items-center gap-2'>
                    <Loader2 className='h-6 w-6 animate-spin text-teal-600' />
                    <span className='text-slate-500'>
                      Loading specialties...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : specialties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  No specialties found.
                </TableCell>
              </TableRow>
            ) : (
              specialties.map((specialty) => (
                <TableRow key={specialty.id}>
                  <TableCell className='font-medium text-slate-900'>
                    {specialty.name}
                  </TableCell>
                  <TableCell className='text-slate-600'>
                    {specialty.description || '—'}
                  </TableCell>
                  <TableCell className='text-slate-600'>
                    {specialty.department?.name || '—'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='secondary'
                      className={`
                        ${
                          specialty.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-100'
                        }
                        rounded-full px-3 font-normal
                      `}
                    >
                      {specialty.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2 text-xs font-medium'>
                      <Button
                        className='text-teal-600 hover:underline hover:text-white bg-transparent'
                        onClick={() => {}}
                      >
                        View
                      </Button>
                      <span className='text-slate-300'>•</span>
                      <Button
                        className='text-teal-600 hover:underline hover:text-white bg-transparent'
                        onClick={() => handleEdit(specialty)}
                      >
                        Edit
                      </Button>
                      <span className='text-slate-300'>•</span>
                      <Button
                        className='text-teal-600 hover:underline hover:text-white bg-transparent'
                        onClick={() => handleDelete(specialty.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Logic */}
      {meta.totalItems > 0 && (
        <div className='py-4'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    !meta.hasPreviousPage
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>

              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                      className='cursor-pointer'
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    !meta.hasNextPage
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Edit Modal */}
      <CreateSpecialtyModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={selectedSpecialty}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default SpecialtyList;
