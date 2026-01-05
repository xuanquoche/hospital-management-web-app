import { Suspense } from 'react';

import PatientGridContainer from '@/components/modules/admin/patients/PatientGridContainer';
import GlobalSkeleton from '@/components/ui/GlobalSkeleton';

export default function PatientListPage() {
  return (
    <div className='p-6'>
      <Suspense fallback={<GlobalSkeleton />}>
        <PatientGridContainer />
      </Suspense>
    </div>
  );
}
