import { notFound } from 'next/navigation';

import { AppointmentDetail } from '@/components/modules/admin-appointments/appointment-detail/AppointmentDetail';
import { serverFetcher } from '@/lib/fetcher';
import { ApiAppointment } from '@/types/appointment-api';

interface AppointmentDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ApiAppointment;
  timestamp: string;
}

export default async function PatientAppointmentDetailContainer({
  id,
}: {
  id: string;
}) {
  try {
    const response = await serverFetcher.get<AppointmentDetailResponse>(
      `/appointments/${id}`
    );

    if (!response?.data) {
      notFound();
    }

    return <AppointmentDetail appointment={response.data} />;
  } catch (error) {
    console.error('Failed to fetch appointment details:', error);
    notFound();
  }
}
