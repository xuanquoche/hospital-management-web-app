import { useCallback, useEffect, useState } from 'react';

import { clientFetcher } from '@/lib/fetcher';
import {
  ConsultationHistory,
  ConsultationHistoryResponse,
  DashboardAppointment,
  DashboardAppointmentsResponse,
  PatientProfile,
} from '@/types/patient-dashboard';

interface GetMeResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      fullName: string;
      phone: string;
      avatar: string;
    };
    profile: PatientProfile;
  };
  timestamp: string;
}

export interface PatientDashboardData {
  profile: PatientProfile | null;
  upcomingAppointments: DashboardAppointment[];
  consultationHistory: ConsultationHistory[];
}

export const usePatientDashboard = () => {
  const [data, setData] = useState<PatientDashboardData>({
    profile: null,
    upcomingAppointments: [],
    consultationHistory: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [meResponse, appointmentsResponse, consultationsResponse] =
        await Promise.all([
          clientFetcher.get<GetMeResponse>('/users/me'),
          clientFetcher.get<DashboardAppointmentsResponse>(
            '/patients/me/appointments?limit=10'
          ),
          clientFetcher.get<ConsultationHistoryResponse>(
            '/patients/me/consultations?limit=3'
          ),
        ]);

      const allAppointments = appointmentsResponse.success
        ? appointmentsResponse.data
        : [];
      const upcomingStatuses = ['PENDING', 'CONFIRMED', 'IN_PROGRESS'];
      const filteredAppointments = allAppointments
        .filter((apt) => upcomingStatuses.includes(apt.status))
        .slice(0, 5);

      setData({
        profile: meResponse.success
          ? (meResponse.data.profile as PatientProfile)
          : null,
        upcomingAppointments: filteredAppointments,
        consultationHistory: consultationsResponse.success
          ? consultationsResponse.data
          : [],
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    ...data,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};
