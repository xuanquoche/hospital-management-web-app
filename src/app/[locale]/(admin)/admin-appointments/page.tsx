import { Suspense } from 'react';

import AppointmentTableContainer from '@/components/modules/admin-appointments/AppointmentTableContainer';
import GlobalSkeleton from '@/components/ui/GlobalSkeleton';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AppointmentsPage({ searchParams }: PageProps) {
  // Await searchParams once at the top level to pass down,
  // effectively validating them, but the heavy fetch is inside the container.
  const resolvedParams = await searchParams;

  return (
    <div className='p-6'>
      <Suspense fallback={<GlobalSkeleton />}>
        <AppointmentTableContainer searchParams={resolvedParams} />
      </Suspense>
    </div>
  );
}
