'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { DashboardHeader } from '@/components/modules/doctor/dashboard/DashboardHeader';
import { mockAppointments, mockRecentPatients } from '@/components/modules/doctor/dashboard/data';
import { DoctorProfileCard } from '@/components/modules/doctor/dashboard/DoctorProfileCard';
import { DocumentStatusCard } from '@/components/modules/doctor/dashboard/DocumentStatusCard';
import { QuickActions } from '@/components/modules/doctor/dashboard/QuickActions';
import { QuickStats } from '@/components/modules/doctor/dashboard/QuickStats';
import { RecentPatients } from '@/components/modules/doctor/dashboard/RecentPatients';
import { ShiftNotesCard } from '@/components/modules/doctor/dashboard/ShiftNotesCard';
import { TodaySchedule } from '@/components/modules/doctor/dashboard/TodaySchedule';
import { WelcomeSection } from '@/components/modules/doctor/dashboard/WelcomeSection';

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

export default function DoctorDashboardPage() {
  return (
    <div className='min-h-screen bg-slate-50/50 p-6'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-slate-500'>Doctor Dashboard</h1>
      </div>

      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='grid grid-cols-1 xl:grid-cols-12 gap-6'
      >
        {/* Left Column: Main Content */}
        <div className='xl:col-span-8 space-y-6'>
          <motion.div variants={item}>
            <WelcomeSection />
          </motion.div>
          <motion.div variants={item}>
            <QuickActions />
          </motion.div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <motion.div variants={item} className='h-full'>
              <TodaySchedule appointments={mockAppointments} />
            </motion.div>
            <div className='space-y-6'>
              <motion.div variants={item}>
                <QuickStats />
              </motion.div>
              <motion.div variants={item}>
                <RecentPatients patients={mockRecentPatients} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Widgets */}
        <div className='xl:col-span-4 space-y-6'>
          <motion.div variants={item}>
            <ShiftNotesCard />
          </motion.div>
          <motion.div variants={item}>
            <DocumentStatusCard />
          </motion.div>
          <motion.div variants={item}>
            <DoctorProfileCard />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
