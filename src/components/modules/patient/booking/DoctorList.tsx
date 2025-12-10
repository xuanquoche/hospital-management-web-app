'use client';

import React from 'react';

import { DoctorCard } from './DoctorCard';

const doctors = [
  {
    id: 1,
    name: 'BS. Trần Quốc Hùng',
    specialty: 'Nội tổng quát',
    experience: '12 năm kinh nghiệm',
    location: 'Cơ sở 1 - Quận 1',
    availability: 'Khung giờ còn trống hôm nay',
    slots: 3,
    tags: ['Được đánh giá cao'],
    image: '/images/doctor-1.jpg',
    isFemale: false,
  },
  {
    id: 2,
    name: 'BS. Nguyễn Thị Lan',
    specialty: 'Nội tổng quát',
    experience: '8 năm kinh nghiệm',
    location: 'Cơ sở 2 - Bình Thạnh',
    availability: 'Có lịch ngày mai',
    slots: 5,
    tags: [],
    image: '/images/doctor-2.jpg',
    isFemale: true,
  },
  {
    id: 3,
    name: 'BS. Lê Hoàng Phúc',
    specialty: 'Tim mạch',
    experience: '15 năm kinh nghiệm',
    location: 'Cơ sở 1 - Quận 1',
    availability: 'Có lịch tuần này',
    slots: 7,
    tags: ['Chuyên sâu tim mạch'],
    image: '/images/doctor-3.jpg',
    isFemale: false,
  },
];

interface DoctorListProps {
  selectedDoctorId?: number | null;
  onSelectDoctor?: (doctor: any) => void;
}

export const DoctorList = ({
  selectedDoctorId,
  onSelectDoctor,
}: DoctorListProps) => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>Chọn bác sĩ</h3>
          <p className='text-slate-500'>
            Danh sách bác sĩ theo chuyên khoa đã chọn.
          </p>
        </div>
        <button className='text-sm font-medium text-slate-500 hover:text-teal-600'>
          Sắp xếp
        </button>
      </div>

      <div className='space-y-4'>
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            isSelected={selectedDoctorId === doctor.id}
            onSelect={() => onSelectDoctor?.(doctor)}
          />
        ))}
      </div>
    </div>
  );
};
