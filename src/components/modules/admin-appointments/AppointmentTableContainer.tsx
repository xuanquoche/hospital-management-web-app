import { AppointmentList } from '@/components/modules/admin-appointments/AppointmentList';
import { serverFetcher } from '@/lib/fetcher';
import {
  ApiAppointment,
  AppointmentListResponse,
} from '@/types/appointment-api';

interface SimpleSearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function AppointmentTableContainer({
  searchParams,
}: {
  searchParams: SimpleSearchParams;
}) {
  const params = await searchParams;
  let appointments: ApiAppointment[] = [];
  let meta;

  const queryParams = new URLSearchParams();

  // Pagination
  const page = params?.page ? Number(params.page) : 1;
  const limit = params?.limit ? Number(params.limit) : 10;
  queryParams.set('page', page.toString());
  queryParams.set('limit', limit.toString());

  if (params?.patientSearch) {
    queryParams.set('patientSearch', params.patientSearch as string);
  }
  if (params?.status && params?.status !== 'all') {
    queryParams.set('status', params.status as string);
  }
  if (params?.doctorId && params?.doctorId !== 'all') {
    queryParams.set('doctorId', params.doctorId as string);
  }
  if (params?.startDate) {
    queryParams.set('startDate', params.startDate as string);
  }
  if (params?.endDate) {
    queryParams.set('endDate', params.endDate as string);
  }

  try {
    const response = await serverFetcher.get<AppointmentListResponse>(
      `/appointments?${queryParams.toString()}`
    );
    if (response?.data) {
      appointments = response.data;
      meta = response.meta;
    }
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
  }

  return <AppointmentList appointments={appointments} meta={meta} />;
}
