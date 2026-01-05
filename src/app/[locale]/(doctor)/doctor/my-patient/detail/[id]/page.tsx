import { Suspense } from 'react';
import React from 'react';

import MyPatientDetailContainer from '@/components/modules/doctor/my-patient/MyPatientDetailContainer';
import GlobalSkeleton from '@/components/ui/GlobalSkeleton';

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<GlobalSkeleton />}>
      <MyPatientDetailContainer id={id} />
    </Suspense>
  );
}
