'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { clientFetcher } from '@/lib/fetcher';

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  headId: string | null;
  isActive: boolean;
}

interface CreateDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Department | null; // Add initialData for edit mode
  onSuccess?: () => void; // Callback to refresh list
}

const formSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  code: z.string().min(1, 'Code is required'),
  description: z.string().optional(),
  headId: z.string().optional(),
  isActive: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const CreateDepartmentModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: CreateDepartmentModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('code', initialData.code);
      setValue('description', initialData.description || '');
      setValue('headId', initialData.headId || undefined);
      setValue('isActive', initialData.isActive);
    } else {
      reset({
        name: '',
        code: '',
        description: '',
        isActive: true,
      });
    }
  }, [initialData, setValue, reset, isOpen]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (initialData) {
        // Update existing department
        await clientFetcher.patch(`/departments/${initialData.id}`, data);
        toast.success('Department updated successfully');
      } else {
        // Create new department
        await clientFetcher.post('/departments', data);
        toast.success('Department created successfully');
      }

      if (onSuccess) onSuccess();
      handleClose();
    } catch (error: any) {
      console.error('Error saving department:', error);
      toast.error(error.message || 'Failed to save department');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='max-w-xl p-0 overflow-hidden gap-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    {initialData
                      ? 'Edit department (Khoa)'
                      : 'Create department (Khoa)'}
                  </DialogTitle>
                  <p className='text-sm text-slate-500'>
                    {initialData
                      ? 'Update department information.'
                      : 'Enter basic information to create a new khoa for scheduling and routing.'}
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
                    <Label htmlFor='name' className='text-slate-600'>
                      Department
                    </Label>
                    <span className='text-xs text-slate-400'>Tên khoa</span>
                  </div>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id='name'
                        placeholder='e.g. Cardiology'
                        className='bg-white'
                      />
                    )}
                  />
                  {errors.name && (
                    <p className='text-xs text-red-500'>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1.5'>
                  <div className='flex justify-between'>
                    <Label htmlFor='code' className='text-slate-600'>
                      Code
                    </Label>
                    <span className='text-xs text-slate-400'>Mã khoa</span>
                  </div>
                  <div className='relative'>
                    <Controller
                      name='code'
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id='code'
                          placeholder='e.g. CD-01'
                          className='bg-white pr-24'
                        />
                      )}
                    />
                    <span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400'>
                      Auto-check unique
                    </span>
                  </div>
                  {errors.code && (
                    <p className='text-xs text-red-500'>
                      {errors.code.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1.5'>
                  <div className='flex justify-between'>
                    <Label htmlFor='description' className='text-slate-600'>
                      Description
                    </Label>
                    <span className='text-xs text-slate-400'>Mô tả</span>
                  </div>
                  <div className='relative'>
                    <Controller
                      name='description'
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id='description'
                          placeholder='Tell me about department'
                          className='bg-white pr-24'
                        />
                      )}
                    />
                    <span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400'>
                      Please detail of department
                    </span>
                  </div>
                </div>

                <div className='grid gap-1.5'>
                  <div className='flex justify-between'>
                    <Label htmlFor='headId' className='text-slate-600'>
                      Head of department
                    </Label>
                    <span className='text-xs text-slate-400'>Trưởng khoa</span>
                  </div>
                  <Controller
                    name='headId'
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='bg-white'>
                          <SelectValue placeholder='Search or select doctor' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='string'>
                            Dr. Sarah Thompson
                          </SelectItem>
                          <SelectItem value='dr-james'>
                            Dr. James Lee
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className='grid gap-1.5'>
                  <Label htmlFor='isActive' className='text-slate-600'>
                    Status
                  </Label>
                  <Controller
                    name='isActive'
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(val) =>
                          field.onChange(val === 'active')
                        }
                        defaultValue={field.value ? 'active' : 'inactive'}
                        value={field.value ? 'active' : 'inactive'}
                      >
                        <SelectTrigger className='bg-white'>
                          <div className='flex items-center gap-2'>
                            <div
                              className={`h-2 w-2 rounded-full ${field.value ? 'bg-green-500' : 'bg-slate-300'}`}
                            />
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
                        </SelectContent>
                      </Select>
                    )}
                  />
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
                  type='button'
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
              <Button type='button' variant='ghost' onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-teal-600 hover:bg-teal-700 text-white gap-2'
                disabled={isLoading}
              >
                {isLoading ? (
                  'Saving...'
                ) : (
                  <>
                    <Check className='h-4 w-4' />
                    {initialData ? 'Update department' : 'Create department'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDepartmentModal;
