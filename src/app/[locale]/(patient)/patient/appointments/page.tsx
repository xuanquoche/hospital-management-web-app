import React from 'react';

import { AppointmentHistoryList } from '@/components/modules/patient/appointments/AppointmentHistoryList';

export default function AppointmentHistoryPage() {
  return (
    <div className='container mx-auto py-8 max-w-5xl space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Lịch sử khám bệnh</h1>
        <p className='text-muted-foreground mt-2'>
          Xem lại danh sách các cuộc hẹn khám bệnh của bạn.
        </p>
      </div>

      <AppointmentHistoryList />
    </div>
  );
}
