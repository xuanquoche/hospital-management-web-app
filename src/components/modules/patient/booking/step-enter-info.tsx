'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppointmentStore } from '@/store/use-appointment-store';

export default function StepEnterInfo() {
  const { setCurrentStep } = useAppointmentStore();

  return (
    <div className='max-w-sm space-y-4'>
      <h2 className='text-2xl font-semibold mb-4'>Ihre Informationen</h2>
      <Input placeholder='Name' />
      <Input placeholder='Adresse' />
      <Input placeholder='Ärztin/Arzt' />
      <Button className='w-full' onClick={() => setCurrentStep(4)}>
        Termin buchen
      </Button>
    </div>
  );
}
