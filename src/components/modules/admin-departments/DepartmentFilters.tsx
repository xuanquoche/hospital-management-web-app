'use client';

import { Search } from 'lucide-react';
import React from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DepartmentFilters = () => {
  return (
    <div className='rounded-lg border bg-white p-4 shadow-sm'>
      <div className='mb-4 text-sm font-medium text-slate-500'>Filters</div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-12'>
        <div className='md:col-span-6'>
          <label className='mb-1.5 block text-xs font-medium text-slate-500'>
            Search by department name
          </label>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-slate-400' />
            <Input placeholder='Type department name...' className='pl-9' />
          </div>
        </div>
        <div className='md:col-span-3'>
          <label className='mb-1.5 block text-xs font-medium text-slate-500'>
            Type
          </label>
          <Select defaultValue='all'>
            <SelectTrigger>
              <SelectValue placeholder='Select type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All types</SelectItem>
              <SelectItem value='clinical'>Clinical</SelectItem>
              <SelectItem value='administrative'>Administrative</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='md:col-span-3'>
          <label className='mb-1.5 block text-xs font-medium text-slate-500'>
            Status
          </label>
          <Select defaultValue='all'>
            <SelectTrigger>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
              <SelectItem value='onboarding'>Onboarding</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DepartmentFilters;
