import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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

import { DoctorFormData } from './CreateDoctorMain';

const educationSchema = z.object({
  school: z.string().min(1, { message: 'School is required' }),
  degree: z.string().min(1, { message: 'Degree is required' }),
  graduationYear: z.string().min(4, { message: 'Year is required' }),
});

const formSchema = z.object({
  educations: z.array(educationSchema).min(1, {
    message: 'Please add at least one education entry.',
  }),
});

interface EducationInfoFormProps {
  initialData: DoctorFormData;
  onUpdate: (data: Partial<DoctorFormData>) => void;
  onComplete: () => void;
}

export const EducationInfoForm: React.FC<EducationInfoFormProps> = ({
  initialData,
  onUpdate,
  onComplete,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      educations:
        initialData.educations.length > 0
          ? initialData.educations.map((e) => ({
              school: e.school,
              degree: e.degree,
              graduationYear: String(e.graduationYear),
            }))
          : [
              {
                school: '',
                degree: '',
                graduationYear: '',
              },
            ],
    },
  });

  useEffect(() => {
    if (initialData.educations.length > 0) {
      form.reset({
        educations: initialData.educations.map((e) => ({
          school: e.school,
          degree: e.degree,
          graduationYear: String(e.graduationYear),
        })),
      });
    }
  }, [initialData, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate({
      educations: values.educations.map((e) => ({
        ...e,
        graduationYear: Number(e.graduationYear),
      })),
    });
    onComplete();
  }

  return (
    <div className='flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>
            Educational information
          </h2>
          <p className='text-sm text-slate-500'>
            Add your educational background.
          </p>
        </div>
        <span className='text-xs font-medium text-slate-400'>Required</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-4'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='relative grid grid-cols-3 gap-4 rounded-lg border border-slate-100 bg-slate-50/50 p-4'
              >
                <FormField
                  control={form.control}
                  name={`educations.${index}.school`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School / University</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g. University of Medicine'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. MD, Cardiology' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.graduationYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduation year</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. 2015' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {fields.length > 1 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute -right-2 -top-2 h-6 w-6 rounded-full bg-slate-200 text-slate-500 hover:bg-red-100 hover:text-red-600'
                    onClick={() => remove(index)}
                  >
                    <Trash2 className='h-3 w-3' />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type='button'
            variant='secondary'
            className='w-full bg-teal-50 text-teal-700 hover:bg-teal-100'
            onClick={() =>
              append({ school: '', degree: '', graduationYear: '' })
            }
          >
            <Plus className='mr-2 h-4 w-4' />
            Add education
          </Button>

          <div className='flex items-center justify-between border-t border-slate-100 pt-6'>
            <div className='text-sm text-slate-500'>
              <p className='font-medium text-slate-900'>Unsaved changes</p>
              <p>Review education history before saving.</p>
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
