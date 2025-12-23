import { notFound } from 'next/navigation';

import { AppointmentDetail } from '@/components/modules/admin-appointments/appointment-detail/AppointmentDetail';
import { serverFetcher } from '@/lib/fetcher';
import { ApiAppointment } from '@/types/appointment-api';

interface PageProps {
  params: {
    id: string;
  };
}

interface AppointmentDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ApiAppointment;
  timestamp: string;
}

export default async function AppointmentDetailPage({ params }: PageProps) {
  try {
    const response = await serverFetcher.get<AppointmentDetailResponse>(
      `/appointments/${params.id}`
    );

    if (!response?.data) {
      notFound();
    }

    return (
      <div className='p-6'>
        <AppointmentDetail appointment={response.data} />
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch appointment details:', error);
    notFound();
  }
}
