import { Calendar, Mars, Droplet, Mail } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PatientInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-4 text-sm'>
        <div className='flex items-center gap-2'>
          <Calendar />
          <div>
            <p className='text-gray-500'>DOB</p>
            <p>25 Jan 1990</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Droplet />
          <div>
            <p className='text-gray-500'>Blood Group</p>
            <p>O +ve</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Mars />
          <div>
            <p className='text-gray-500'>Gender</p>
            <p>Male</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Mail />
          <div>
            <p className='text-gray-500'>Email</p>
            <p>alberto@example.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
