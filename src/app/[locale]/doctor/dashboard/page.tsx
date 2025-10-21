'use client';
import React, { useState } from 'react';

import Calendar from '@/components/modules/doctor/calendar';
import DoctorHeader from '@/components/modules/doctor/doctor-header';
import PatientDetails from '@/components/modules/doctor/patient-detail';
import PatientsList from '@/components/modules/doctor/patient-list';
import { mockdataPatients } from '@/const/mock-data';

export default function DoctorPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const filteredPatients = selectedDate
    ? mockdataPatients.filter((p) => p.appointmentDate === selectedDate)
    : mockdataPatients;

  return (
    <div className='p-6 space-y-6'>
      <DoctorHeader />
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
        <PatientsList
          patients={filteredPatients}
          onSelectPatient={setSelectedPatient}
          selectedPatient={selectedPatient}
        />
        <PatientDetails patient={selectedPatient} />
      </div>
    </div>
  );
}
