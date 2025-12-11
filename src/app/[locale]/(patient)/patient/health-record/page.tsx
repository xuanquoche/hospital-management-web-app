'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import { mockVisits } from '@/components/modules/patient/health-record/data';
import { DoctorSuggestionsCard } from '@/components/modules/patient/health-record/DoctorSuggestionsCard';
import { DocumentsCard } from '@/components/modules/patient/health-record/DocumentsCard';
import { HealthOverviewCard } from '@/components/modules/patient/health-record/HealthOverviewCard';
import { HealthRecordHeader } from '@/components/modules/patient/health-record/HealthRecordHeader';
import { RecentLabResultsCard } from '@/components/modules/patient/health-record/RecentLabResultsCard';
import { VisitDetailCard } from '@/components/modules/patient/health-record/VisitDetailCard';
import { VisitHistoryList } from '@/components/modules/patient/health-record/VisitHistoryList';

export default function HealthRecordPage() {
  const [selectedVisitId, setSelectedVisitId] = useState<string>(
    mockVisits[0].id
  );

  const selectedVisit =
    mockVisits.find((v) => v.id === selectedVisitId) || mockVisits[0];

  return (
    <div className='min-h-screen bg-slate-50/50 p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900'>Hồ sơ sức khỏe</h1>
        <p className='mt-2 text-slate-500'>
          Xem lại lịch sử khám, chẩn đoán, đơn thuốc và kết quả xét nghiệm.
        </p>
      </div>

      <HealthRecordHeader />

      <div className='grid grid-cols-1 xl:grid-cols-12 gap-8'>
        {/* Left Column: History & Details */}
        <div className='xl:col-span-8 space-y-8'>
          <VisitHistoryList
            visits={mockVisits}
            selectedVisitId={selectedVisitId}
            onSelectVisit={setSelectedVisitId}
          />

          <AnimatePresence mode='wait'>
            <motion.div
              key={selectedVisitId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <VisitDetailCard visit={selectedVisit} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Sidebar */}
        <div className='xl:col-span-4'>
          <HealthOverviewCard />
          <RecentLabResultsCard />
          <DocumentsCard />
          <DoctorSuggestionsCard />
        </div>
      </div>
    </div>
  );
}
