'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DepartmentStatus } from '@/const/index';

type Department = {
  items: {
    id: number;
    name: string;
    status: DepartmentStatus;
  }[];
  pagination: {
    page: number;
    total: number;
    perPage: number;
    totalPages: number;
  };
};

type DepartmentTableProps = {
  departments: Department;
  onEdit: (dept: {
    id: number;
    name: string;
    status: DepartmentStatus;
  }) => void;
  onDelete: (id: number) => void;
  onPageChange: (page: number) => void;
  isLoading: boolean;
};

export default function DepartmentTable({
  departments,
  onEdit,
  onDelete,
  onPageChange,
  isLoading,
}: DepartmentTableProps) {
  const t = useTranslations('departmentTable');

  const { items, pagination } = departments;

  return (
    <Card className='shadow-md'>
      <CardHeader>
        <CardTitle>{t('deparmentList')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead className='text-right'>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow className='animate-pulse border-0'>
                <TableCell colSpan={4} className='text-center'>
                  <Spinner className='size-4 mx-auto' />
                </TableCell>
              </TableRow>
            ) : items.length > 0 ? (
              items.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>{dept.id}</TableCell>
                  <TableCell>{dept.name}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        dept.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {dept.status}
                    </span>
                  </TableCell>
                  <TableCell className='text-right space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => onEdit(dept)}
                    >
                      {t('updateBtn')}
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => onDelete(dept.id)}
                    >
                      {t('deleteBtn')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className='text-center text-muted-foreground'
                >
                  {t('notHaveData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination>
          <PaginationContent className='justify-center'>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(pagination.page - 1)}
                className={
                  pagination.page === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>

            {Array.from({ length: pagination.totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === pagination.page}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(pagination.page + 1)}
                className={
                  pagination.page === pagination.totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
