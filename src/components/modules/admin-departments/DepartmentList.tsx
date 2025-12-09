'use client';

import { Columns, Download, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { clientFetcher } from '@/lib/fetcher';

import CreateDepartmentModal from './CreateDepartmentModal';

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  headId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  head: {
    id: string;
    userId: string;
    user: {
      id: string;
      fullName: string;
      email: string;
    };
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

interface DepartmentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Department[];
  meta: PaginationMeta;
}

const ITEMS_PER_PAGE = 10;

const DepartmentList = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
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
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const fetchDepartments = async (page: number) => {
    try {
      setIsLoading(true);

      const res = await clientFetcher.get(
        `/departments?page=${page}&limit=${ITEMS_PER_PAGE}`
      );

      const responseData = res as DepartmentResponse;

      if (responseData.success) {
        setDepartments(responseData.data);
        setMeta(responseData.meta);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast.error('Failed to fetch departments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= meta.totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleDelete = async (departmentId: string) => {
    try {
      setIsLoading(true);

      const res = await clientFetcher.delete(`/departments/${departmentId}`);

      const responseData = res as DepartmentResponse;

      if (responseData.success) {
        toast.success('Department deleted successfully');
        fetchDepartments(currentPage);
      }
    } catch (error) {
      console.error('Error deleting department:', error);
      toast.error('Failed to delete department');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleModalSuccess = () => {
    fetchDepartments(currentPage);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-slate-500'>
          Department List • Showing{' '}
          {departments.length > 0 ? (meta.page - 1) * meta.limit + 1 : 0}–
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
                Department
              </TableHead>
              <TableHead className='font-semibold text-teal-900'>
                Code
              </TableHead>
              <TableHead className='font-semibold text-teal-900'>
                Head of Department
              </TableHead>
              <TableHead className='font-semibold text-teal-900'>
                Status
              </TableHead>
              <TableHead className='font-semibold text-teal-900'>
                Doctors
              </TableHead>
              <TableHead className='font-semibold text-teal-900'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  <div className='flex justify-center items-center gap-2'>
                    <Loader2 className='h-6 w-6 animate-spin text-teal-600' />
                    <span className='text-slate-500'>
                      Loading departments...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : departments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  No departments found.
                </TableCell>
              </TableRow>
            ) : (
              departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className='font-medium text-slate-900'>
                    {dept.name}
                  </TableCell>
                  <TableCell className='text-slate-600'>{dept.code}</TableCell>
                  <TableCell className='text-slate-600'>
                    {dept.head?.user?.fullName || '—'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='secondary'
                      className={`
                        ${
                          dept.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-100'
                        }
                        rounded-full px-3 font-normal
                      `}
                    >
                      {dept.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-slate-600'>—</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2 text-xs font-medium'>
                      <Button className='text-teal-600 hover:underline hover:text-white bg-transparent'>
                        View
                      </Button>
                      <span className='text-slate-300'>•</span>
                      <Button
                        className='text-teal-600 hover:underline hover:text-white bg-transparent'
                        onClick={() => handleEdit(dept)}
                      >
                        Edit
                      </Button>
                      <span className='text-slate-300'>•</span>
                      <Button
                        className='text-teal-600 hover:underline hover:text-white bg-transparent'
                        onClick={() => handleDelete(dept.id)}
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
      <CreateDepartmentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={selectedDepartment}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default DepartmentList;
