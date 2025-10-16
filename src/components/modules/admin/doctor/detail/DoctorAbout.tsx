import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Droplet,
  Clock,
  User,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

export function DoctorAbout() {
  return (
    <Card className='shadow-sm'>
      <CardContent className='p-6 space-y-3 text-sm text-muted-foreground'>
        <div>
          <span className='font-medium text-foreground'>Medical License:</span>{' '}
          ML658965899
        </div>
        <div className='flex items-center gap-2'>
          <Phone size={16} /> +1 45456 45468
        </div>
        <div className='flex items-center gap-2'>
          <Mail size={16} /> john@example.com
        </div>
        <div className='flex items-center gap-2'>
          <MapPin size={16} /> 4150 Hiney Road, Las Vegas, NV 89109
        </div>
        <div className='flex items-center gap-2'>
          <Calendar size={16} /> 25 Jan 1990
        </div>
        <div className='flex items-center gap-2'>
          <Droplet size={16} /> O+ve
        </div>
        <div className='flex items-center gap-2'>
          <Clock size={16} /> 15+ Years Experience
        </div>
        <div className='flex items-center gap-2'>
          <User size={16} /> Male
        </div>
      </CardContent>
    </Card>
  );
}
