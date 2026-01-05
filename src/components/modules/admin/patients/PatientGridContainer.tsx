import { PatientGrid } from '@/components/modules/admin/patients/patient-grid';
import { PatientHeader } from '@/components/modules/admin/patients/patient-header';
import { serverFetcher } from '@/lib/fetcher';
import { ApiPatient, PatientListResponse } from '@/types/patient-api';

export default async function PatientGridContainer() {
  let patients: ApiPatient[] = [];
  try {
    const response =
      await serverFetcher.get<PatientListResponse>('/admin/patients');
    if (response?.data) {
      patients = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch patients:', error);
  }

  return (
    <div className='flex flex-col gap-6'>
      <PatientHeader total={patients.length} />
      <PatientGrid patients={patients} />
    </div>
  );
}
