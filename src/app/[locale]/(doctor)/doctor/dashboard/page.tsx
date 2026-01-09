'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';

// Above-the-fold components - loaded synchronously for LCP
import { DashboardCardSkeleton } from '@/components/modules/doctor/dashboard/DashboardSkeleton';
import {
  mockAppointments,
  mockRecentPatients,
} from '@/components/modules/doctor/dashboard/data';
import { QuickActions } from '@/components/modules/doctor/dashboard/QuickActions';
import { QuickStats } from '@/components/modules/doctor/dashboard/QuickStats';
import { RecentPatients } from '@/components/modules/doctor/dashboard/RecentPatients';
import { TodaySchedule } from '@/components/modules/doctor/dashboard/TodaySchedule';
import { WelcomeSection } from '@/components/modules/doctor/dashboard/WelcomeSection';

// Below-the-fold components - lazy loaded with ssr: false to reduce TBT
const ShiftNotesCard = dynamic(
  () =>
    import('@/components/modules/doctor/dashboard/ShiftNotesCard').then(
      (m) => m.ShiftNotesCard
    ),
  {
    ssr: false,
    loading: () => <DashboardCardSkeleton />,
  }
);

const DocumentStatusCard = dynamic(
  () =>
    import('@/components/modules/doctor/dashboard/DocumentStatusCard').then(
      (m) => m.DocumentStatusCard
    ),
  {
    ssr: false,
    loading: () => <DashboardCardSkeleton />,
  }
);

const DoctorProfileCard = dynamic(
  () =>
    import('@/components/modules/doctor/dashboard/DoctorProfileCard').then(
      (m) => m.DoctorProfileCard
    ),
  {
    ssr: false,
    loading: () => <DashboardCardSkeleton />,
  }
);

export default function DoctorDashboardPage() {
  const t = useTranslations('Doctor.Dashboard');

  return (
    <div className='min-h-screen bg-slate-50/50 p-6'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-slate-500'>
          {t('Welcome.title')}
        </h1>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>
        {/* Left Column: Main Content - Critical path, no animation delay */}
        <div className='xl:col-span-8 space-y-6'>
          <WelcomeSection />
          <QuickActions />

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='h-full'>
              <TodaySchedule appointments={mockAppointments} />
            </div>
            <div className='space-y-6'>
              <QuickStats />
              <RecentPatients patients={mockRecentPatients} />
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Widgets - Lazy loaded to reduce TBT */}
        <div className='xl:col-span-4 space-y-6'>
          <Suspense fallback={<DashboardCardSkeleton />}>
            <ShiftNotesCard />
          </Suspense>
          <Suspense fallback={<DashboardCardSkeleton />}>
            <DocumentStatusCard />
          </Suspense>
          <Suspense fallback={<DashboardCardSkeleton />}>
            <DoctorProfileCard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
