'use client';

import { useEffect } from 'react';

import { clientFetcher } from '@/lib/fetcher';

export default function Header() {
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await clientFetcher.get('/auth/me');
        console.log('Fetched data:', data);
      } catch (error) {
        console.log('error fetch data', error);
      }
    }

    fetchData();
  }, []);

  return (
    <header className='w-full bg-blue-600 text-white p-4'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Hospital Management</h1>
      </div>
    </header>
  );
}
