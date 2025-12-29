'use client';

import { Columns, Download } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { clientFetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';
import { ApiAppointment } from '@/types/appointment-api';

import { CancelAppointmentModal } from './CancelAppointmentModal';

interface AppointmentTableProps {
  appointments: ApiAppointment[];
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function AppointmentTable({ appointments, meta }: AppointmentTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelClick = (id: string) => {
    setSelectedAppointmentId(id);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    router.refresh();
  };

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const totalPages = meta?.totalPages || 1;
    const currentPage = meta?.page || 1;
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pageNumbers.push(i);
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 2; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const handleConfirmClick = async (id: string) => {
    try {
      const response = await clientFetcher.patch(`/admin/appointments/${id}/status`, { status: 'CONFIRMED' });
      if (response?.data) {
        handleSuccess();
      }
      toast.success('Appointment confirmed successfully');
    } catch (error) {
      console.error('Failed to confirm appointment:', error);
      toast.error('Failed to confirm appointment');
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='text-sm text-muted-foreground'>
          Appointment List • Showing {appointments.length} results
          {meta && ` of ${meta.totalItems}`}
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='sm' className='text-muted-foreground'>
            <Columns className='mr-2 size-4' />
            Columns
          </Button>
          <Button variant='ghost' size='sm' className='text-muted-foreground'>
            <Download className='mr-2 size-4' />
            Export
          </Button>
        </div>
      </div>

      <div className='rounded-md border bg-card'>
        <Table>
          <TableHeader className='bg-emerald-50/50'>
            <TableRow>
              <TableHead>Date & time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created from</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  No appointments found.
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='font-medium'>
                        {appointment.appointmentDate} · {appointment.timeSlot.startTime}
                      </span>
                      <span className='text-muted-foreground text-xs'>
                        {appointment.examinationType === 'IN_PERSON'
                          ? `In-person · ${appointment.timeSlot.endTime}`
                          : appointment.examinationType}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-9'>
                        <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                        <AvatarFallback>{appointment.patient.name?.charAt(0) ?? 'P'}</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <span className='font-medium'>{appointment.patient.name}</span>
                        <span className='text-muted-foreground text-xs'>{appointment.patient.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-9'>
                        <AvatarImage src={appointment.doctor.avatar} alt={appointment.doctor.name} />
                        <AvatarFallback>{appointment.doctor.name?.charAt(0) ?? 'D'}</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <span className='font-medium'>{appointment.doctor.name}</span>
                        <span className='text-muted-foreground text-xs'>{appointment.doctor.specialty.name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='secondary'
                      className={cn(
                        'rounded-full font-normal',
                        appointment.status === 'CONFIRMED' && 'bg-emerald-600 text-white hover:bg-emerald-700',
                        appointment.status === 'PENDING' && 'bg-amber-500 text-white hover:bg-amber-600',
                        appointment.status === 'COMPLETED' && 'bg-slate-100 text-slate-500 hover:bg-slate-200',
                        appointment.status === 'CANCELLED' && 'bg-red-500 text-white hover:bg-red-600'
                      )}
                    >
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>Web</span>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex items-center justify-end gap-2 text-xs font-medium text-emerald-600'>
                      <Link href={`/admin-appointments/${appointment.id}`} className='hover:underline'>
                        <Button className='bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white'>
                          View
                        </Button>
                      </Link>
                      <span className='text-muted-foreground'>•</span>
                      <Button
                        className='cursor-pointer hover:underline bg-transparent text-emerald-600 hover:bg-emerald-600 hover:text-white'
                        onClick={() => handleConfirmClick(appointment.id)}
                      >
                        Confirm
                      </Button>
                      <span className='text-muted-foreground'>•</span>
                      <Button
                        className='cursor-pointer hover:underline bg-transparent text-red-600 hover:bg-red-600 hover:text-white'
                        onClick={() => handleCancelClick(appointment.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className='py-4'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={meta.hasPreviousPage ? createPageURL(meta.page - 1) : '#'}
                  aria-disabled={!meta.hasPreviousPage}
                  className={!meta.hasPreviousPage ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) => (
                <PaginationItem key={index}>
                  {pageNumber === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink href={createPageURL(pageNumber)} isActive={pageNumber === meta.page}>
                      {pageNumber}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={meta.hasNextPage ? createPageURL(meta.page + 1) : '#'}
                  aria-disabled={!meta.hasNextPage}
                  className={!meta.hasNextPage ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {selectedAppointmentId && (
        <CancelAppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          appointmentId={selectedAppointmentId}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
