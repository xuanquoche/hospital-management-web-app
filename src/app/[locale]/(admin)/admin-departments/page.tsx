'use client';

import { Plus, LayoutGrid } from 'lucide-react';
import React, { useState } from 'react';

import CreateDepartmentModal from '@/components/modules/admin-departments/CreateDepartmentModal';
import DepartmentFilters from '@/components/modules/admin-departments/DepartmentFilters';
import DepartmentList from '@/components/modules/admin-departments/DepartmentList';
import UsageSnapshot from '@/components/modules/admin-departments/UsageSnapshot';
import { Button } from '@/components/ui/button';

const AdminDepartmentsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className='flex h-full flex-col space-y-6 p-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>
            Departments (Khoa)
          </h1>
          <p className='text-sm text-slate-500'>
            Manage hospital departments, heads of department, and service
            coverage.
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Button
            variant='outline'
            className='gap-2 border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-100 hover:text-teal-800'
          >
            <LayoutGrid className='h-4 w-4' />
            Bulk edit
          </Button>
          <Button
            className='gap-2 bg-teal-600 hover:bg-teal-700'
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className='h-4 w-4' />
            Create Department
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 lg:col-span-9 space-y-6'>
          <DepartmentFilters />
          <DepartmentList />
        </div>
        <div className='col-span-12 lg:col-span-3'>
          <UsageSnapshot />
        </div>
      </div>

      <CreateDepartmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default AdminDepartmentsPage;
