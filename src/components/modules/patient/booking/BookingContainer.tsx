import PatientBookingView from '@/components/modules/patient/booking/PatientBookingView';
import { serverFetcher } from '@/lib/fetcher';
import { UserProfileResponse } from '@/types/user';

export default async function BookingContainer() {
  let userInfo: UserProfileResponse['data'] | null = null;

  try {
    const res = await serverFetcher.get<UserProfileResponse>('/users/me');
    if (res?.data) {
      userInfo = res.data;
    }
  } catch (error) {
    console.log('fail to get me in booking container', error);
  }

  return <PatientBookingView initialUserInfo={userInfo} />;
}
