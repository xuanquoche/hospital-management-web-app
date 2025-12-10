'use client';

import { Search, CalendarPlus } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

import { HealthMetrics } from './HealthMetrics';
import { MedicalDocuments } from './MedicalDocuments';
import { NewsCard } from './NewsCard';
import { PromoBanner } from './PromoBanner';
import { QuickActions } from './QuickActions';
import { RecentHistory } from './RecentHistory';
import { UpcomingAppointments } from './UpcomingAppointments';

export const DashboardContent = () => {
  return (
    <div className='min-h-screen bg-slate-50/50 p-8'>
      {/* Page Header */}
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
          <Button className='gap-2 bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700'>
            <CalendarPlus className='h-4 w-4' /> Đặt lịch ngay
          </Button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        {/* Left Column (Main Content) */}
        <div className='space-y-6 lg:col-span-8'>
          {/* Top Banners Row */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-5'>
            <div className='md:col-span-3'>
              <PromoBanner />
            </div>
            <div className='md:col-span-2'>
              <NewsCard />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Bottom Row */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <UpcomingAppointments />
            <HealthMetrics />
          </div>
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div className='space-y-6 lg:col-span-4'>
          <RecentHistory />
          <MedicalDocuments />
        </div>
      </div>
    </div>
  );
};
