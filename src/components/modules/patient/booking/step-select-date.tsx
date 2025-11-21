'use client';

import { Calendar } from '@/components/ui/calendar';
import { useAppointmentStore } from '@/store/use-appointment-store';

export default function StepSelectDate() {
  const { setDate, setStep } = useAppointmentStore();

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setStep('time');
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-6'>Datum & Uhrzeit wählen</h2>
      <Calendar
        mode='single'
        onSelect={handleSelect}
        className='rounded-md border p-4'
      />
    </div>
  );
}
