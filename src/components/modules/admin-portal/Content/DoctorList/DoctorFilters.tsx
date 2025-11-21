import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DoctorFilters = () => {
  return (
    <div className='mb-6 rounded-lg border border-slate-100 bg-white p-4 shadow-sm'>
      <div className='mb-4'>
        <h3 className='text-sm font-medium text-slate-500'>Filters</h3>
      </div>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-6'>
          <label className='mb-1.5 block text-xs font-medium text-slate-500'>
            Search by name
          </label>
          <div className='relative'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <Input
              placeholder='Type doctor name...'
              className='h-10 w-full border-slate-200 pl-10 focus-visible:ring-teal-500'
            />
          </div>
        </div>
        <div className='col-span-3'>
          <label className='mb-1.5 block text-xs font-medium text-slate-500'>
            Specialty
          </label>
          <Select defaultValue='all'>
            <SelectTrigger className='h-10 border-slate-200 focus:ring-teal-500'>
              <SelectValue placeholder='Select specialty' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All specialties</SelectItem>
              <SelectItem value='cardiology'>Cardiology</SelectItem>
              <SelectItem value='orthopedics'>Orthopedics</SelectItem>
              <SelectItem value='pediatrics'>Pediatrics</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='col-span-3'>
          <label className='mb-1.5 block text-xs font-medium text-slate-500'>
            Status
          </label>
          <Select defaultValue='all'>
            <SelectTrigger className='h-10 border-slate-200 focus:ring-teal-500'>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
              <SelectItem value='on-leave'>On leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DoctorFilters;
