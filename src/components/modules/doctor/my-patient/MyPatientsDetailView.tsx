'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { PatientDetail } from '@/components/modules/doctor/patient-detail/data';
import { DocumentsTab } from '@/components/modules/doctor/patient-detail/DocumentsTab';
import { HistoryTab } from '@/components/modules/doctor/patient-detail/HistoryTab';
import { OverviewTab } from '@/components/modules/doctor/patient-detail/OverviewTab';
import { PatientDetailHeader } from '@/components/modules/doctor/patient-detail/PatientDetailHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Animation
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

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

interface MyPatientsDetailViewProps {
  patient: PatientDetail;
}

export default function MyPatientsDetailView({
  patient,
}: MyPatientsDetailViewProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState('overview');
  const t = useTranslations('Doctor.MyPatients.Detail');

  return (
    <div className='min-h-screen bg-slate-50/50 p-6'>
      <motion.div variants={container} initial='hidden' animate='show'>
        <motion.div variants={item}>
          <PatientDetailHeader patient={patient} />
        </motion.div>

        <Tabs
          defaultValue='overview'
          className='w-full'
          onValueChange={setActiveTab}
        >
          <motion.div variants={item} className='mb-6'>
            <TabsList className='bg-transparent p-0 h-auto gap-6 border-b border-slate-200 w-full justify-start rounded-none'>
              <TabsTrigger
                value='overview'
                className='bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 py-2 text-slate-500 data-[state=active]:text-teal-700 font-medium'
              >
                {t('tabs.overview')}
              </TabsTrigger>
              <TabsTrigger
                value='history'
                className='bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 py-2 text-slate-500 data-[state=active]:text-teal-700 font-medium'
              >
                {t('tabs.history')}
              </TabsTrigger>
              <TabsTrigger
                value='medications'
                className='bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 py-2 text-slate-500 data-[state=active]:text-teal-700 font-medium'
              >
                {t('tabs.medications')}
              </TabsTrigger>
              <TabsTrigger
                value='labs'
                className='bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 py-2 text-slate-500 data-[state=active]:text-teal-700 font-medium'
              >
                {t('tabs.labs')}
              </TabsTrigger>
              <TabsTrigger
                value='notes'
                className='bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 py-2 text-slate-500 data-[state=active]:text-teal-700 font-medium'
              >
                {t('tabs.notes')}
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value='overview' className='mt-0'>
            <motion.div
              variants={tabContentVariants}
              initial='hidden'
              animate='show'
            >
              <OverviewTab patient={patient} />
            </motion.div>
          </TabsContent>

          <TabsContent value='history'>
            <motion.div
              variants={tabContentVariants}
              initial='hidden'
              animate='show'
            >
              <HistoryTab
                patientId={patient.id}
                appointments={patient.appointments}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value='medications'>
            <motion.div
              variants={tabContentVariants}
              initial='hidden'
              animate='show'
            >
              <div className='p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100'>
                {t('placeholders.medications')}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value='labs'>
            <motion.div
              variants={tabContentVariants}
              initial='hidden'
              animate='show'
            >
              <DocumentsTab
                patientId={patient.id}
                appointments={patient.appointments.map((apt) => ({
                  id: apt.id,
                  appointmentDate: apt.appointmentDate,
                }))}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value='notes'>
            <motion.div
              variants={tabContentVariants}
              initial='hidden'
              animate='show'
            >
              <div className='p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100'>
                {t('placeholders.notes')}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
