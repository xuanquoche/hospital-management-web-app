import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';

import { DoctorFormData } from './CreateDoctorMain';

const awardSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  organization: z.string().min(1, { message: 'Organization is required' }),
  year: z.string().min(4, { message: 'Year is required' }),
  description: z.string().optional(),
});

const formSchema = z.object({
  awards: z.array(awardSchema).optional(),
});

interface AwardsInfoFormProps {
  initialData: DoctorFormData;
  onUpdate: (data: Partial<DoctorFormData>) => void;
  onComplete: () => void;
}

export const AwardsInfoForm: React.FC<AwardsInfoFormProps> = ({
  initialData,
  onUpdate,
  onComplete,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      awards:
        initialData.awards.length > 0
          ? initialData.awards.map((a) => ({
              title: a.title,
              organization: a.organization,
              year: String(a.year),
              description: a.description,
            }))
          : [
              {
                title: '',
                organization: '',
                year: '',
                description: '',
              },
            ],
    },
  });

  useEffect(() => {
    if (initialData.awards.length > 0) {
      form.reset({
        awards: initialData.awards.map((a) => ({
          title: a.title,
          organization: a.organization,
          year: String(a.year),
          description: a.description,
        })),
      });
    }
  }, [initialData, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'awards',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate({
      awards:
        values.awards?.map((a) => ({
          ...a,
          year: Number(a.year),
          description: a.description || '',
        })) || [],
    });
    onComplete();
  }

  return (
    <div className='flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>
            Awards & achievements
          </h2>
          <p className='text-sm text-slate-500'>
            Add important awards and medical achievements.
          </p>
        </div>
        <span className='text-xs font-medium text-slate-400'>Optional</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-4'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='relative rounded-lg border border-slate-100 bg-slate-50/50 p-4'
              >
                <div className='grid grid-cols-3 gap-4 mb-4'>
                  <FormField
                    control={form.control}
                    name={`awards.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Award / Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g. National Clinical Excellence Award'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`awards.${index}.organization`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization / Issuer</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g. Vietnam Medical Association'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`awards.${index}.year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input placeholder='e.g. 2021' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`awards.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='e.g. Recognized for outstanding contributions in cardiology and patient care.'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {fields.length > 0 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-4 bottom-4 text-red-500 hover:bg-red-50 hover:text-red-600'
                    onClick={() => remove(index)}
                  >
                    Remove
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
              append({ title: '', organization: '', year: '', description: '' })
            }
          >
            <Plus className='mr-2 h-4 w-4' />
            Add award
          </Button>

          <div className='flex items-center justify-between border-t border-slate-100 pt-6'>
            <div className='text-sm text-slate-500'>
              <p className='font-medium text-slate-900'>Unsaved changes</p>
              <p>Review awards list before saving.</p>
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
