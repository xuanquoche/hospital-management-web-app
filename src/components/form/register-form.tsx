'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import Button from '@/components/common/button';
import CustomInput from '@/components/common/input';
import { Form } from '@/components/ui/form';
import { ROUTES } from '@/const/routes';

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email({
      message: 'email is invalid',
    }),
    username: z.string({
      message: 'password is required',
    }),
    fullName: z.string({
      message: 'password is required',
    }),
    password: z
      .string({
        message: 'password is required',
      })
      .min(8, { message: 'password must be at least 8 characters long' })
      .regex(/[A-Z]/, { message: 'uppercase password' })
      .regex(/[a-z]/, { message: 'lowercase password' })
      .regex(/\d/, { message: 'password must have at least one number' })
      .regex(/[\W_]/, {
        message: 'password must have at least one special character',
      }),
    phone: z.string().min(10, { message: 'phone number is invalid' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      fullName: '',
      phone: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();

    if (data?.statusCode === 201) {
      toast.success('Register successfully! Please log in.');
      router.push(ROUTES.DASHBOARD);
      setIsLoading(false);
    } else if (data?.statusCode === 400) {
      setIsLoading(false);
      toast.error('Account already exists! Please log in.');
    } else {
      setIsLoading(false);
      toast.error('Something went wrong! Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <div className='space-y-2'>
          <CustomInput
            label={'Email'}
            name='email'
            control={form.control}
            placeholder={'Enter your email address'}
          />
        </div>

        <div className='space-y-2'>
          <CustomInput
            label={'Username'}
            name='username'
            control={form.control}
            placeholder={'Enter your username'}
          />
        </div>

        <div className='space-y-2'>
          <CustomInput
            label={'Full Name'}
            name='fullName'
            control={form.control}
            placeholder={'Enter your username'}
          />
        </div>

        <div className='space-y-2'>
          <CustomInput
            label={'Phone'}
            name='phone'
            control={form.control}
            placeholder={'Enter your phone number'}
          />
        </div>

        <div className='space-y-2'>
          <CustomInput
            label={'Password'}
            name='password'
            control={form.control}
            placeholder={'Enter your password'}
            isPasswordField
          />
        </div>

        <Button
          type='submit'
          disabled={isLoading}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2'
        >
          {isLoading ? (
            <>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              Create account...
            </>
          ) : (
            <>
              Sign up
              <span className='text-lg'>›</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
