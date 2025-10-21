import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DoctorAvailableTime() {
  return (
    <Card className='p-6'>
      <h3 className='font-semibold text-lg mb-2'>Available Time</h3>
      <div className='text-sm text-muted-foreground mb-3'>
        <span className='font-medium'>United Hospital Limited</span> · Sylhet,
        Bangladesh
      </div>

      <div className='flex justify-between items-center mb-2'>
        <Button variant='ghost' size='icon'>
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <span className='font-medium'>October</span>
        <Button variant='ghost' size='icon'>
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>

      <div className='grid grid-cols-5 gap-2 text-center mb-3'>
        {['Thu', 'Fri', 'Sat', 'Sun', 'Mon'].map((day) => (
          <div
            key={day}
            className='rounded-md border p-2 text-sm hover:bg-primary hover:text-white cursor-pointer'
          >
            {day}
          </div>
        ))}
      </div>

      <div className='space-y-2'>
        {['09:00 am', '09:30 am', '10:00 am'].map((slot) => (
          <Button key={slot} variant='outline' className='w-full'>
            {slot}
          </Button>
        ))}
      </div>

      <div className='mt-4 text-sm text-gray-500'>
        <span className='font-semibold'>$220</span> per visit (max 15 mins)
      </div>
    </Card>
  );
}
