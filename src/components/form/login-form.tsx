'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Button from '@/src/components/common/button';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle login logic here
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
          Email address
        </Label>
        <Input
          id='email'
          type='email'
          placeholder='Enter your email address'
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password' className='text-sm font-medium text-gray-700'>
          Password
        </Label>
        <Input
          id='password'
          type='password'
          placeholder='Enter your password'
          className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          required
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
            Signing in...
          </>
        ) : (
          <>
            Sign in
            <span className='text-lg'>›</span>
          </>
        )}
      </Button>
    </form>
  );
}
