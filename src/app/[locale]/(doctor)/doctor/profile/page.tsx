'use client';

import { motion } from 'framer-motion';

import DoctorAchievements from '@/components/modules/doctor/profile/doctor-achievements';
import DoctorAvailableTime from '@/components/modules/doctor/profile/doctor-available-time';
import DoctorBiography from '@/components/modules/doctor/profile/doctor-biography';
import DoctorEducationExperience from '@/components/modules/doctor/profile/doctor-education-experience';
import DoctorProfileCard from '@/components/modules/doctor/profile/doctor-profile-card';
import DoctorServices from '@/components/modules/doctor/profile/doctor-services';
import DoctorSpecializations from '@/components/modules/doctor/profile/doctor-specializations';
import { DoctorProfileData, useMe } from '@/hooks/use-me';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DoctorDetailPage() {
  const { user, profile, loading } = useMe();

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className='p-6 text-center'>
        <p className='text-muted-foreground'>Không tìm thấy thông tin bác sĩ.</p>
      </div>
    );
  }

  // Cast profile to DoctorProfileData since we are in doctor context
  const doctorProfile = profile as DoctorProfileData;

  return (
    <motion.div variants={container} initial='hidden' animate='show' className='p-6 space-y-6'>
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Left Section */}
        <motion.div variants={item} className='lg:w-1/3 space-y-6'>
          <DoctorProfileCard user={user} profile={doctorProfile} />
          <DoctorAvailableTime profile={doctorProfile} />
        </motion.div>

        {/* Right Section */}
        <div className='lg:w-2/3 space-y-6'>
          <motion.div variants={item}>
            <DoctorBiography profile={doctorProfile} />
          </motion.div>
          <motion.div variants={item}>
            <DoctorEducationExperience profile={doctorProfile} />
          </motion.div>
          <motion.div variants={item}>
            <DoctorAchievements profile={doctorProfile} />
          </motion.div>
          <motion.div variants={item}>
            <DoctorServices profile={doctorProfile} />
          </motion.div>
          <motion.div variants={item}>
            <DoctorSpecializations profile={doctorProfile} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
