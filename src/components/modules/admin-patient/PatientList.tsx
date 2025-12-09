'use client';

import { useState } from 'react';

import { PatientDetailPanel } from './PatientDetailPanel';
import { PatientFilter } from './PatientFilter';
import { PatientListHeader } from './PatientListHeader';
import { PatientTable, Patient } from './PatientTable';

// Mock data
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    pid: 'PID-2024-0912',
    phone: '0901 234 567',
    email: 'nguyenvana@example.com',
    cmnd: '123456789',
    insurance: 'BaoViet Care',
    lastVisit: '12 Aug 2025',
    lastVisitReason: 'Follow-up · Dr. Sarah',
    status: 'Active',
    tags: ['Hypertension', 'VIP'],
    dob: '45 tuổi · Nam',
    gender: 'Nam',
    address: 'Quận 1, TP. HCM',
    insuranceProvider: 'BaoViet Care',
    insuranceNumber: 'BV-9988-1122',
    visitHistory: [
      {
        date: '12 Aug 2025',
        type: 'Cardiology',
        doctor: 'Dr. Sarah Thompson',
        status: 'Completed',
      },
      {
        date: '20 May 2025',
        type: 'General',
        doctor: 'Dr. Minh',
        status: 'Completed',
      },
      {
        date: '03 Feb 2025',
        type: 'Telehealth',
        doctor: 'Online',
        status: 'Completed',
      },
    ],
    avatarUrl: 'https://github.com/shadcn.png',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    pid: 'PID-2023-0771',
    phone: '0912 888 222',
    email: 'tranthib@example.com',
    cmnd: '986745321',
    insurance: 'PTI Silver',
    lastVisit: '05 Aug 2025',
    lastVisitReason: 'General check-up',
    status: 'Active',
    tags: ['Diabetes'],
    dob: '32 tuổi · Nữ',
    gender: 'Nữ',
    address: 'Quận 3, TP. HCM',
    insuranceProvider: 'PTI Silver',
    insuranceNumber: 'PTI-1122-3344',
    visitHistory: [],
    avatarUrl: 'https://github.com/shadcn.png',
  },
  {
    id: '3',
    name: 'Lê Cường',
    pid: 'PID-2022-0440',
    phone: '0987 456 321',
    email: 'lecuong@example.com',
    cmnd: 'No insurance',
    insurance: 'No insurance',
    lastVisit: '22 Jul 2025',
    lastVisitReason: 'Cardio consult',
    status: 'Inactive',
    tags: ['Discharged'],
    dob: '50 tuổi · Nam',
    gender: 'Nam',
    address: 'Quận 5, TP. HCM',
    insuranceProvider: 'None',
    insuranceNumber: 'N/A',
    visitHistory: [],
    avatarUrl: 'https://github.com/shadcn.png',
  },
  {
    id: '4',
    name: 'Phạm Mỹ D',
    pid: 'PID-2024-0103',
    phone: '0902 456 888',
    email: 'phammyd@example.com',
    cmnd: '654321987',
    insurance: 'Prudential Health',
    lastVisit: '18 Jun 2025',
    lastVisitReason: 'ENT · Dr. Long',
    status: 'Active',
    tags: ['Allergy'],
    dob: '28 tuổi · Nữ',
    gender: 'Nữ',
    address: 'Quận 7, TP. HCM',
    insuranceProvider: 'Prudential Health',
    insuranceNumber: 'PRU-5566-7788',
    visitHistory: [],
    avatarUrl: 'https://github.com/shadcn.png',
  },
  {
    id: '5',
    name: 'John Miller',
    pid: 'PID-2021-0330',
    phone: '+1 202 555 0147',
    email: 'john.miller@example.com',
    cmnd: 'Passport: AA987654',
    insurance: 'Cigna Global',
    lastVisit: '02 May 2025',
    lastVisitReason: 'Telehealth · Cardio',
    status: 'Blocked',
    tags: ['Payment issue'],
    dob: '40 tuổi · Nam',
    gender: 'Nam',
    address: 'Thảo Điền, TP. Thủ Đức',
    insuranceProvider: 'Cigna Global',
    insuranceNumber: 'CIG-9900-1122',
    visitHistory: [],
    avatarUrl: 'https://github.com/shadcn.png',
  },
];

export function PatientList() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive'>(
    'all'
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    mockPatients[0]
  );

  const filteredPatients = mockPatients.filter((patient) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return patient.status === 'Active';
    if (activeTab === 'inactive') return patient.status === 'Inactive';
    return true;
  });

  return (
    <div className='flex flex-col gap-6'>
      <PatientListHeader />
      <PatientFilter activeTab={activeTab} onTabChange={setActiveTab} />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <PatientTable
            patients={filteredPatients}
            selectedPatientId={selectedPatient?.id}
            onSelectPatient={setSelectedPatient}
          />
        </div>
        <div>
          <PatientDetailPanel patient={selectedPatient} />
        </div>
      </div>
    </div>
  );
}
