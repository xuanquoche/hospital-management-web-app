import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Upload, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
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

const certificationSchema = z.object({
  certificateName: z
    .string()
    .min(1, { message: 'Certificate name is required' }),
  issuingAuthority: z
    .string()
    .min(1, { message: 'Issuing authority is required' }),
  licenseNumber: z.string().min(1, { message: 'License number is required' }),
  issueDate: z.string().min(1, { message: 'Issue date is required' }),
  expiryDate: z.string().optional(),
  documentUrl: z.string().optional(),
});

const formSchema = z.object({
  certifications: z.array(certificationSchema).min(1, {
    message: 'Please add at least one certification.',
  }),
  verificationNotes: z.string().optional(),
});

interface CertificationsInfoFormProps {
  initialData: DoctorFormData;
  onUpdate: (data: Partial<DoctorFormData>) => void;
  onComplete: (data?: Partial<DoctorFormData>) => void;
  isLoading?: boolean;
}

export const CertificationsInfoForm: React.FC<CertificationsInfoFormProps> = ({
  initialData,
  onUpdate,
  onComplete,
  isLoading = false,
}) => {
  const t = useTranslations('Admin.DoctorCreate.CertificationsInfoForm');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certifications:
        initialData.certifications.length > 0
          ? initialData.certifications.map((c) => ({
              certificateName: c.certificateName,
              issuingAuthority: c.issuingAuthority,
              licenseNumber: c.licenseNumber,
              issueDate: c.issueDate,
              expiryDate: c.expiryDate,
              documentUrl: c.documentUrl,
            }))
          : [
              {
                certificateName: '',
                issuingAuthority: '',
                licenseNumber: '',
                issueDate: '',
                expiryDate: '',
                documentUrl: '',
              },
            ],
      verificationNotes: '',
    },
  });

  useEffect(() => {
    if (initialData.certifications.length > 0) {
      form.reset({
        certifications: initialData.certifications.map((c) => ({
          certificateName: c.certificateName,
          issuingAuthority: c.issuingAuthority,
          licenseNumber: c.licenseNumber,
          issueDate: c.issueDate,
          expiryDate: c.expiryDate,
          documentUrl: c.documentUrl,
        })),
        verificationNotes: '',
      });
    }
  }, [initialData, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'certifications',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedCertifications = values.certifications.map((c) => ({
      ...c,
      expiryDate: c.expiryDate || '',
      documentUrl: c.documentUrl || '',
    }));

    onUpdate({
      certifications: updatedCertifications,
    });
    onComplete({
      certifications: updatedCertifications,
    });
  }

  return (
    <div className='flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>{t('title')}</h2>
          <p className='text-sm text-slate-500'>{t('subtitle')}</p>
        </div>
        <span className='text-xs font-medium text-slate-400'>
          {t('required')}
        </span>
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
                    name={`certifications.${index}.certificateName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('certificateName')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('placeholders.certificateName')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.issuingAuthority`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('issuingAuthority')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('placeholders.issuingAuthority')}
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
                        <FormLabel>{t('licenseNumber')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('placeholders.licenseNumber')}
                            {...field}
                          />
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
                        <FormLabel>{t('issueDate')}</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
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
                        <FormLabel>{t('expiryDate')}</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-teal-300 transition-colors'>
                  <Upload className='mx-auto h-8 w-8 text-slate-400 mb-2' />
                  <p className='text-sm font-medium text-slate-600 mb-1'>
                    {t('uploadText')}
                  </p>
                  <p className='text-xs text-slate-400'>{t('uploadFormats')}</p>
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
                    {t('remove')}
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
                certificateName: '',
                issuingAuthority: '',
                licenseNumber: '',
                issueDate: '',
                expiryDate: '',
                documentUrl: '',
              })
            }
          >
            <Plus className='mr-2 h-4 w-4' />
            {t('addCertification')}
          </Button>

          <div>
            <FormField
              control={form.control}
              name='verificationNotes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('verificationNotes')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('placeholders.verificationNotes')}
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
              <p className='font-medium text-slate-900'>
                {t('unsavedChanges')}
              </p>
              <p>{t('reviewBeforeSaving')}</p>
            </div>
            <div className='flex items-center gap-3'>
              <Button type='button' variant='ghost' className='text-slate-600'>
                {t('discard')}
              </Button>
              <Button
                type='button'
                variant='outline'
                className='bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100'
              >
                {t('saveAsDraft')}
              </Button>
              <Button
                type='submit'
                className='bg-teal-600 hover:bg-teal-700'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    {t('saving')}
                  </>
                ) : (
                  t('saveAndActivate')
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
