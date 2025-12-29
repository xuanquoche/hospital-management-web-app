import { Suspense } from 'react';

import { ApiAppointment } from '@/types/appointment-api';

import { AppointmentFilter } from './AppointmentFilter';
import { AppointmentListHeader } from './AppointmentListHeader';
import { AppointmentTable } from './AppointmentTable';

interface AppointmentListProps {
  appointments: ApiAppointment[];
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export async function AppointmentList({
  appointments,
  meta,
}: AppointmentListProps) {
  return (
    <div className='flex flex-col gap-6'>
      <AppointmentListHeader />
      <Suspense fallback={<div>Loading filters...</div>}>
        <AppointmentFilter />
      </Suspense>
      <AppointmentTable appointments={appointments} meta={meta} />
    </div>
  );
}
