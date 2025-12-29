import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
import { ImageUpload } from './ImageUpload';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

interface PersonalInfoFormProps {
  initialData: DoctorFormData;
  onUpdate: (data: Partial<DoctorFormData>) => void;
  onComplete: () => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  initialData,
  onUpdate,
  onComplete,
}) => {
  const t = useTranslations('Admin.DoctorCreate.PersonalInfoForm');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData.fullName,
      email: initialData.email,
      phone: initialData.phone,
      address: initialData.address,
      username: initialData.username,
      bio: initialData.bio,
      avatar: initialData.avatar,
    },
  });

  useEffect(() => {
    form.reset({
      fullName: initialData.fullName,
      email: initialData.email,
      phone: initialData.phone,
      address: initialData.address,
      username: initialData.username,
      bio: initialData.bio,
      avatar: initialData.avatar,
    });
  }, [initialData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values);
    onComplete();
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
          <FormField
            control={form.control}
            name='avatar'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fullName')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('placeholders.fullName')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('username')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('placeholders.username')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('placeholders.email')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('phone')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('placeholders.phone')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>{t('address')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('placeholders.address')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>{t('bio')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('placeholders.bio')} {...field} />
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
              <p>{t('unsavedChangesDescription')}</p>
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
              <Button type='submit' className='bg-teal-600 hover:bg-teal-700'>
                {t('saveAndActivate')}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
