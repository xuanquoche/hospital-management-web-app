'use client';

import { DoctorAbout } from '@/components/modules/admin/doctor/detail/DoctorAbout';
import { DoctorAvailability } from '@/components/modules/admin/doctor/detail/DoctorAvailability';
import { DoctorAwards } from '@/components/modules/admin/doctor/detail/DoctorAwards';
import { DoctorBio } from '@/components/modules/admin/doctor/detail/DoctorBio';
import { DoctorCertifications } from '@/components/modules/admin/doctor/detail/DoctorCertifications';
import { DoctorEducation } from '@/components/modules/admin/doctor/detail/DoctorEducation';
import { DoctorHeader } from '@/components/modules/admin/doctor/detail/DoctorHeader';

export default function DoctorDetailPage() {
  return (
    <div className='container mx-auto py-8 px-4'>
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Left section */}
        <div className='flex-1 space-y-6'>
          <DoctorHeader />
          <DoctorAvailability />
          <DoctorBio />
          <DoctorEducation />
          <DoctorAwards />
          <DoctorCertifications />
        </div>

        {/* Right sidebar */}
        <div className='w-full lg:w-[320px]'>
          <DoctorAbout />
        </div>
      </div>
      <footer className='text-center text-sm text-muted-foreground mt-8'>
        © 2025 © Preclinic, All Rights Reserved
      </footer>
    </div>
  );
}
