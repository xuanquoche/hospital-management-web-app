'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
type Department = {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
};

type DepartmentTableProps = {
  departments: Department[];
  onEdit: (dept: Department) => void;
  onDelete: (id: number) => void;
};

export default function DepartmentTable({
  departments,
  onEdit,
  onDelete,
}: DepartmentTableProps) {
  const t = useTranslations('departmentTable');
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
            {departments.map((dept) => (
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
            ))}

            {departments.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className='text-center text-muted-foreground'
                >
                  {t('nptHaveData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
