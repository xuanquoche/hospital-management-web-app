import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export interface Patient {
  id: string;
  name: string;
  pid: string;
  avatarUrl?: string;
  phone: string;
  email: string;
  cmnd: string;
  insurance: string;
  lastVisit: string;
  lastVisitReason: string;
  status: 'Active' | 'Inactive' | 'Blocked';
  tags: string[];
  dob: string;
  gender: string;
  address: string;
  insuranceProvider: string;
  insuranceNumber: string;
  visitHistory: {
    date: string;
    type: string;
    doctor: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
  }[];
}

interface PatientTableProps {
  patients: Patient[];
  selectedPatientId?: string;
  onSelectPatient: (patient: Patient) => void;
}

export function PatientTable({
  patients,
  selectedPatientId,
  onSelectPatient,
}: PatientTableProps) {
  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead className='w-[50px]'>#</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>ID / Insurance</TableHead>
              <TableHead>Last visit</TableHead>
              <TableHead>Status & tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow
                key={patient.id}
                className={cn(
                  'cursor-pointer hover:bg-muted/50',
                  selectedPatientId === patient.id && 'bg-muted/50'
                )}
                onClick={() => onSelectPatient(patient)}
              >
                <TableCell className='font-medium'>{index + 1}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar className='size-9'>
                      <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                      <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                      <span className='font-medium'>{patient.name}</span>
                      <span className='text-muted-foreground text-xs'>
                        {patient.pid}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span className='font-medium'>{patient.phone}</span>
                    <span className='text-muted-foreground text-xs'>
                      {patient.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span className='text-muted-foreground text-xs'>
                      CMND: {patient.cmnd}
                    </span>
                    <span className='text-muted-foreground text-xs'>
                      {patient.insurance}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col'>
                    <span className='font-medium'>{patient.lastVisit}</span>
                    <span className='text-muted-foreground text-xs'>
                      {patient.lastVisitReason}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant='secondary'
                      className={cn(
                        'rounded-full font-normal',
                        patient.status === 'Active' &&
                          'bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80',
                        patient.status === 'Inactive' &&
                          'bg-slate-100 text-slate-700 hover:bg-slate-100/80',
                        patient.status === 'Blocked' &&
                          'bg-red-100 text-red-700 hover:bg-red-100/80'
                      )}
                    >
                      {patient.status}
                    </Badge>
                    {patient.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant='outline'
                        className='rounded-full font-normal text-muted-foreground border-transparent bg-muted/50'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between px-2'>
        <div className='text-muted-foreground text-sm'>
          Showing 1-50 of 1,248 patients
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='icon-sm' disabled>
            <ChevronLeft className='size-4' />
          </Button>
          <div className='text-sm font-medium'>Page 1 of 25</div>
          <Button variant='outline' size='icon-sm'>
            <ChevronRight className='size-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
