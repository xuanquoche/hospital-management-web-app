import { notFound } from 'next/navigation';

import { AppointmentDetail } from '@/components/modules/admin-appointments/appointment-detail/AppointmentDetail';
import { PatientPrescriptionView } from '@/components/modules/patient/appointments/PatientPrescriptionView';
import { PrescriptionPaymentSection } from '@/components/modules/patient/appointments/PrescriptionPaymentSection';
import { serverFetcher } from '@/lib/fetcher';
import { ApiAppointment } from '@/types/appointment-api';

interface AppointmentDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ApiAppointment;
  timestamp: string;
}

export default async function PatientAppointmentDetailContainer({
  id,
}: {
  id: string;
}) {
  try {
    const response = await serverFetcher.get<AppointmentDetailResponse>(
      `/appointments/${id}`
    );

    if (!response?.data) {
      notFound();
    }

    const appointment = response.data;
    const { status, medicinePayment } = appointment;
    const medicineFee = appointment.medicineFee ?? 0;
    const totalFee = appointment.totalFee ?? 0;
    const isCompleted = status === 'COMPLETED';
    const isInProgress = status === 'IN_PROGRESS';
    const hasMedicineFee = medicineFee > 0;
    const isMedicinePaid = medicinePayment?.status === 'SUCCESS';
    const needsMedicinePayment =
      isInProgress && hasMedicineFee && !isMedicinePaid;
    const canViewPrescription = isCompleted;

    return (
      <div className='space-y-8'>
        <AppointmentDetail appointment={appointment} />
        {needsMedicinePayment && medicinePayment && (
          <PrescriptionPaymentSection
            appointmentId={id}
            medicineFee={medicineFee}
            totalFee={totalFee}
            paymentCode={medicinePayment.paymentCode}
            doctorName={appointment.doctor.name}
            appointmentDate={appointment.appointmentDate}
            timeSlot={`${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}`}
          />
        )}
        {canViewPrescription && <PatientPrescriptionView appointmentId={id} />}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch appointment details:', error);
    notFound();
  }
}
