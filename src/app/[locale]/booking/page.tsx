'use client';

import Sidebar from '@/components/modules/patient/booking/sidebar-appoinment';
import StepComplete from '@/components/modules/patient/booking/step-complete';
import StepEnterInfo from '@/components/modules/patient/booking/step-enter-info';
import StepSelectDate from '@/components/modules/patient/booking/step-select-date';
import StepSelectTime from '@/components/modules/patient/booking/step-select-time';
import { useAppointmentStore } from '@/store/use-appointment-store';

export default function AppointmentPage() {
  const { step } = useAppointmentStore();

  const renderStep = () => {
    switch (step) {
      case 'date':
        return <StepSelectDate />;
      case 'time':
        return <StepSelectTime />;
      case 'info':
        return <StepEnterInfo />;
      case 'complete':
        return <StepComplete />;
      default:
        return null;
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50 rounded-2xl shadow-lg overflow-hidden'>
      <Sidebar />
      <main className='flex-1 p-10'>{renderStep()}</main>
    </div>
  );
}
