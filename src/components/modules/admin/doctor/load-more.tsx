'use client';

import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface LoadMoreProps {
  onLoadMore: () => void;
}

export function LoadMore({ onLoadMore }: LoadMoreProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { threshold: 1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [onLoadMore]);

  return (
    <div ref={ref} className='flex justify-center mt-6'>
      <Button variant='outline' disabled>
        <Spinner className='mx-auto size-4' />
      </Button>
    </div>
  );
}
