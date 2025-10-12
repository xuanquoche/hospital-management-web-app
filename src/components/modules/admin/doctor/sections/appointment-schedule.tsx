'use client';
import { ScheduleRow } from '@/components/modules/admin/doctor/sub/schedule-row';

export function AppointmentSchedule({ form }: { form: any }) {
  return (
    <div className='space-y-3'>
      <h2 className='text-lg font-semibold'>Appointment Schedule</h2>
      <ScheduleRow />
    </div>
  );
}
