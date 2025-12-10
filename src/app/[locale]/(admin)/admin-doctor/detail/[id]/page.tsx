import { notFound } from 'next/navigation';

import { DoctorDetailHeader } from '@/components/modules/admin-doctor/detail/DoctorDetailHeader';
import { DoctorDetailTabs } from '@/components/modules/admin-doctor/detail/DoctorDetailTabs';
import { serverFetcher } from '@/lib/fetcher';
import { Doctor } from '@/types/doctor';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { id } = await params;

  let doctor: Doctor | null = null;

  try {
    const response = await serverFetcher.get(`/admin/doctors/${id}`);
    if (response.data) {
      doctor = response.data;
    }
  } catch (error) {
    console.error('Error fetching doctor details:', error);
  }

  if (!doctor) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-6 p-6'>
      <DoctorDetailHeader doctor={doctor} />
      <DoctorDetailTabs doctor={doctor} />
    </div>
  );
}
