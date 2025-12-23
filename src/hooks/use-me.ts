import { useEffect, useState } from 'react';

import { clientFetcher } from '@/lib/fetcher';
import { Doctor } from '@/types/doctor';

export interface UserData {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone: string;
  avatar: string;
  address: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface DoctorProfileData {
  id: string;
  professionalTitle: string;
  primarySpecialty: {
    id: string;
    name: string;
  };
  yearsOfExperience: number;
  subSpecialty: string;
  consultationFee: number;
  bio: string;
  status: string;
}

export interface ProfileData {
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

export interface GetMeResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: UserData;
    profile: ProfileData | DoctorProfileData;
  };
  timestamp: string;
}

export const useMe = () => {
  const [data, setData] = useState<{
    user: UserData;
    profile: ProfileData | DoctorProfileData;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true);
        const response: GetMeResponse = await clientFetcher.get('/users/me');
        console.log('get me', response);
        if (response.success) {
          setData(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch user data');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return {
    user: data?.user,
    profile: data?.profile,
    loading,
    error,
    refetch: async () => {
      try {
        setLoading(true);
        const response: GetMeResponse = await clientFetcher.get('/users/me');
        if (response.success) {
          setData(response.data);
        }
      } catch (err) {
        console.error('Error refetching user:', err);
      } finally {
        setLoading(false);
      }
    },
  };
};
