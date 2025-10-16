'use client';

import { PatientCard } from './patient-card';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  lastAppointment: string;
  location: string;
  avatar: string;
}

interface Props {
  patients: Patient[];
}

export function PatientGrid({ patients }: Props) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {patients.map((p) => (
        <PatientCard key={p.id} patient={p} />
      ))}
    </div>
  );
}
