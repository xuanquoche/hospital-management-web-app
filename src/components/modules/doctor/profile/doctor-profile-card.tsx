import { Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DoctorProfileData, UserData } from '@/hooks/use-me';

interface DoctorProfileCardProps {
  user: UserData;
  profile: DoctorProfileData;
}

export default function DoctorProfileCard({
  user,
  profile,
}: DoctorProfileCardProps) {
  return (
    <Card className='p-6'>
      <div className='flex flex-col items-center text-center'>
        <Image
          src={user.avatar || '/images/doctor.png'}
          alt={user.fullName}
          width={100}
          height={100}
          className='rounded-full aspect-square object-cover'
        />
        <h2 className='text-xl font-semibold mt-3'>{user.fullName}</h2>
        <div className='flex items-center mt-1 text-yellow-500'>
          <Star className='w-4 h-4 fill-yellow-500' />
          <span className='ml-1 text-sm font-medium'>4.7</span>
        </div>
        <p className='text-sm text-muted-foreground mt-2'>
          {profile.professionalTitle} <br />
          {profile.primarySpecialty?.name}
        </p>

        <p className='text-sm mt-2 text-gray-500'>
          {profile.yearsOfExperience} Years Experience Overall
        </p>

        <div className='flex items-center gap-1 text-green-600 mt-2'>
          <CheckCircle className='w-4 h-4' />
          <span className='text-sm'>Medical Registration Verified</span>
        </div>

        <Button variant='link' className='mt-3 text-sm'>
          Share your Feedback
        </Button>
      </div>
    </Card>
  );
}
