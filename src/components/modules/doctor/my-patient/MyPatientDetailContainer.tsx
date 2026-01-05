import { format } from 'date-fns';
import { notFound } from 'next/navigation';

import MyPatientsDetailView from '@/components/modules/doctor/my-patient/MyPatientsDetailView';
import { PatientDetail } from '@/components/modules/doctor/patient-detail/data';
import { serverFetcher } from '@/lib/fetcher';
import { MyPatientDetailResponse } from '@/types/my-patient';

export default async function MyPatientDetailContainer({ id }: { id: string }) {
  let patient: PatientDetail | null = null;

  try {
    const response = await serverFetcher.get<MyPatientDetailResponse>(
      `/doctors/my-patients/${id}`
    );

    if (response?.data) {
      const apiData = response.data;
      const todayVisit = apiData.appointments[0];

      patient = {
        id: apiData.id,
        name: apiData.user.fullName,
        age: apiData.dateOfBirth
          ? new Date().getFullYear() -
            new Date(apiData.dateOfBirth).getFullYear()
          : 0,
        gender: apiData.gender || 'N/A',
        dob: apiData.dateOfBirth
          ? format(new Date(apiData.dateOfBirth), 'dd/MM/yyyy')
          : 'N/A',
        address: apiData.user.address || 'N/A',
        avatar: apiData.user.avatar || '',
        tags: [
          apiData.allergies ? `Dị ứng: ${apiData.allergies}` : 'Không dị ứng',
          apiData.chronicDisease
            ? `Bệnh mãn tính: ${apiData.chronicDisease}`
            : 'Không bệnh mãn tính',
        ],
        currentPlan: todayVisit?.notes || 'Chưa có kế hoạch',
        personalInfo: {
          height: apiData.height ? `${apiData.height} cm` : 'N/A',
          weight: apiData.weight ? `${apiData.weight} kg` : 'N/A',
          bmi: 'N/A',
          job: 'N/A',
          lifestyle: 'N/A',
          familyHistory: [],
        },
        todayVisit: {
          id: todayVisit?.id,
          time: todayVisit?.timeSlot?.startTime || 'N/A',
          room: 'N/A',
          reason: todayVisit?.symptoms || 'N/A',
          diagnosis: todayVisit?.diagnosis || 'Chưa có chẩn đoán',
          plan: 'N/A',
          prescription: todayVisit?.prescription || 'Chưa có đơn thuốc',
          notes: todayVisit?.notes ? [todayVisit.notes] : [],
        },
        vitals: {
          bp: 'N/A',
          heartRate: 0,
          temp: 0,
          spO2: 0,
          respRate: 0,
          weight: apiData.weight || 0,
          weightChange: 'N/A',
        },
        timeline: apiData.appointments.map((apt) => ({
          date: format(new Date(apt.appointmentDate), 'dd/MM/yyyy'),
          time: apt.timeSlot.startTime,
          title: apt.symptoms || 'Khám bệnh',
          type: apt.examinationType,
          doctor: 'BS. Trần Quốc Huy', // Consider fetching dynamic doctor name if available
          status: apt.status,
        })),
        allergies: apiData.allergies
          ? [
              {
                name: apiData.allergies,
                reaction: 'N/A',
                severity: 'medium',
              },
            ]
          : [],
        medications: [],
        documents: [],
        doctorNotes: [],
        contact: {
          phone: apiData.user.phone,
          email: apiData.user.email,
          fullAddress: apiData.user.address || 'N/A',
        },
        nextAppointment: {
          date: 'N/A',
          type: 'N/A',
        },
        appointments: apiData.appointments.map((apt) => ({
          id: apt.id,
          appointmentDate: apt.appointmentDate,
          status: apt.status,
          examinationType: apt.examinationType,
          symptoms: apt.symptoms,
          diagnosis: apt.diagnosis,
          prescription: apt.prescription,
          notes: apt.notes,
          completedAt: apt.completedAt,
          timeSlot: {
            startTime: apt.timeSlot.startTime,
            endTime: apt.timeSlot.endTime,
          },
        })),
      };
    }
  } catch (error) {
    console.error('Error fetching patient detail:', error);
  }

  if (!patient) {
    notFound();
  }

  return <MyPatientsDetailView patient={patient} />;
}
