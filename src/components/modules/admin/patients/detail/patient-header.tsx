import { Phone, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function PatientHeader() {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center'>
      <div className='flex items-center gap-4'>
        <Image
          src='/images/patient.png'
          alt='Patient'
          width={100}
          height={80}
          className='rounded-lg border'
        />
        <div>
          <h2 className='text-xl font-semibold'>Alberto Ripley</h2>
          <p className='text-sm text-gray-500 flex items-center gap-1'>
            <MapPin size={14} /> 4150 Hiney Road, Las Vegas, NV 89109
          </p>
          <div className='text-sm text-gray-500 flex gap-4 mt-1'>
            <span className='flex items-center gap-1'>
              <Phone size={14} /> +1 54546 45648
            </span>
            <span className='flex items-center gap-1'>
              <Calendar size={14} /> Last Visited: 30 Apr 2025
            </span>
          </div>
        </div>
      </div>

      <Button className='mt-4 md:mt-0'>Book Appointment</Button>
    </div>
  );
}
