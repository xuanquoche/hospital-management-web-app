import { Suspense } from 'react';

import MyPatientListContainer from '@/components/modules/doctor/my-patient/MyPatientListContainer';
import GlobalSkeleton from '@/components/ui/GlobalSkeleton';

export default function MyPatientsPage() {
  return (
    <Suspense fallback={<GlobalSkeleton />}>
      <MyPatientListContainer />
    </Suspense>
  );
}
