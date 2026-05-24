import { clientFetcher } from '@/lib/fetcher';

import { useUserStore } from './use-user-store';

jest.mock('@/lib/fetcher', () => ({
  clientFetcher: {
    get: jest.fn(),
  },
}));

const getMock = jest.mocked(clientFetcher.get);

const profile = {
  allergies: '',
  bloodType: 'O',
  chronicDisease: '',
  dateOfBirth: '1990-01-01',
  emergencyContact: '0900000001',
  gender: 'MALE',
  healthInsuranceNumber: 'HI-1',
  height: 170,
  id: 'profile-1',
  identityNumber: 'ID-1',
  weight: 65,
};

const user = {
  address: 'Ho Chi Minh City',
  avatar: '',
  createdAt: '2026-05-24T00:00:00.000Z',
  email: 'patient@example.com',
  fullName: 'Patient One',
  id: 'user-1',
  isActive: true,
  phone: '0900000000',
  role: 'PATIENT',
  username: 'patient',
};

describe('useUserStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useUserStore.getState().reset();
  });

  it('fetches and stores the current user once', async () => {
    getMock.mockResolvedValue({
      data: { profile, user },
      success: true,
    });

    await useUserStore.getState().fetchMe();
    await useUserStore.getState().fetchMe();

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith('/users/me');
    expect(useUserStore.getState()).toMatchObject({
      _hasFetchedOnce: true,
      error: null,
      isLoading: false,
      profile,
      user,
    });
  });

  it('stores an error for unsuccessful responses', async () => {
    getMock.mockResolvedValue({
      message: 'Profile unavailable',
      success: false,
    });

    await useUserStore.getState().fetchMe();

    expect(useUserStore.getState().error).toEqual(
      new Error('Profile unavailable')
    );
    expect(useUserStore.getState().isLoading).toBe(false);
  });

  it('refetches even when a user already exists', async () => {
    getMock
      .mockResolvedValueOnce({ data: { profile, user }, success: true })
      .mockResolvedValueOnce({
        data: {
          profile,
          user: { ...user, fullName: 'Updated Patient' },
        },
        success: true,
      });

    await useUserStore.getState().fetchMe();
    await useUserStore.getState().refetch();

    expect(getMock).toHaveBeenCalledTimes(2);
    expect(useUserStore.getState().user?.fullName).toBe('Updated Patient');
  });
});
