'use client';

import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/store/use-appointment-store';

export default function StepSelectTime() {
  const { setStep } = useAppointmentStore();
  const times = ['5:30 PM', '6:30 PM', '7:30 PM', '8:30 PM', '9:30 PM'];

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Montag, 18. September</h2>
      <div className='grid gap-3 w-64'>
        {times.map((time) => (
          <Button
            key={time}
            variant='outline'
            className='justify-center'
            onClick={() => setStep('info')}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}
