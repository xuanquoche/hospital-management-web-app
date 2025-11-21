import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, LayoutGrid } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Thompson',
    email: 'sarah.thompson@clinic.com',
    specialty: 'Cardiology',
    status: 'Active',
    experience: '12 years',
    image: 'https://github.com/shadcn.png',
  },
  {
    id: 2,
    name: 'Dr. Miguel Alvarez',
    email: 'miguel.alvarez@clinic.com',
    specialty: 'Orthopedics',
    status: 'Active',
    experience: '8 years',
    image: 'https://github.com/shadcn.png',
  },
  {
    id: 3,
    name: 'Dr. Priya Singh',
    email: 'priya.singh@clinic.com',
    specialty: 'Pediatrics',
    status: 'On leave',
    experience: '5 years',
    image: 'https://github.com/shadcn.png',
  },
  {
    id: 4,
    name: 'Dr. James Lee',
    email: 'james.lee@clinic.com',
    specialty: 'Dermatology',
    status: 'Active',
    experience: '10 years',
    image: 'https://github.com/shadcn.png',
  },
  {
    id: 5,
    name: 'Dr. Emily Carter',
    email: 'emily.carter@clinic.com',
    specialty: 'Neurology',
    status: 'Inactive',
    experience: '15 years',
    image: 'https://github.com/shadcn.png',
  },
  {
    id: 6,
    name: 'Dr. Aaron Chen',
    email: 'aaron.chen@clinic.com',
    specialty: 'General Medicine',
    status: 'Active',
    experience: '7 years',
    image: 'https://github.com/shadcn.png',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    case 'On leave':
      return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
    case 'Inactive':
      return 'bg-slate-100 text-slate-700 hover:bg-slate-200';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const DoctorTable = () => {
  return (
    <div className='rounded-lg border border-slate-100 bg-white shadow-sm'>
      <div className='flex items-center justify-between border-b border-slate-100 px-6 py-4'>
        <div className='text-sm text-slate-500'>
          Doctor List <span className='mx-2'>•</span> Showing 1–6 of 132
        </div>
        <div className='flex gap-2'>
          <Button variant='ghost' size='sm' className='h-8 text-slate-500'>
            <LayoutGrid className='mr-2 h-4 w-4' />
            Columns
          </Button>
          <Button variant='ghost' size='sm' className='h-8 text-slate-500'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader className='bg-teal-50/50'>
          <TableRow className='hover:bg-teal-50/50'>
            <TableHead className='w-[300px] font-semibold text-teal-900'>Doctor</TableHead>
            <TableHead className='font-semibold text-teal-900'>Specialty</TableHead>
            <TableHead className='font-semibold text-teal-900'>Status</TableHead>
            <TableHead className='font-semibold text-teal-900'>Experience</TableHead>
            <TableHead className='text-right font-semibold text-teal-900'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id} className='hover:bg-slate-50/50'>
              <TableCell>
                <div className='flex items-center gap-3'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-medium text-slate-900'>{doctor.name}</div>
                    <div className='text-xs text-slate-500'>{doctor.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className='text-slate-600'>{doctor.specialty}</TableCell>
              <TableCell>
                <Badge
                  variant='secondary'
                  className={`rounded-full px-3 font-normal ${getStatusColor(doctor.status)}`}
                >
                  {doctor.status}
                </Badge>
              </TableCell>
              <TableCell className='text-slate-600'>{doctor.experience}</TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end gap-2'>
                  <Button
                    variant='link'
                    className='h-auto p-0 text-teal-600 hover:text-teal-700'
                  >
                    View
                  </Button>
                  <span className='text-slate-300'>•</span>
                  <Button
                    variant='link'
                    className='h-auto p-0 text-teal-600 hover:text-teal-700'
                  >
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorTable;
