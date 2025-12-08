'use client';

import { AppointmentListHeader } from './AppointmentListHeader';
import { AppointmentFilter } from './AppointmentFilter';
import { AppointmentTable, Appointment } from './AppointmentTable';

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: '12 Aug 2025',
    time: '09:00',
    duration: '30 min',
    location: 'Room 305',
    type: 'In-person',
    patient: {
      name: 'Nguyễn Văn A',
      phone: '0901 234 567',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. Miguel Alvarez',
      specialty: 'Orthopedics',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    status: 'Confirmed',
    createdFrom: 'Desk',
  },
  {
    id: '2',
    date: '12 Aug 2025',
    time: '09:30',
    duration: '30 min',
    location: 'Online',
    type: 'Telehealth',
    patient: {
      name: 'Trần Thị B',
      phone: '0912 888 222',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. Priya Singh',
      specialty: 'Pediatrics',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    status: 'Pending',
    createdFrom: 'Web',
  },
  {
    id: '3',
    date: '12 Aug 2025',
    time: '10:00',
    duration: '45 min',
    location: 'Room 210',
    type: 'In-person',
    patient: {
      name: 'Lê Cường',
      phone: '0987 456 321',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. James Lee',
      specialty: 'Dermatology',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    status: 'Completed',
    createdFrom: 'Desk',
  },
  {
    id: '4',
    date: '12 Aug 2025',
    time: '10:30',
    duration: '30 min',
    location: 'Online',
    type: 'Telehealth',
    patient: {
      name: 'Phạm Mỹ D',
      phone: '0902 456 888',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. Emily Carter',
      specialty: 'Neurology',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    status: 'Cancelled',
    createdFrom: 'Web',
  },
  {
    id: '5',
    date: '12 Aug 2025',
    time: '11:00',
    duration: '30 min',
    location: 'Room 101',
    type: 'In-person',
    patient: {
      name: 'John Miller',
      phone: '+1 202 555 0147',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. Sarah Thompson',
      specialty: 'Cardiology',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    status: 'Confirmed',
    createdFrom: 'Desk',
  },
  {
    id: '6',
    date: '12 Aug 2025',
    time: '11:30',
    duration: '30 min',
    location: 'Room 305',
    type: 'In-person',
    patient: {
      name: 'Anna Brown',
      phone: '+44 20 555 0199',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. Aaron Chen',
      specialty: 'General Medicine',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    status: 'Pending',
    createdFrom: 'Desk',
  },
];

export function AppointmentList() {
  return (
    <div className='flex flex-col gap-6'>
      <AppointmentListHeader />
      <AppointmentFilter />
      <AppointmentTable appointments={mockAppointments} />
    </div>
  );
}
