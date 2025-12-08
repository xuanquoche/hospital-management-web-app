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
import { Download, LayoutGrid, Loader2 } from 'lucide-react';

export interface Doctor {
  id: string;
  userId: string;
  primarySpecialtyId: string;
  subSpecialty: string;
  professionalTitle: string;
  yearsOfExperience: number;
  consultationFee: number;
  bio: string;
  status: string;
  user: {
    id: string;
    email: string;
    username: string;
    phone: string;
    fullName: string;
    avatar: string;
    address: string;
    role: string;
  };
  primarySpecialty: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
  };
}

interface DoctorTableProps {
  doctors: Doctor[];
  loading: boolean;
  onAddSchedule: (doctor: Doctor) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-700 hover:bg-green-200';
    case 'INACTIVE':
      return 'bg-slate-100 text-slate-700 hover:bg-slate-200';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const DoctorTable: React.FC<DoctorTableProps> = ({ doctors, loading, onAddSchedule }) => {
  return (
    <div className='rounded-lg border border-slate-100 bg-white shadow-sm'>
      <div className='flex items-center justify-between border-b border-slate-100 px-6 py-4'>
        <div className='text-sm text-slate-500'>
          Doctor List <span className='mx-2'>•</span> Showing {doctors.length}{' '}
          results
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
            <TableHead className='w-[300px] font-semibold text-teal-900'>
              Doctor
            </TableHead>
            <TableHead className='font-semibold text-teal-900'>
              Specialty
            </TableHead>
            <TableHead className='font-semibold text-teal-900'>
              Status
            </TableHead>
            <TableHead className='font-semibold text-teal-900'>
              Experience
            </TableHead>
            <TableHead className='text-right font-semibold text-teal-900'>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className='h-24 text-center'>
                <div className='flex justify-center items-center'>
                  <Loader2 className='h-6 w-6 animate-spin text-teal-600' />
                </div>
              </TableCell>
            </TableRow>
          ) : doctors.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className='h-24 text-center text-slate-500'
              >
                No doctors found.
              </TableCell>
            </TableRow>
          ) : (
            doctors.map((doctor) => (
              <TableRow key={doctor.id} className='hover:bg-slate-50/50'>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage
                        src={doctor.user.avatar}
                        alt={doctor.user.fullName}
                      />
                      <AvatarFallback>
                        {doctor.user.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className='font-medium text-slate-900'>
                        {doctor.user.fullName}
                      </div>
                      <div className='text-xs text-slate-500'>
                        {doctor.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='text-slate-600'>
                  {doctor.primarySpecialty?.name || 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge
                    variant='secondary'
                    className={`rounded-full px-3 font-normal ${getStatusColor(doctor.status)}`}
                  >
                    {doctor.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-slate-600'>
                  {doctor.yearsOfExperience} years
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-teal-600 hover:text-teal-700 hover:bg-teal-50'
                      onClick={() => onAddSchedule(doctor)}
                    >
                      Add time
                    </Button>
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorTable;
