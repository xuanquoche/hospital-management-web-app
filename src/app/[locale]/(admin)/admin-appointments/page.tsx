import { AppointmentList } from '@/components/modules/admin-appointments/AppointmentList';
import { serverFetcher } from '@/lib/fetcher';
import { ApiAppointment, AppointmentListResponse } from '@/types/appointment-api';

export default async function AppointmentsPage() {
  let appointments: ApiAppointment[] = [];
  try {
    const response = await serverFetcher.get<AppointmentListResponse>('/appointments');
    if (response?.data) {
      appointments = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
  }

  return (
    <div className='p-6'>
      <AppointmentList appointments={appointments} />
    </div>
  );
}
