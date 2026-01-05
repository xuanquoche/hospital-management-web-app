import MyPatientsView from '@/components/modules/doctor/my-patient/MyPatientsView';
import { serverFetcher } from '@/lib/fetcher';
import { MyPatient, MyPatientResponse } from '@/types/my-patient';

export default async function MyPatientListContainer() {
  let patients: MyPatient[] = [];

  try {
    const response = await serverFetcher.get<MyPatientResponse>(
      '/doctors/me/patients'
    );
    if (response?.data) {
      patients = response.data;
    }
  } catch (error) {
    console.error('Error fetching patients:', error);
  }

  return <MyPatientsView initialPatients={patients} />;
}
