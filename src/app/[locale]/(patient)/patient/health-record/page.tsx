'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

import { DoctorSuggestionsCard } from '@/components/modules/patient/health-record/DoctorSuggestionsCard';
import { DocumentsCard } from '@/components/modules/patient/health-record/DocumentsCard';
import { HealthOverviewCard } from '@/components/modules/patient/health-record/HealthOverviewCard';
import { HealthRecordHeader } from '@/components/modules/patient/health-record/HealthRecordHeader';
import { RecentLabResultsCard } from '@/components/modules/patient/health-record/RecentLabResultsCard';
import { VisitDetailCard } from '@/components/modules/patient/health-record/VisitDetailCard';
import { VisitHistoryList } from '@/components/modules/patient/health-record/VisitHistoryList';
import { useHealthRecord } from '@/hooks/use-health-record';

export default function HealthRecordPage() {
  const { user, profile, consultations, totalConsultations, loading } =
    useHealthRecord();

  const [selectedVisitId, setSelectedVisitId] = useState<string>('');

  useEffect(() => {
    if (consultations.length > 0 && !selectedVisitId) {
      setSelectedVisitId(consultations[0].id);
    }
  }, [consultations, selectedVisitId]);

  const selectedVisit =
    consultations.find((v) => v.id === selectedVisitId) || null;

  return (
    <div className='min-h-screen bg-slate-50/50 p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900'>Hồ sơ sức khỏe</h1>
        <p className='mt-2 text-slate-500'>
          Xem lại lịch sử khám, chẩn đoán, đơn thuốc và kết quả xét nghiệm.
        </p>
      </div>

      <HealthRecordHeader
        user={user}
        profile={profile}
        consultations={consultations}
        loading={loading}
      />

      <div className='grid grid-cols-1 xl:grid-cols-12 gap-8'>
        <div className='xl:col-span-8 space-y-8'>
          <VisitHistoryList
            consultations={consultations}
            selectedVisitId={selectedVisitId}
            onSelectVisit={setSelectedVisitId}
            loading={loading}
          />

          <AnimatePresence mode='wait'>
            <motion.div
              key={selectedVisitId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <VisitDetailCard visit={selectedVisit} loading={loading} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className='xl:col-span-4'>
          <HealthOverviewCard
            profile={profile}
            totalConsultations={totalConsultations}
            loading={loading}
          />
          <RecentLabResultsCard />
          <DocumentsCard />
          <DoctorSuggestionsCard />
        </div>
      </div>
    </div>
  );
}
