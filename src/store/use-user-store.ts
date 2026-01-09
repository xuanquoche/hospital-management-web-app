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
  // Track if initial fetch has been initiated to prevent duplicate calls
  _hasFetchedOnce: boolean;

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
  _hasFetchedOnce: false,

  fetchMe: async () => {
    const { user, isLoading, _hasFetchedOnce } = get();
    // Prevent duplicate calls: skip if already loaded, loading, or fetch already initiated
    if (user || isLoading || _hasFetchedOnce) return;

    // Mark that we've initiated fetch BEFORE setting isLoading
    // This prevents race conditions when multiple components call fetchMe() simultaneously
    set({ _hasFetchedOnce: true, isLoading: true, error: null });

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
    set({
      user: null,
      profile: null,
      isLoading: false,
      error: null,
      _hasFetchedOnce: false,
    }),
}));
