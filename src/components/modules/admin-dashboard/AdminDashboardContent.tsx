'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Loader2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useAdminDashboard } from '@/hooks/use-admin-dashboard';

import { DashboardCharts } from './DashboardCharts';
import { DoctorsActivity } from './DoctorsActivity';
import { QuickActions } from './QuickActions';
import { RecentAppointments } from './RecentAppointments';
import { RecentPayments } from './RecentPayments';
import { AppointmentStatusCards, StatisticsCards } from './StatisticsCards';

export const AdminDashboardContent = () => {
  const {
    stats,
    recentAppointments,
    recentDoctors,
    recentPayments,
    loading,
    refetch,
  } = useAdminDashboard();

  if (loading) {
    return (
      <div className='flex min-h-[60vh] items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='h-10 w-10 animate-spin text-violet-600' />
          <p className='text-slate-500'>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-8 flex items-end justify-between'
      >
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>Dashboard</h1>
          <p className='mt-2 text-slate-500'>
            Tổng quan hoạt động của hệ thống bệnh viện
          </p>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={refetch}
          className='gap-2 border-slate-200 text-slate-600 hover:bg-slate-50'
        >
          <RefreshCw className='h-4 w-4' />
          Làm mới
        </Button>
      </motion.div>

      <div className='space-y-8'>
        <StatisticsCards stats={stats} />

        <DashboardCharts stats={stats} />

        <AppointmentStatusCards stats={stats} />

        <div className='grid grid-cols-1 gap-8 xl:grid-cols-3'>
          <div className='xl:col-span-2'>
            <RecentAppointments appointments={recentAppointments} />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <DoctorsActivity doctors={recentDoctors} />
          <RecentPayments payments={recentPayments} />
        </div>
      </div>
    </div>
  );
};
