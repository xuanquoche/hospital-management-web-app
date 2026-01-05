import { Suspense } from 'react';

import AppointmentDetailContainer from '@/components/modules/admin-appointments/AppointmentDetailContainer';
import GlobalSkeleton from '@/components/ui/GlobalSkeleton';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AppointmentDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className='p-6'>
      <Suspense fallback={<GlobalSkeleton />}>
        <AppointmentDetailContainer id={id} />
      </Suspense>
    </div>
  );
}
