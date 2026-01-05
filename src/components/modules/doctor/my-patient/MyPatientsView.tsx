'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { PatientFilters } from '@/components/modules/doctor/my-patient/PatientFilters';
import { PatientListHeader } from '@/components/modules/doctor/my-patient/PatientListHeader';
import { PatientSummaryCard } from '@/components/modules/doctor/my-patient/PatientSummaryCard';
import { PatientTable } from '@/components/modules/doctor/my-patient/PatientTable';
import { PreExamNotesCard } from '@/components/modules/doctor/my-patient/PreExamNotesCard';
import { QuickAccessCard } from '@/components/modules/doctor/my-patient/QuickAccessCard';
import { MyPatient } from '@/types/my-patient';

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

interface MyPatientsViewProps {
  initialPatients: MyPatient[];
}

export default function MyPatientsView({
  initialPatients,
}: MyPatientsViewProps) {
  const [patients] = useState<MyPatient[]>(initialPatients);

  return (
    <div className='min-h-screen bg-slate-50/50 p-6'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-slate-500'>My Patients</h1>
      </div>

      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='grid grid-cols-1 xl:grid-cols-12 gap-6'
      >
        {/* Left Column: Main Content */}
        <div className='xl:col-span-9'>
          <motion.div variants={item}>
            <PatientListHeader />
          </motion.div>

          <motion.div variants={item} className='space-y-0'>
            <PatientFilters />
            <PatientTable patients={patients} />
          </motion.div>
        </div>

        {/* Right Column: Sidebar Widgets */}
        <div className='xl:col-span-3 space-y-6'>
          <motion.div variants={item}>
            <PatientSummaryCard />
          </motion.div>
          <motion.div variants={item}>
            <PreExamNotesCard />
          </motion.div>
          <motion.div variants={item}>
            <QuickAccessCard />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
