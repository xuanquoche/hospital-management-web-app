import { create } from 'zustand';

import { clientFetcher } from '@/lib/fetcher';
import {
  UserData,
  ProfileData,
  DoctorProfileData,
  UserProfileResponse,
} from '@/types/user';

interface UserState {
  user: UserData | null;
  profile: ProfileData | DoctorProfileData | null;
  isLoading: boolean;
  error: Error | null;

  fetchMe: () => Promise<void>;
  refetch: () => Promise<void>;
  setUser: (user: UserData) => void;
  setProfile: (profile: ProfileData | DoctorProfileData) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: false,
  error: null,

  fetchMe: async () => {
    const { user, isLoading } = get();
    if (user || isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const response: UserProfileResponse =
        await clientFetcher.get('/users/me');
      if (response.success && response.data) {
        set({
          user: response.data.user,
          profile: response.data.profile,
          isLoading: false,
        });
      } else {
        throw new Error(response.message || 'Failed to fetch user data');
      }
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  refetch: async () => {
    set({ isLoading: true, error: null });
    try {
      const response: UserProfileResponse =
        await clientFetcher.get('/users/me');
      if (response.success && response.data) {
        set({
          user: response.data.user,
          profile: response.data.profile,
          isLoading: false,
        });
      } else {
        throw new Error(response.message || 'Failed to fetch user data');
      }
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  setUser: (user) => set({ user }),

  setProfile: (profile) => set({ profile }),

  reset: () =>
    set({ user: null, profile: null, isLoading: false, error: null }),
}));
