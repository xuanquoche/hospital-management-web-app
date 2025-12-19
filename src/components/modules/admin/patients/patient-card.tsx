'use client';

import { differenceInYears, parseISO } from 'date-fns';
import { CalendarDays, EllipsisVertical, MapPin } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ApiPatient } from '@/types/patient-api';

export function PatientCard({ patient }: { patient: ApiPatient }) {
  const age = patient.dateOfBirth
    ? differenceInYears(new Date(), parseISO(patient.dateOfBirth))
    : 'N/A';

  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardContent className='p-4'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-3'>
            <Image
              src={patient.user.avatar || '/images/doctor.png'}
              alt={patient.user.fullName}
              width={48}
              height={48}
              className='rounded-full object-cover h-12 w-12'
            />
            <div>
              <h3 className='font-semibold'>{patient.user.fullName}</h3>
              <p className='text-sm text-muted-foreground'>
                {age} years, {patient.gender}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 p-0 text-gray-500 hover:text-gray-700'
              >
                <EllipsisVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem className='cursor-pointer'>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className='text-red-600 cursor-pointer hover:text-red-600'>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='mt-3 text-sm text-muted-foreground space-y-1'>
          <div className='flex items-center gap-2'>
            <CalendarDays className='w-4 h-4 text-blue-500' />
            <span>Last Appointment : N/A</span>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin className='w-4 h-4 text-green-500' />
            <span className='truncate max-w-[200px]'>
              {patient.user.address}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
