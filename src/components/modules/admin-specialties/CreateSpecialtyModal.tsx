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

interface Specialty {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  isActive: boolean;
}

interface Department {
  id: string;
  name: string;
}

interface CreateSpecialtyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Specialty | null;
  onSuccess?: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, 'Specialty name is required'),
  description: z.string().optional(),
  departmentId: z.string().min(1, 'Department is required'),
  isActive: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const CreateSpecialtyModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: CreateSpecialtyModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

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
      description: '',
      departmentId: '',
      isActive: true,
    },
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res: any = await clientFetcher.get('/departments?limit=100'); // Fetch all departments
        if (res.success) {
          setDepartments(res.data);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    if (isOpen) {
      fetchDepartments();
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('description', initialData.description || '');
      setValue('departmentId', initialData.departmentId);
      setValue('isActive', initialData.isActive);
    } else {
      reset({
        name: '',
        description: '',
        departmentId: '',
        isActive: true,
      });
    }
  }, [initialData, setValue, reset, isOpen]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (initialData) {
        await clientFetcher.patch(`/specialties/${initialData.id}`, data);
        toast.success('Specialty updated successfully');
      } else {
        await clientFetcher.post('/specialties', data);
        toast.success('Specialty created successfully');
      }

      if (onSuccess) onSuccess();
      handleClose();
    } catch (error: any) {
      console.error('Error saving specialty:', error);
      toast.error(error.message || 'Failed to save specialty');
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
                    <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
                  </svg>
                </div>
                <div>
                  <DialogTitle className='text-lg font-semibold text-slate-900'>
                    {initialData ? 'Edit Specialty' : 'Create Specialty'}
                  </DialogTitle>
                  <p className='text-sm text-slate-500'>
                    {initialData
                      ? 'Update specialty information.'
                      : 'Enter basic information to create a new specialty.'}
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className='p-6 pt-2 space-y-4'>
            <div className='rounded-md bg-teal-50/50 p-3'>
              <div className='flex justify-between items-center mb-2'>
                <h3 className='text-sm font-semibold text-teal-800'>
                  Specialty details
                </h3>
                <span className='text-xs text-slate-500'>Required fields</span>
              </div>

              <div className='space-y-3'>
                <div className='grid gap-1.5'>
                  <div className='flex justify-between'>
                    <Label htmlFor='name' className='text-slate-600'>
                      Specialty Name
                    </Label>
                    <span className='text-xs text-slate-400'>
                      Tên chuyên khoa
                    </span>
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
                    <Label htmlFor='description' className='text-slate-600'>
                      Description
                    </Label>
                    <span className='text-xs text-slate-400'>Mô tả</span>
                  </div>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id='description'
                        placeholder='Description of the specialty'
                        className='bg-white'
                      />
                    )}
                  />
                </div>

                <div className='grid gap-1.5'>
                  <div className='flex justify-between'>
                    <Label htmlFor='departmentId' className='text-slate-600'>
                      Department
                    </Label>
                    <span className='text-xs text-slate-400'>Thuộc khoa</span>
                  </div>
                  <Controller
                    name='departmentId'
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger className='bg-white'>
                          <SelectValue placeholder='Select department' />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.departmentId && (
                    <p className='text-xs text-red-500'>
                      {errors.departmentId.message}
                    </p>
                  )}
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
          </div>

          <div className='px-6 pb-6'>
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
                    {initialData ? 'Update Specialty' : 'Create Specialty'}
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

export default CreateSpecialtyModal;
