'use client';

import { format } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { PatientDetail } from '@/components/modules/doctor/patient-detail/data';
import { OverviewTab } from '@/components/modules/doctor/patient-detail/OverviewTab';
import { PatientDetailHeader } from '@/components/modules/doctor/patient-detail/PatientDetailHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { clientFetcher } from '@/lib/fetcher';
import { MyPatientDetailResponse } from '@/types/my-patient';

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
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [activeTab, setActiveTab] = useState('overview');
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const response = await clientFetcher.get<MyPatientDetailResponse>(
          `/doctors/my-patients/${id}`
        );
        if (response?.data) {
          const apiData = response.data;
          const todayVisit = apiData.appointments[0]; // Assuming first is latest/today for now

          const mappedPatient: PatientDetail = {
            id: apiData.id,
            name: apiData.user.fullName,
            age: apiData.dateOfBirth
              ? new Date().getFullYear() -
                new Date(apiData.dateOfBirth).getFullYear()
              : 0,
            gender: apiData.gender || 'N/A',
            dob: apiData.dateOfBirth
              ? format(new Date(apiData.dateOfBirth), 'dd/MM/yyyy')
              : 'N/A',
            address: apiData.user.address || 'N/A',
            avatar: apiData.user.avatar || '',
            tags: [
              apiData.allergies
                ? `Dị ứng: ${apiData.allergies}`
                : 'Không dị ứng',
              apiData.chronicDisease
                ? `Bệnh mãn tính: ${apiData.chronicDisease}`
                : 'Không bệnh mãn tính',
            ],
            currentPlan: todayVisit?.notes || 'Chưa có kế hoạch',
            personalInfo: {
              height: apiData.height ? `${apiData.height} cm` : 'N/A',
              weight: apiData.weight ? `${apiData.weight} kg` : 'N/A',
              bmi: 'N/A', // Calculate if needed
              job: 'N/A',
              lifestyle: 'N/A',
              familyHistory: [],
            },
            todayVisit: {
              id: todayVisit?.id,
              time: todayVisit?.timeSlot?.startTime || 'N/A',
              room: 'N/A',
              reason: todayVisit?.symptoms || 'N/A',
              diagnosis: todayVisit?.diagnosis || 'Chưa có chẩn đoán',
              plan: 'N/A',
              prescription: todayVisit?.prescription || 'Chưa có đơn thuốc',
              notes: todayVisit?.notes ? [todayVisit.notes] : [],
            },
            vitals: {
              bp: 'N/A',
              heartRate: 0,
              temp: 0,
              spO2: 0,
              respRate: 0,
              weight: apiData.weight || 0,
              weightChange: 'N/A',
            },
            timeline: apiData.appointments.map((apt) => ({
              date: format(new Date(apt.appointmentDate), 'dd/MM/yyyy'),
              time: apt.timeSlot.startTime,
              title: apt.symptoms || 'Khám bệnh',
              type: apt.examinationType,
              doctor: 'BS. Trần Quốc Huy', // Hardcoded for now or fetch from somewhere
              status: apt.status,
            })),
            allergies: apiData.allergies
              ? [
                  {
                    name: apiData.allergies,
                    reaction: 'N/A',
                    severity: 'medium',
                  },
                ]
              : [],
            medications: [], // Map if available
            documents: [], // Map if available
            doctorNotes: [], // Map if available
            contact: {
              phone: apiData.user.phone,
              email: apiData.user.email,
              fullAddress: apiData.user.address || 'N/A',
            },
            nextAppointment: {
              date: 'N/A',
              type: 'N/A',
            },
          };
          setPatient(mappedPatient);
        }
      } catch (error) {
        console.error('Error fetching patient detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetail();
  }, [id]);

  if (loading) {
    return <div className='min-h-screen p-6 text-center'>Loading...</div>;
  }

  if (!patient) {
    return (
      <div className='min-h-screen p-6 text-center'>Patient not found</div>
    );
  }

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
            <OverviewTab patient={patient} />
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
