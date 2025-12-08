'use client';

import React from 'react';
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
import { Columns, Download } from 'lucide-react';

const departments = [
  {
    id: 1,
    name: 'Cardiology',
    code: 'CD-01',
    head: 'Dr. Sarah Thompson',
    status: 'Active',
    doctors: 18,
  },
  {
    id: 2,
    name: 'Emergency Medicine',
    code: 'EM-02',
    head: 'Dr. James Lee',
    status: 'Active',
    doctors: 32,
  },
  {
    id: 3,
    name: 'Pediatrics',
    code: 'PD-03',
    head: 'Dr. Priya Singh',
    status: 'Active',
    doctors: 14,
  },
  {
    id: 4,
    name: 'Dermatology',
    code: 'DM-04',
    head: 'Dr. Emily Carter',
    status: 'Inactive',
    doctors: 7,
  },
  {
    id: 5,
    name: 'Neurology',
    code: 'NR-05',
    head: 'Dr. Miguel Alvarez',
    status: 'Active',
    doctors: 11,
  },
  {
    id: 6,
    name: 'Radiology',
    code: 'RD-06',
    head: '—',
    status: 'Onboarding',
    doctors: 4,
  },
];

const DepartmentList = () => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-slate-500'>
          Department List • Showing 1–6 of 24
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-8 gap-2 text-slate-600'>
            <Columns className='h-4 w-4' />
            Columns
          </Button>
          <Button variant='outline' size='sm' className='h-8 gap-2 text-slate-600'>
            <Download className='h-4 w-4' />
            Export
          </Button>
        </div>
      </div>

      <div className='rounded-md border bg-white'>
        <Table>
          <TableHeader className='bg-teal-50/50'>
            <TableRow>
              <TableHead className='font-semibold text-teal-900'>Department</TableHead>
              <TableHead className='font-semibold text-teal-900'>Code</TableHead>
              <TableHead className='font-semibold text-teal-900'>Head of Department</TableHead>
              <TableHead className='font-semibold text-teal-900'>Status</TableHead>
              <TableHead className='font-semibold text-teal-900'>Doctors</TableHead>
              <TableHead className='font-semibold text-teal-900'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((dept) => (
              <TableRow key={dept.id}>
                <TableCell className='font-medium text-slate-900'>
                  {dept.name}
                </TableCell>
                <TableCell className='text-slate-600'>{dept.code}</TableCell>
                <TableCell className='text-slate-600'>{dept.head}</TableCell>
                <TableCell>
                  <Badge
                    variant='secondary'
                    className={`
                      ${
                        dept.status === 'Active'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : ''
                      }
                      ${
                        dept.status === 'Inactive'
                          ? 'bg-slate-100 text-slate-500 hover:bg-slate-100'
                          : ''
                      }
                      ${
                        dept.status === 'Onboarding'
                          ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                          : ''
                      }
                      rounded-full px-3 font-normal
                    `}
                  >
                    {dept.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-slate-600'>{dept.doctors}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2 text-xs font-medium'>
                    <button className='text-teal-600 hover:underline'>View</button>
                    <span className='text-slate-300'>•</span>
                    <button className='text-teal-600 hover:underline'>Edit</button>
                    <span className='text-slate-300'>•</span>
                    <button className='text-teal-600 hover:underline'>Delete</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentList;
