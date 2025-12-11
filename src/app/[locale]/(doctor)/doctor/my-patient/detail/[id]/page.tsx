'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { DashboardHeader } from '@/components/modules/doctor/dashboard/DashboardHeader';
import { mockPatientDetail } from '@/components/modules/doctor/patient-detail/data';
import { OverviewTab } from '@/components/modules/doctor/patient-detail/OverviewTab';
import { PatientDetailHeader } from '@/components/modules/doctor/patient-detail/PatientDetailHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

export default function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='min-h-screen bg-slate-50/50 p-6'>
      <DashboardHeader />

      <motion.div variants={container} initial='hidden' animate='show'>
        <motion.div variants={item}>
          <PatientDetailHeader patient={mockPatientDetail} />
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
                Tổng quan
              </TabsTrigger>
              <TabsTrigger
                value='history'
                className='bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 py-2 text-slate-500 data-[state=active]:text-teal-700 font-medium'
              >
                Lịch sử khám
              </TabsTrigger>
              <TabsTrigger
                value='medications'
                className='bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 py-2 text-slate-500 data-[state=active]:text-teal-700 font-medium'
              >
                Thuốc & dị ứng
              </TabsTrigger>
              <TabsTrigger
                value='labs'
                className='bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 py-2 text-slate-500 data-[state=active]:text-teal-700 font-medium'
              >
                Xét nghiệm & tài liệu
              </TabsTrigger>
              <TabsTrigger
                value='notes'
                className='bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none px-0 py-2 text-slate-500 data-[state=active]:text-teal-700 font-medium'
              >
                Ghi chú của bác sĩ
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value='overview' className='mt-0'>
            <OverviewTab patient={mockPatientDetail} />
          </TabsContent>

          <TabsContent value='history'>
            <div className='p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100'>
              Nội dung tab Lịch sử khám đang được cập nhật...
            </div>
          </TabsContent>

          <TabsContent value='medications'>
            <div className='p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100'>
              Nội dung tab Thuốc & dị ứng đang được cập nhật...
            </div>
          </TabsContent>

          <TabsContent value='labs'>
            <div className='p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100'>
              Nội dung tab Xét nghiệm & tài liệu đang được cập nhật...
            </div>
          </TabsContent>

          <TabsContent value='notes'>
            <div className='p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100'>
              Nội dung tab Ghi chú của bác sĩ đang được cập nhật...
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
