import { PrescriptionForm } from '@/components/modules/doctor/my-patient/PrescriptionForm';

interface PrescriptionPageProps {
  params: Promise<{
    id: string;
    appointmentId: string;
  }>;
}

export default async function PrescriptionPage({ params }: PrescriptionPageProps) {
  const { id, appointmentId } = await params;

  return (
    <div className='container mx-auto py-6 max-w-5xl'>
      <PrescriptionForm patientId={id} appointmentId={appointmentId} />
    </div>
  );
}
