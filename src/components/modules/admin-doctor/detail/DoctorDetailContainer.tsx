import { notFound } from 'next/navigation';

import { DoctorDetailHeader } from '@/components/modules/admin-doctor/detail/DoctorDetailHeader';
import { DoctorDetailTabs } from '@/components/modules/admin-doctor/detail/DoctorDetailTabs';
import { serverFetcher } from '@/lib/fetcher';
import { Doctor } from '@/types/doctor';

export default async function DoctorDetailContainer({ id }: { id: string }) {
  let doctor: Doctor | null = null;

  try {
    const response = await serverFetcher.get<any>(`/admin/doctors/${id}`);
    if (response?.data) {
      doctor = response.data;
    }
  } catch (error) {
    console.error('Error fetching doctor details:', error);
  }

  if (!doctor) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-6'>
      <DoctorDetailHeader doctor={doctor} />
      <DoctorDetailTabs doctor={doctor} />
    </div>
  );
}
