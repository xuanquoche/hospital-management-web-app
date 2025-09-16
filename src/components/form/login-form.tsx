'use client';

import Link from 'next/link';

import { Input } from '@/components/ui/input';
import Button from '@/src/components/common/button';
import { ROUTES } from '@/src/const';

export interface ILoginFormProps {}

export default function LoginForm(props: ILoginFormProps) {
  return (
    <div className='h-[50%] w-full flex flex-col gap-4'>
      <div>
        <Input
          type='email'
          placeholder='Email'
          className='!placeholder-white border-r-0 border-l-0 border-t-0 rounded-none focus:ring-0 focus-visible::ring-offset-0 focus-visible:outline-0 focus-visible:border-ring-0 focus-visible:ring-0 text-white'
        />
      </div>
      <div>
        <Input
          type='password'
          placeholder='Password'
          id='password'
          className='!placeholder-white border-r-0 border-l-0 border-t-0 rounded-none focus:ring-0 focus-visible::ring-offset-0 focus-visible:outline-0 focus-visible:border-ring-0 focus-visible:ring-0 text-white'
        />
      </div>
      <div className='flex justify-between'>
        <Link href={ROUTES.REGISTER} className='text-white hover:text-chart-3'>
          You don't have account?
        </Link>
        <Button size='sm' className='w-[30%] bg-primary'>
          Login
        </Button>
      </div>
    </div>
  );
}
