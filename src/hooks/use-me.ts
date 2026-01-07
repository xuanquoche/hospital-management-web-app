import { useEffect } from 'react';

import { useUserStore } from '@/store/use-user-store';
import { UserData, ProfileData, DoctorProfileData } from '@/types/user';

export type { UserData, ProfileData, DoctorProfileData };

export const useMe = () => {
  const { user, profile, isLoading, error, fetchMe, refetch } = useUserStore();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return {
    user,
    profile,
    loading: isLoading,
    error,
    refetch,
  };
};
