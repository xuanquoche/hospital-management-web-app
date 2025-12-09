'use client';

import { Search, Filter } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SpecialtyFilters = () => {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div className='relative flex-1 md:max-w-sm'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-slate-500' />
        <Input placeholder='Search specialties...' className='pl-9 bg-white' />
      </div>
      <div className='flex items-center gap-2'>
        <Select defaultValue='all'>
          <SelectTrigger className='w-[150px] bg-white'>
            <div className='flex items-center gap-2'>
              <Filter className='h-4 w-4 text-slate-500' />
              <SelectValue placeholder='Status' />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Status</SelectItem>
            <SelectItem value='active'>Active</SelectItem>
            <SelectItem value='inactive'>Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SpecialtyFilters;
