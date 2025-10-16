'use client';

import { useState } from 'react';

import { PatientGrid } from '@/components/modules/admin/patients/patient-grid';
import { PatientHeader } from '@/components/modules/admin/patients/patient-header';
import { mockPatients } from '@/const/mock-data';

export default function PatientListPage() {
  const [patients] = useState(mockPatients);

  return (
    <div className='p-6 space-y-6'>
      <PatientHeader total={patients.length} />
      <PatientGrid patients={patients} />
    </div>
  );
}
