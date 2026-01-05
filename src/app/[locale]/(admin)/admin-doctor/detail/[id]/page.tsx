import { Suspense } from 'react';

import DoctorDetailContainer from '@/components/modules/admin-doctor/detail/DoctorDetailContainer';
import GlobalSkeleton from '@/components/ui/GlobalSkeleton';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className='p-6'>
      <Suspense fallback={<GlobalSkeleton />}>
        <DoctorDetailContainer id={id} />
      </Suspense>
    </div>
  );
}
