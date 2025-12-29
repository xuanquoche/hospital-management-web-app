import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
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
  emergencyContact?: string;
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
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function PatientTable({
  patients,
  selectedPatientId,
  onSelectPatient,
  page,
  totalPages,
  totalItems,
  onPageChange,
}: PatientTableProps) {
  const t = useTranslations('Admin.PatientList.table');
  const startItem = (page - 1) * 10 + 1;
  const endItem = Math.min(page * 10, totalItems);

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead className='w-[50px]'>{t('hash')}</TableHead>
              <TableHead>{t('patient')}</TableHead>
              <TableHead>{t('phone')}</TableHead>
              <TableHead>{t('idInsurance')}</TableHead>
              <TableHead>{t('lastVisit')}</TableHead>
              <TableHead>{t('statusTags')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  <div className='flex justify-center items-center'>
                    <Loader2 className='h-6 w-6 animate-spin text-teal-600' />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              patients.map((patient, index) => (
                <TableRow
                  key={patient.id}
                  className={cn(
                    'cursor-pointer hover:bg-muted/50',
                    selectedPatientId === patient.id && 'bg-muted/50'
                  )}
                  onClick={() => onSelectPatient(patient)}
                >
                  <TableCell className='font-medium'>
                    {(page - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-9'>
                        <AvatarImage
                          src={patient.avatarUrl}
                          alt={patient.name}
                        />
                        <AvatarFallback>
                          {patient.name?.charAt(0) ?? 'P'}
                        </AvatarFallback>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between px-2'>
        <div className='text-muted-foreground text-sm'>
          {t.rich('showing', {
            start: totalItems > 0 ? startItem : 0,
            end: endItem,
            total: totalItems,
          })}
        </div>
        <Pagination className='w-auto mx-0'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, page - 1))}
                className={cn(
                  'cursor-pointer',
                  page === 1 && 'pointer-events-none opacity-50'
                )}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={page === p}
                  onClick={() => onPageChange(p)}
                  className='cursor-pointer'
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                className={cn(
                  'cursor-pointer',
                  page === totalPages && 'pointer-events-none opacity-50'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
