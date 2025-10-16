'use client';

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

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  lastAppointment: string;
  location: string;
  avatar: string;
}

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardContent className='p-4'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-3'>
            <Image
              src={patient.avatar}
              alt={patient.name}
              width={48}
              height={48}
              className='rounded-full object-cover'
            />
            <div>
              <h3 className='font-semibold'>{patient.name}</h3>
              <p className='text-sm text-muted-foreground'>
                {patient.age}, {patient.gender}
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
            <span>Last Appointment : {patient.lastAppointment}</span>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin className='w-4 h-4 text-green-500' />
            <span>{patient.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
