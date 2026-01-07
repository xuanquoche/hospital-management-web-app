import { useCallback, useEffect, useState } from 'react';

import { clientFetcher } from '@/lib/fetcher';

export interface PatientProfile {
  id: string;
  height: number;
  weight: number;
  bloodType: string;
  allergies: string;
  dateOfBirth: string;
  gender: string;
  healthInsuranceNumber: string;
  emergencyContact: string;
  identityNumber: string;
  chronicDisease: string;
}

export interface UserData {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  avatar: string;
}

export interface ConsultationItem {
  id: string;
  appointmentDate: string;
  completedAt: string | null;
  symptoms: string | null;
  diagnosis: string | null;
  notes: string | null;
  doctor: {
    user: {
      fullName: string;
      avatar: string;
    };
    primarySpecialty: {
      name: string;
    };
  };
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  examinationType: string;
  prescriptionItems: Array<{
    id: string;
    quantity: number;
    dosage: string;
    instructions: string;
    medicineBatch: {
      medicine: {
        name: string;
        unit: string;
      };
    };
  }>;
}

interface GetMeResponse {
  success: boolean;
  data: {
    user: UserData;
    profile: PatientProfile;
  };
}

interface ConsultationsResponse {
  success: boolean;
  data: ConsultationItem[];
  meta: {
    totalItems: number;
    totalPages: number;
  };
}

export interface HealthRecordData {
  user: UserData | null;
  profile: PatientProfile | null;
  consultations: ConsultationItem[];
  totalConsultations: number;
}

export const useHealthRecord = () => {
  const [data, setData] = useState<HealthRecordData>({
    user: null,
    profile: null,
    consultations: [],
    totalConsultations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [meResponse, consultationsResponse] = await Promise.all([
        clientFetcher.get<GetMeResponse>('/users/me'),
        clientFetcher.get<ConsultationsResponse>(
          '/patients/me/consultations?limit=20'
        ),
      ]);

      setData({
        user: meResponse.success ? meResponse.data.user : null,
        profile: meResponse.success ? meResponse.data.profile : null,
        consultations: consultationsResponse.success
          ? consultationsResponse.data
          : [],
        totalConsultations: consultationsResponse.success
          ? consultationsResponse.meta?.totalItems ||
            consultationsResponse.data.length
          : 0,
      });
    } catch (err) {
      console.error('Error fetching health record data:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...data,
    loading,
    error,
    refetch: fetchData,
  };
};
