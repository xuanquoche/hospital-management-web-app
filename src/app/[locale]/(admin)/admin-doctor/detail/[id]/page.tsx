import { DoctorDetailHeader } from '@/components/modules/admin-doctor/detail/DoctorDetailHeader';
import { DoctorDetailTabs } from '@/components/modules/admin-doctor/detail/DoctorDetailTabs';

// Mock data
const doctorData = {
  id: 'DOC-1024',
  name: 'Dr. Sarah Thompson',
  specialty: 'Cardiology',
  experience: '12 years',
  status: 'Active' as const,
  email: 'sarah.thompson@clinic.com',
  phone: '+1 202 555 0174',
  location: 'Main Campus - Room 302',
  avatarUrl: 'https://github.com/shadcn.png', // Placeholder
  createdAt: '12 Feb 2024',
  updatedAt: '03 Jan 2025',
  prefersMorningSlots: true,
};

const professionalInfoData = {
  specialty: 'Cardiology',
  yearsOfExperience: '12 years',
  primaryClinic: 'Downtown Heart Center',
  consultationTypes: ['In-person', 'Telehealth'],
  languages: ['English', 'Spanish'],
  preferredSlotLength: '20 minutes',
};

const scheduleData = [
  {
    date: 'Mon 12',
    slots: [
      { start: '08:00', end: '12:00', type: 'In-person' as const },
      { start: '13:00', end: '17:00', type: 'In-person' as const },
    ],
  },
  {
    date: 'Tue 13',
    slots: [
      { start: '08:00', end: '12:00', type: 'In-person' as const },
      { start: '13:00', end: '17:00', type: 'In-person' as const },
    ],
  },
  {
    date: 'Wed 14',
    slots: [],
    isOff: true,
  },
  {
    date: 'Thu 15',
    slots: [
      { start: '08:00', end: '12:00', type: 'In-person' as const },
      { start: '13:00', end: '17:00', type: 'Telehealth' as const },
    ],
  },
  {
    date: 'Fri 16',
    slots: [
      { start: '08:00', end: '11:00', type: 'In-person' as const },
      { start: '13:00', end: '16:00', type: 'Telehealth' as const },
    ],
  },
];

export default function DoctorDetailPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <DoctorDetailHeader doctor={doctorData} />
      <DoctorDetailTabs
        professionalInfo={professionalInfoData}
        schedule={scheduleData}
        dateRange="12 Aug – 18 Aug 2025"
      />
    </div>
  );
}
