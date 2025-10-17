'use client';

import PatientHeader from '@/components/modules/admin/patients/detail/patient-header';
import PatientInfo from '@/components/modules/admin/patients/detail/patient-info';
import PatientTabs from '@/components/modules/admin/patients/detail/patient-tabs';
import PatientVitals from '@/components/modules/admin/patients/detail/patient-vitals';
import { Card, CardContent } from '@/components/ui/card';

export default function PatientDetailPage() {
  return (
    <div className='p-6 space-y-6'>
      <PatientHeader />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <PatientInfo />
        <PatientVitals />
      </div>

      <Card className='mt-6'>
        <CardContent>
          <PatientTabs />
        </CardContent>
      </Card>
    </div>
  );
}
