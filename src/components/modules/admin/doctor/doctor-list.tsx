'use client';

import { useState, useEffect } from 'react';

import { mockDoctors } from '@/const/mock-data';
import { Doctor } from '@/types/doctor';

import { DoctorCard } from './doctor-card';
import { LoadMore } from './load-more';

export function DoctorList() {
  const [visibleDoctors, setVisibleDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = page * ITEMS_PER_PAGE;
    setVisibleDoctors(mockDoctors.slice(0, end));
  }, [page]);

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {visibleDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {visibleDoctors.length < mockDoctors.length && (
        <LoadMore onLoadMore={() => setPage(page + 1)} />
      )}
    </div>
  );
}
