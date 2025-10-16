import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function DoctorHeader() {
  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center bg-card rounded-2xl p-6 shadow-sm'>
      <div className='flex items-center gap-4'>
        <Image
          src='/images/doctor.png'
          alt='Doctor'
          width={80}
          height={80}
          className='rounded-full object-cover'
        />
        <div>
          <div className='flex items-center gap-2'>
            <div>
              <p className='text-sm text-muted-foreground'>#DT2002</p>
              <h2 className='text-2xl font-semibold'>Dr. John Smith</h2>
            </div>
            <Badge variant='outline' className='mt-5 border-green-600'>
              Cardiology
            </Badge>
          </div>
          <p className='text-muted-foreground text-sm mt-1'>
            MBBS, M.D, Cardiology
          </p>
          <p className='text-sm text-muted-foreground'>
            Clinic: Downtown Medical Clinic •{' '}
            <span className='text-green-600 font-medium'>Available</span>
          </p>
        </div>
      </div>

      <div className='mt-4 md:mt-0 text-right'>
        <p className='text-sm text-muted-foreground'>Consultation Charge</p>
        <h3 className='text-xl font-semibold'>
          $499 <span className='text-sm text-muted-foreground'>/ 30 Min</span>
        </h3>
        <Button className='mt-2'>Book Appointment</Button>
      </div>
    </div>
  );
}
