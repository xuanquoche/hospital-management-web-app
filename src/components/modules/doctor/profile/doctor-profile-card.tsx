import { Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DoctorProfileCard() {
  return (
    <Card className='p-6'>
      <div className='flex flex-col items-center text-center'>
        <Image
          src='/images/doctor.png'
          alt='Doctor'
          width={100}
          height={100}
          className='rounded-full'
        />
        <h2 className='text-xl font-semibold mt-3'>Mr. Doctor Name</h2>
        <div className='flex items-center mt-1 text-yellow-500'>
          <Star className='w-4 h-4 fill-yellow-500' />
          <span className='ml-1 text-sm font-medium'>4.7</span>
        </div>
        <p className='text-sm text-muted-foreground mt-2'>
          MDS - Periodontology and Oral Implantology, BDS <br />
          Oral And Maxillofacial Surgeon, Dentist
        </p>

        <p className='text-sm mt-2 text-gray-500'>
          18 Years Experience Overall (18 years as specialist)
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
