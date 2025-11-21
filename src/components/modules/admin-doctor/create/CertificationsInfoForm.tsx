import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Upload, Trash2 } from 'lucide-react';
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

const certificationSchema = z.object({
  name: z.string().min(1, { message: 'Certificate name is required' }),
  authority: z.string().min(1, { message: 'Issuing authority is required' }),
  licenseNumber: z.string().min(1, { message: 'License number is required' }),
  issueDate: z.string().min(1, { message: 'Issue date is required' }),
  expiryDate: z.string().optional(),
  file: z.any().optional(),
});

const formSchema = z.object({
  certifications: z.array(certificationSchema).min(1, {
    message: 'Please add at least one certification.',
  }),
  verificationNotes: z.string().optional(),
});

interface CertificationsInfoFormProps {
  onComplete: () => void;
}

export const CertificationsInfoForm: React.FC<CertificationsInfoFormProps> = ({
  onComplete,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certifications: [
        {
          name: '',
          authority: '',
          licenseNumber: '',
          issueDate: '',
          expiryDate: '',
        },
      ],
      verificationNotes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'certifications',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onComplete();
  }

  return (
    <div className='flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>
            Practice certifications
          </h2>
          <p className='text-sm text-slate-500'>
            Upload professional certifications and practice licenses.
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
                className='relative rounded-lg border border-slate-100 bg-slate-50/50 p-4 space-y-4'
              >
                <div className='grid grid-cols-3 gap-4'>
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate / License name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g. Medical Practice License'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.authority`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issuing authority</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='e.g. Vietnam Ministry of Health'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.licenseNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License number</FormLabel>
                        <FormControl>
                          <Input placeholder='e.g. HN-12345' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.issueDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue date</FormLabel>
                        <FormControl>
                          <Input placeholder='DD/MM/YYYY' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.expiryDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry date</FormLabel>
                        <FormControl>
                          <Input placeholder='DD/MM/YYYY' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-teal-300 transition-colors'>
                  <Upload className='mx-auto h-8 w-8 text-slate-400 mb-2' />
                  <p className='text-sm font-medium text-slate-600 mb-1'>
                    Click to upload or drag & drop
                  </p>
                  <p className='text-xs text-slate-400'>PDF, PNG, JPG</p>
                  <input
                    type='file'
                    className='hidden'
                    accept='.pdf,.png,.jpg,.jpeg'
                  />
                </div>

                {fields.length > 1 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-4 top-4 text-red-500 hover:bg-red-50 hover:text-red-600'
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
              append({
                name: '',
                authority: '',
                licenseNumber: '',
                issueDate: '',
                expiryDate: '',
              })
            }
          >
            <Plus className='mr-2 h-4 w-4' />
            Add certification
          </Button>

          <div>
            <FormField
              control={form.control}
              name='verificationNotes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='e.g. Verified with licensing board on 05/03/2024. Next check in 12 months.'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex items-center justify-between border-t border-slate-100 pt-6'>
            <div className='text-sm text-slate-500'>
              <p className='font-medium text-slate-900'>Unsaved changes</p>
              <p>Review all certifications before completing setup.</p>
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
