import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';
import { SiFacebook } from 'react-icons/si';

import RegisterForm from '@/src/components/form/register-form';
import { ROUTES } from '@/src/const/routes';

export default function SignUp() {
  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='bg-white rounded-2xl shadow-lg p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            Create your account
          </h1>
          <p className='text-gray-600 text-sm'>
            Welcome! Please fill in the details to get started.
          </p>
        </div>

        <div className='flex justify-center items-center gap-2 mb-6'>
          <div className='cursor-pointer hover:scale-105 transition-transform border p-2 rounded-lg w-[30%] flex justify-center items-center'>
            <FcGoogle />
          </div>
          <div className='cursor-pointer hover:scale-105 transition-transform border p-2 rounded-lg w-[30%] flex justify-center items-center'>
            <SiFacebook />
          </div>
          <div className='cursor-pointer hover:scale-105 transition-transform border p-2 rounded-lg w-[30%] flex justify-center items-center'>
            <ImGithub />
          </div>
        </div>

        <RegisterForm />

        <div className='mt-8 text-center'>
          <p className='text-gray-600 text-sm'>
            Already have an account?{' '}
            <Link
              href={ROUTES.LOGIN}
              className='text-blue-600 hover:text-blue-700 font-medium'
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className='mt-6 pt-6 border-t border-gray-200 text-center'>
          <p className='text-xs text-gray-500'>
            Secured by <span className='font-semibold'>Xuan Quoc</span>
          </p>
        </div>
      </div>
    </div>
  );
}
