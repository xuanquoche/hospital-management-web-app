import { MoreVertical } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';

const appointments = [
  {
    date: '30 Apr 2025 - 09:30 AM',
    doctor: 'Dr. Mick Thompson',
    role: 'Cardiologist',
    mode: 'In-person',
    status: 'Checked Out',
  },
  {
    date: '15 Apr 2025 - 11:20 AM',
    doctor: 'Dr. Sarah Johnson',
    role: 'Orthopedic Surgeon',
    mode: 'Online',
    status: 'Checked In',
  },
  {
    date: '02 Apr 2025 - 08:15 AM',
    doctor: 'Dr. Emily Carter',
    role: 'Pediatrician',
    mode: 'In-person',
    status: 'Cancelled',
  },
];

const statusColor: Record<string, string> = {
  'Checked Out': 'bg-blue-100 text-blue-700',
  'Checked In': 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
  Confirmed: 'bg-green-100 text-green-700',
  Schedule: 'bg-gray-100 text-gray-700',
};

export default function PatientAppointments() {
  return (
    <div className='overflow-x-auto mt-4'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((a, i) => (
            <TableRow key={i}>
              <TableCell>{a.date}</TableCell>
              <TableCell className='flex items-center gap-2'>
                <Image
                  src='/images/doctor.png'
                  alt={a.doctor}
                  width={32}
                  height={32}
                  className='rounded-full'
                />
                <div>
                  <p className='font-medium'>{a.doctor}</p>
                  <p className='text-xs text-gray-500'>{a.role}</p>
                </div>
              </TableCell>
              <TableCell>{a.mode}</TableCell>
              <TableCell>
                <Badge
                  className={`${statusColor[a.status]} px-2 py-1 rounded-full text-xs`}
                >
                  {a.status}
                </Badge>
              </TableCell>
              <TableCell className='text-right'>
                <Button variant='ghost' size='icon'>
                  <MoreVertical size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
