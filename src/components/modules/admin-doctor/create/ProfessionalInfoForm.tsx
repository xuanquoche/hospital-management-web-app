import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { clientFetcher } from '@/lib/fetcher';

import { DoctorFormData } from './CreateDoctorMain';

const formSchema = z.object({
  primarySpecialtyId: z.string().min(1, {
    message: 'Please select a primary specialty.',
  }),
  subSpecialty: z.string().optional(),
  professionalTitle: z.string().optional(),
  yearsOfExperience: z.string().min(1, {
    message: 'Please enter years of experience.',
  }),
  consultationFee: z.string().min(1, {
    message: 'Please enter consultation fee.',
  }),
});

interface ProfessionalInfoFormProps {
  initialData: DoctorFormData;
  onUpdate: (data: Partial<DoctorFormData>) => void;
  onComplete: () => void;
}

interface Specialty {
  id: string;
  name: string;
}

export const ProfessionalInfoForm: React.FC<ProfessionalInfoFormProps> = ({
  initialData,
  onUpdate,
  onComplete,
}) => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primarySpecialtyId: initialData.primarySpecialtyId,
      subSpecialty: initialData.subSpecialty,
      professionalTitle: initialData.professionalTitle,
      yearsOfExperience: initialData.yearsOfExperience
        ? String(initialData.yearsOfExperience)
        : '',
      consultationFee: initialData.consultationFee
        ? String(initialData.consultationFee)
        : '',
    },
  });

  useEffect(() => {
    const fetchSpecialties = async () => {
      setIsLoadingSpecialties(true);
      try {
        const response = await clientFetcher.get(
          '/admin/specialties?page=1&limit=100'
        ); // Fetch enough specialties
        if (response.data) {
          setSpecialties(response.data);
        }
      } catch (error) {
        console.error('Error fetching specialties:', error);
        toast.error('Failed to load specialties');
      } finally {
        setIsLoadingSpecialties(false);
      }
    };

    fetchSpecialties();
  }, []);

  useEffect(() => {
    form.reset({
      primarySpecialtyId: initialData.primarySpecialtyId,
      subSpecialty: initialData.subSpecialty,
      professionalTitle: initialData.professionalTitle,
      yearsOfExperience: initialData.yearsOfExperience
        ? String(initialData.yearsOfExperience)
        : '',
      consultationFee: initialData.consultationFee
        ? String(initialData.consultationFee)
        : '',
    });
  }, [initialData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate({
      ...values,
      yearsOfExperience: Number(values.yearsOfExperience),
      consultationFee: Number(values.consultationFee),
    });
    onComplete();
  }

  return (
    <div className='flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>
            Professional details
          </h2>
          <p className='text-sm text-slate-500'>
            Specialty, experience, and fee information.
          </p>
        </div>
        <span className='text-xs font-medium text-slate-400'>Required</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='primarySpecialtyId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary specialty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isLoadingSpecialties}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingSpecialties
                              ? 'Loading...'
                              : 'Select specialty'
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty.id} value={specialty.id}>
                          {specialty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='subSpecialty'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-specialty (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. Interventional cardiology'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='professionalTitle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional title (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. Senior Consultant' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='yearsOfExperience'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of experience</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter years' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='consultationFee'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consultation fee</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. 500000' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex items-center justify-between border-t border-slate-100 pt-6'>
            <div className='text-sm text-slate-500'>
              <p className='font-medium text-slate-900'>Unsaved changes</p>
              <p>Review specialty, experience and fee before saving.</p>
            </div>
            <div className='flex items-center gap-3'>
              <Button type='button' variant='ghost' className='text-slate-600'>
                Discard
              </Button>
              <Button
                type='button'
                variant='outline'
                className='bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100'
              >
                Save as draft
              </Button>
              <Button type='submit' className='bg-teal-600 hover:bg-teal-700'>
                Save & activate
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
