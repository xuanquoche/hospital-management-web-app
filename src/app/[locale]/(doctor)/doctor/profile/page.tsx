'use client';

import DoctorAchievements from '@/components/modules/doctor/profile/doctor-achievements';
import DoctorAvailableTime from '@/components/modules/doctor/profile/doctor-available-time';
import DoctorBiography from '@/components/modules/doctor/profile/doctor-biography';
import DoctorEducationExperience from '@/components/modules/doctor/profile/doctor-education-experience';
import DoctorProfileCard from '@/components/modules/doctor/profile/doctor-profile-card';
import DoctorServices from '@/components/modules/doctor/profile/doctor-services';
import DoctorSpecializations from '@/components/modules/doctor/profile/doctor-specializations';

export default function DoctorDetailPage() {
  return (
    <div className='p-6 space-y-6'>
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Left Section */}
        <div className='lg:w-1/3 space-y-6'>
          <DoctorProfileCard />
          <DoctorAvailableTime />
        </div>

        {/* Right Section */}
        <div className='lg:w-2/3 space-y-6'>
          <DoctorBiography />
          <DoctorEducationExperience />
          <DoctorAchievements />
          <DoctorServices />
          <DoctorSpecializations />
        </div>
      </div>
    </div>
  );
}
