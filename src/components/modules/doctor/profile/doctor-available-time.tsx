import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DoctorProfileData } from '@/hooks/use-me';

interface DoctorAvailableTimeProps {
  profile: DoctorProfileData;
}

export default function DoctorAvailableTime({
  profile,
}: DoctorAvailableTimeProps) {
  return (
    <Card className='p-6'>
      <h3 className='font-semibold text-lg mb-2'>Available Time</h3>
      <div className='text-sm text-muted-foreground mb-3'>
        <span className='font-medium'>Bệnh viện Đa khoa Quốc tế</span>
      </div>

      <div className='flex justify-between items-center mb-2'>
        <Button variant='ghost' size='icon'>
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <span className='font-medium'>Lịch khám</span>
        <Button variant='ghost' size='icon'>
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>

      <div className='grid grid-cols-4 gap-2 text-center mb-3'>
        {/* DoctorProfileData does not have schedules yet */}
        <div className='col-span-4 text-xs text-muted-foreground'>
          Chưa có lịch.
        </div>
      </div>

      <div className='space-y-2'>
        <div className='text-xs text-muted-foreground'>Chưa có khung giờ.</div>
      </div>

      <div className='mt-4 text-sm text-gray-500'>
        <span className='font-semibold'>
          {profile.consultationFee?.toLocaleString('vi-VN')} VNĐ
        </span>{' '}
        mỗi lượt khám
      </div>
    </Card>
  );
}
