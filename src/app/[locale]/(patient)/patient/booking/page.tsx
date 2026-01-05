import { Suspense } from 'react';

import BookingContainer from '@/components/modules/patient/booking/BookingContainer';
import GlobalSkeleton from '@/components/ui/GlobalSkeleton';

export default function PatientBookingPage() {
  return (
    <Suspense fallback={<GlobalSkeleton />}>
      <BookingContainer />
    </Suspense>
  );
}
