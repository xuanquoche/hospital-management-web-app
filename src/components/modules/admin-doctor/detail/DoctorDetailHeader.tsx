import { format } from 'date-fns';
import { ArrowLeft, Edit, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Doctor } from '@/types/doctor';

interface DoctorDetailHeaderProps {
  doctor: Doctor;
}

export function DoctorDetailHeader({ doctor }: DoctorDetailHeaderProps) {
  return (
    <div className='space-y-6'>
      {/* Top Bar */}
      <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Doctor details</h1>
          <p className='text-muted-foreground mt-1 text-sm'>
            Profile, availability, and upcoming appointments for this doctor.
          </p>
          <div className='text-muted-foreground mt-2 flex items-center gap-2 text-xs'>
            <span>ID: {doctor.id}</span>
            <span>•</span>
            <span>
              Created {format(new Date(doctor.createdAt), 'dd MMM yyyy')}
            </span>
            <span>•</span>
            <span>
              Last updated {format(new Date(doctor.updatedAt), 'dd MMM yyyy')}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/admin-doctor'>
              <ArrowLeft className='mr-2 size-4' />
              Back to list
            </Link>
          </Button>
          <Button variant='outline' size='sm'>
            <Edit className='mr-2 size-4' />
            Edit profile
          </Button>
          <Button size='sm' className='bg-emerald-600 hover:bg-emerald-700'>
            <Calendar className='mr-2 size-4' />
            Manage schedule
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow-sm md:flex-row md:items-center'>
        <Avatar className='size-20 md:size-24'>
          <AvatarImage src={doctor.user.avatar} alt={doctor.user.fullName} />
          <AvatarFallback>{doctor.user.fullName.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className='flex-1 space-y-2'>
          <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            <div>
              <h2 className='text-xl font-semibold'>{doctor.user.fullName}</h2>
              <div className='text-muted-foreground mt-1 flex items-center gap-2 text-sm'>
                <span>{doctor.primarySpecialty.name}</span>
                <span>•</span>
                <span>{doctor.yearsOfExperience} years experience</span>
              </div>
            </div>
            <div className='flex flex-col items-end gap-1'>
              <div className='text-muted-foreground text-xs'>
                Today · {format(new Date(), 'dd MMM yyyy')}
              </div>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <Badge
              variant={doctor.status === 'ACTIVE' ? 'default' : 'secondary'}
              className={
                doctor.status === 'ACTIVE'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : ''
              }
            >
              {doctor.status}
            </Badge>
          </div>

          <div className='text-muted-foreground mt-2 flex flex-wrap gap-4 text-xs md:text-sm'>
            <div className='flex items-center gap-1.5'>
              <Mail className='size-3.5' />
              {doctor.user.email}
            </div>
            <div className='flex items-center gap-1.5'>
              <Phone className='size-3.5' />
              {doctor.user.phone}
            </div>
            <div className='flex items-center gap-1.5'>
              <MapPin className='size-3.5' />
              {doctor.user.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
