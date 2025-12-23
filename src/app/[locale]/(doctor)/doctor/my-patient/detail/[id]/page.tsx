'use client';

import { format } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { PatientDetail } from '@/components/modules/doctor/patient-detail/data';
import { HistoryTab } from '@/components/modules/doctor/patient-detail/HistoryTab';
import { OverviewTab } from '@/components/modules/doctor/patient-detail/OverviewTab';
import { PatientDetailHeader } from '@/components/modules/doctor/patient-detail/PatientDetailHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { clientFetcher } from '@/lib/fetcher';
import { MyPatientDetailResponse } from '@/types/my-patient';

// Animation cho trang load lần đầu
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

// ADD: Animation riêng cho nội dung Tab khi chuyển đổi
const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [activeTab, setActiveTab] = useState('overview'); // State này thực tế không cần thiết nếu dùng Tabs defaultValue, nhưng giữ lại nếu bạn muốn control
  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // ... (Giữ nguyên phần useEffect fetch data của bạn) ...
  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const response = await clientFetcher.get<MyPatientDetailResponse>(`/doctors/my-patients/${id}`);
        if (response?.data) {
          const apiData = response.data;
          const todayVisit = apiData.appointments[0];

          const mappedPatient: PatientDetail = {
            id: apiData.id,
            name: apiData.user.fullName,
            age: apiData.dateOfBirth ? new Date().getFullYear() - new Date(apiData.dateOfBirth).getFullYear() : 0,
            gender: apiData.gender || 'N/A',
            dob: apiData.dateOfBirth ? format(new Date(apiData.dateOfBirth), 'dd/MM/yyyy') : 'N/A',
            address: apiData.user.address || 'N/A',
            avatar: apiData.user.avatar || '',
            tags: [
              apiData.allergies ? `Dị ứng: ${apiData.allergies}` : 'Không dị ứng',
              apiData.chronicDisease ? `Bệnh mãn tính: ${apiData.chronicDisease}` : 'Không bệnh mãn tính',
            ],
            currentPlan: todayVisit?.notes || 'Chưa có kế hoạch',
            personalInfo: {
              height: apiData.height ? `${apiData.height} cm` : 'N/A',
              weight: apiData.weight ? `${apiData.weight} kg` : 'N/A',
              bmi: 'N/A',
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
              doctor: 'BS. Trần Quốc Huy',
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
            medications: [],
            documents: [],
            doctorNotes: [],
            contact: {
              phone: apiData.user.phone,
              email: apiData.user.email,
              fullAddress: apiData.user.address || 'N/A',
            },
            nextAppointment: {
              date: 'N/A',
              type: 'N/A',
            },
            appointments: apiData.appointments.map((apt) => ({
              id: apt.id,
              appointmentDate: apt.appointmentDate,
              status: apt.status,
              examinationType: apt.examinationType,
              symptoms: apt.symptoms,
              diagnosis: apt.diagnosis,
              prescription: apt.prescription,
              notes: apt.notes,
              completedAt: apt.completedAt,
              timeSlot: {
                startTime: apt.timeSlot.startTime,
                endTime: apt.timeSlot.endTime,
              },
            })),
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
    return <div className='min-h-screen p-6 text-center'>Patient not found</div>;
  }

  return (
    <div className='min-h-screen bg-slate-50/50 p-6'>
      <motion.div variants={container} initial='hidden' animate='show'>
        <motion.div variants={item}>
          <PatientDetailHeader patient={patient} />
        </motion.div>

        <Tabs defaultValue='overview' className='w-full' onValueChange={setActiveTab}>
          <motion.div variants={item} className='mb-6'>
            <TabsList className='bg-transparent p-0 h-auto gap-6 border-b border-slate-200 w-full justify-start rounded-none'>
              {/* Giữ nguyên TabsTrigger của bạn */}
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
            <motion.div variants={tabContentVariants} initial='hidden' animate='show'>
              <OverviewTab patient={patient} />
            </motion.div>
          </TabsContent>

          <TabsContent value='history'>
            <motion.div variants={tabContentVariants} initial='hidden' animate='show'>
              <HistoryTab patientId={patient.id} appointments={patient.appointments} />
            </motion.div>
          </TabsContent>

          <TabsContent value='medications'>
            <motion.div variants={tabContentVariants} initial='hidden' animate='show'>
              <div className='p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100'>
                Nội dung tab Thuốc & dị ứng đang được cập nhật...
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value='labs'>
            <motion.div variants={tabContentVariants} initial='hidden' animate='show'>
              <div className='p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100'>
                Nội dung tab Xét nghiệm & tài liệu đang được cập nhật...
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value='notes'>
            <motion.div variants={tabContentVariants} initial='hidden' animate='show'>
              <div className='p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100'>
                Nội dung tab Ghi chú của bác sĩ đang được cập nhật...
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
