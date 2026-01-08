import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  ConsultationItem,
  PatientProfile,
  UserData,
} from '@/hooks/use-health-record';

interface HealthRecordHeaderProps {
  user: UserData | null;
  profile: PatientProfile | null;
  consultations: ConsultationItem[];
  loading?: boolean;
}

const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const getGenderLabel = (gender: string): string => {
  switch (gender?.toUpperCase()) {
    case 'MALE':
      return 'Nam';
    case 'FEMALE':
      return 'Nữ';
    default:
      return 'Khác';
  }
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const HealthRecordHeader = ({
  user,
  profile,
  consultations,
  loading,
}: HealthRecordHeaderProps) => {
  if (loading) {
    return (
      <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
        <div className='flex justify-center py-4'>
          <Loader2 className='w-6 h-6 animate-spin text-teal-600' />
        </div>
      </div>
    );
  }

  const lastVisit = consultations.length > 0 ? consultations[0] : null;

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='flex items-start gap-4'>
        <Avatar className='h-16 w-16 border-2 border-white shadow-sm'>
          <AvatarImage src={user?.avatar} alt={user?.fullName} />
          <AvatarFallback>
            {user?.fullName ? getInitials(user.fullName) : 'BN'}
          </AvatarFallback>
        </Avatar>

        <div className='space-y-1'>
          <h2 className='text-xl font-bold text-slate-900'>
            {user?.fullName || 'Đang tải...'}
          </h2>
          <p className='text-sm text-slate-500'>
            Mã bệnh nhân: {profile?.id?.slice(0, 8).toUpperCase() || '---'}
          </p>

          <div className='flex gap-2 mt-2 flex-wrap'>
            {profile?.dateOfBirth && (
              <Badge
                variant='secondary'
                className='bg-slate-100 text-slate-600 hover:bg-slate-200'
              >
                {getGenderLabel(profile.gender)} •{' '}
                {calculateAge(profile.dateOfBirth)} tuổi
              </Badge>
            )}
            {lastVisit && (
              <Badge
                variant='secondary'
                className='bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-100'
              >
                Khám gần nhất:{' '}
                {format(new Date(lastVisit.appointmentDate), 'dd/MM/yyyy')}
              </Badge>
            )}
            <Badge
              variant='secondary'
              className='bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100'
            >
              Bệnh mạn tính: {profile?.chronicDisease || 'Không ghi nhận'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
