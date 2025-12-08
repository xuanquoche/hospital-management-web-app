'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Check } from 'lucide-react';

interface CreateDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDepartmentModal = ({
  isOpen,
  onClose,
}: CreateDepartmentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-xl p-0 overflow-hidden gap-0'>
        <DialogHeader className='p-6 pb-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-5 w-5'
                >
                  <rect width='16' height='20' x='4' y='2' rx='2' ry='2' />
                  <path d='M9 22v-4h6v4' />
                  <path d='M8 6h.01' />
                  <path d='M16 6h.01' />
                  <path d='M12 6h.01' />
                  <path d='M12 10h.01' />
                  <path d='M12 14h.01' />
                  <path d='M16 10h.01' />
                  <path d='M16 14h.01' />
                  <path d='M8 10h.01' />
                  <path d='M8 14h.01' />
                </svg>
              </div>
              <div>
                <DialogTitle className='text-lg font-semibold text-slate-900'>
                  Create department (Khoa)
                </DialogTitle>
                <p className='text-sm text-slate-500'>
                  Enter basic information to create a new khoa for scheduling and
                  routing.
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className='p-6 pt-2 space-y-4'>
          {/* Department Details Section */}
          <div className='rounded-md bg-teal-50/50 p-3'>
            <div className='flex justify-between items-center mb-2'>
              <h3 className='text-sm font-semibold text-teal-800'>
                Department details
              </h3>
              <span className='text-xs text-slate-500'>Required fields</span>
            </div>

            <div className='space-y-3'>
              <div className='grid gap-1.5'>
                <div className='flex justify-between'>
                  <Label htmlFor='department' className='text-slate-600'>
                    Department
                  </Label>
                  <span className='text-xs text-slate-400'>Tên khoa</span>
                </div>
                <Input
                  id='department'
                  placeholder='e.g. Cardiology'
                  className='bg-white'
                />
              </div>

              <div className='grid gap-1.5'>
                <div className='flex justify-between'>
                  <Label htmlFor='code' className='text-slate-600'>
                    Code
                  </Label>
                  <span className='text-xs text-slate-400'>Mã khoa</span>
                </div>
                <div className='relative'>
                  <Input
                    id='code'
                    placeholder='e.g. CD-01'
                    className='bg-white pr-24'
                  />
                  <span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400'>
                    Auto-check unique
                  </span>
                </div>
              </div>

              <div className='grid gap-1.5'>
                <div className='flex justify-between'>
                  <Label htmlFor='head' className='text-slate-600'>
                    Head of department
                  </Label>
                  <span className='text-xs text-slate-400'>Trưởng khoa</span>
                </div>
                <Select>
                  <SelectTrigger className='bg-white'>
                    <SelectValue placeholder='Search or select doctor' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='dr-sarah'>Dr. Sarah Thompson</SelectItem>
                    <SelectItem value='dr-james'>Dr. James Lee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-1.5'>
                <Label htmlFor='status' className='text-slate-600'>
                  Status
                </Label>
                <Select defaultValue='active'>
                  <SelectTrigger className='bg-white'>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 rounded-full bg-green-500' />
                      <SelectValue placeholder='Select status' />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='active'>
                      <div className='flex items-center gap-2'>
                        <div className='h-2 w-2 rounded-full bg-green-500' />
                        Active
                      </div>
                    </SelectItem>
                    <SelectItem value='inactive'>
                      <div className='flex items-center gap-2'>
                        <div className='h-2 w-2 rounded-full bg-slate-300' />
                        Inactive
                      </div>
                    </SelectItem>
                    <SelectItem value='onboarding'>
                      <div className='flex items-center gap-2'>
                        <div className='h-2 w-2 rounded-full bg-amber-500' />
                        Onboarding
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Doctor Section */}
          <div className='rounded-md bg-teal-50/50 p-3'>
            <div className='grid gap-1.5'>
              <div className='flex justify-between'>
                <Label className='text-teal-800 font-semibold'>Doctor</Label>
                <span className='text-xs text-slate-400'>
                  Bác sĩ trong khoa
                </span>
              </div>
              <Button
                variant='outline'
                className='w-full justify-between bg-white text-slate-500 hover:text-slate-700 font-normal'
              >
                Add doctors to this khoa
                <span className='text-lg'>+</span>
              </Button>
            </div>
          </div>
        </div>

        <div className='px-6 pb-6'>
          <p className='text-xs text-slate-500 mb-4'>
            You can edit doctors and routing rules later from the department
            details view.
          </p>
          <DialogFooter>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
            <Button className='bg-teal-600 hover:bg-teal-700 text-white gap-2'>
              <Check className='h-4 w-4' />
              Create department
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDepartmentModal;
