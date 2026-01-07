import { Suspense } from 'react';

import PatientAppointmentDetailContainer from '@/components/modules/patient/appointments/PatientAppointmentDetailContainer';
import GlobalSkeleton from '@/components/ui/GlobalSkeleton';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AppointmentDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className='container py-6'>
      <Suspense fallback={<GlobalSkeleton />}>
        <PatientAppointmentDetailContainer id={id} />
      </Suspense>
    </div>
  );
}
