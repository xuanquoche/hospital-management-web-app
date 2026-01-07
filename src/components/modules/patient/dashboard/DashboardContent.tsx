'use client';

import { Search, CalendarPlus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { usePatientDashboard } from '@/hooks/use-patient-dashboard';

import { HealthMetrics } from './HealthMetrics';
import { MedicalDocuments } from './MedicalDocuments';
import { NewsCard } from './NewsCard';
import { PromoBanner } from './PromoBanner';
import { QuickActions } from './QuickActions';
import { RecentHistory } from './RecentHistory';
import { UpcomingAppointments } from './UpcomingAppointments';

export const DashboardContent = () => {
  const { profile, upcomingAppointments, consultationHistory, loading } =
    usePatientDashboard();

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-slate-50/50'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='h-8 w-8 animate-spin text-teal-600' />
          <p className='text-slate-500'>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50/50 p-8'>
      <div className='mb-8 flex items-end justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Trang chủ</h1>
          <p className='mt-2 text-slate-500'>
            Đặt lịch nhanh, xem lịch khám sắp tới và theo dõi sức khỏe.
          </p>
        </div>
        <div className='flex gap-3'>
          <Button
            variant='outline'
            className='gap-2 border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800'
          >
            <Search className='h-4 w-4' /> Tìm bác sĩ
          </Button>
          <Link href='/patient/booking'>
            <Button className='gap-2 bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700'>
              <CalendarPlus className='h-4 w-4' /> Đặt lịch ngay
            </Button>
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        <div className='space-y-6 lg:col-span-8'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-5'>
            <div className='md:col-span-3'>
              <PromoBanner />
            </div>
            <div className='md:col-span-2'>
              <NewsCard />
            </div>
          </div>

          <QuickActions />

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <UpcomingAppointments appointments={upcomingAppointments} />
            <HealthMetrics profile={profile} />
          </div>
        </div>

        <div className='space-y-6 lg:col-span-4'>
          <RecentHistory consultations={consultationHistory} />
          <MedicalDocuments consultations={consultationHistory} />
        </div>
      </div>
    </div>
  );
};
