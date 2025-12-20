'use client';

import { ApiAppointment } from '@/types/appointment-api';

import { AppointmentFilter } from './AppointmentFilter';
import { AppointmentListHeader } from './AppointmentListHeader';
import { AppointmentTable } from './AppointmentTable';

interface AppointmentListProps {
  appointments: ApiAppointment[];
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  return (
    <div className='flex flex-col gap-6'>
      <AppointmentListHeader />
      <AppointmentFilter />
      <AppointmentTable appointments={appointments} />
    </div>
  );
}
