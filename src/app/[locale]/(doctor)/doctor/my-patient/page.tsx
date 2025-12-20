'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { DashboardHeader } from '@/components/modules/doctor/dashboard/DashboardHeader';
import { PatientFilters } from '@/components/modules/doctor/my-patient/PatientFilters';
import { PatientListHeader } from '@/components/modules/doctor/my-patient/PatientListHeader';
import { PatientSummaryCard } from '@/components/modules/doctor/my-patient/PatientSummaryCard';
import { PatientTable } from '@/components/modules/doctor/my-patient/PatientTable';
import { PreExamNotesCard } from '@/components/modules/doctor/my-patient/PreExamNotesCard';
import { QuickAccessCard } from '@/components/modules/doctor/my-patient/QuickAccessCard';
import { clientFetcher } from '@/lib/fetcher';
import { MyPatient, MyPatientResponse } from '@/types/my-patient';

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

export default function MyPatientsPage() {
  const [patients, setPatients] = useState<MyPatient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await clientFetcher.get<MyPatientResponse>('/doctors/my-patients');
        if (response?.data) {
          setPatients(response.data);
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

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
            {loading ? (
              <div className='p-8 text-center text-slate-500'>Loading patients...</div>
            ) : (
              <PatientTable patients={patients} />
            )}
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
