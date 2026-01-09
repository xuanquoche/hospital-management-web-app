'use client';

import { format } from 'date-fns';
import { FileText, MoreVertical, Upload } from 'lucide-react';
import { Pill } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { UploadMedicalDocumentModal } from './UploadMedicalDocumentModal';
import { PrescriptionDetailView } from '../my-patient/PrescriptionDetailView';

interface AppointmentHistory {
  id: string;
  appointmentDate: string;
  status: string;
  examinationType: string;
  symptoms: string | null;
  diagnosis: string | null;
  prescription: string | null;
  notes: string | null;
  completedAt: string | null;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
}

interface HistoryTabProps {
  patientId: string;
  appointments: AppointmentHistory[];
}

export const HistoryTab = ({ patientId, appointments }: HistoryTabProps) => {
  const router = useRouter();
  const t = useTranslations('Doctor.MyPatients.Detail.History');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState<string>('');

  const handleOpenUploadModal = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setUploadModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <Badge className='bg-green-50 text-green-700 hover:bg-green-100 border-green-100 font-normal'>
            {t('statusCompleted')}
          </Badge>
        );
      case 'CONFIRMED':
        return (
          <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 font-normal'>
            {t('statusConfirmed')}
          </Badge>
        );
      case 'CANCELLED':
        return (
          <Badge className='bg-red-50 text-red-700 hover:bg-red-100 border-red-100 font-normal'>
            {t('statusCancelled')}
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge className='bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-100 font-normal'>
            {t('statusPending')}
          </Badge>
        );
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  return (
    <div className='bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm'>
      <div className='p-6 border-b border-slate-100 flex justify-between items-center'>
        <h3 className='font-bold text-slate-900'>{t('title')}</h3>
        <span className='text-xs text-slate-500'>
          {t('totalVisits', { count: appointments.length })}
        </span>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <TableHeader className='bg-slate-50/50'>
            <TableRow>
              <TableHead className='w-[150px]'>{t('date')}</TableHead>
              <TableHead className='w-[100px]'>{t('time')}</TableHead>
              <TableHead className='w-[150px]'>{t('type')}</TableHead>
              <TableHead className='max-w-[200px]'>{t('symptoms')}</TableHead>
              <TableHead className='max-w-[200px]'>{t('diagnosis')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead className='text-right'>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className='text-center py-12 text-slate-500'
                >
                  {t('noHistory')}
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((apt) => (
                <TableRow
                  key={apt.id}
                  className='hover:bg-slate-50/50 transition-colors'
                >
                  <TableCell className='font-medium text-slate-900'>
                    {format(new Date(apt.appointmentDate), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell className='text-slate-600'>
                    {apt.timeSlot.startTime}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className='font-normal border-slate-200 text-slate-600'
                    >
                      {apt.examinationType === 'IN_PERSON'
                        ? t('inPerson')
                        : t('online')}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className='max-w-[200px] truncate text-slate-600'
                    title={apt.symptoms || ''}
                  >
                    {apt.symptoms || '-'}
                  </TableCell>
                  <TableCell
                    className='max-w-[200px] truncate text-slate-600'
                    title={apt.diagnosis || ''}
                  >
                    {apt.diagnosis || '-'}
                  </TableCell>
                  <TableCell>{getStatusBadge(apt.status)}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      {/* View Prescription Button Check */}
                      {(apt.status === 'CONFIRMED' ||
                        apt.status === 'COMPLETED') && (
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-2 flex items-center gap-1'
                          onClick={() => {
                            setSelectedAppointmentId(apt.id);
                            setPrescriptionModalOpen(true);
                          }}
                        >
                          <Pill className='w-4 h-4' />
                          <span className='text-xs'>
                            {t('viewPrescription')}
                          </span>
                        </Button>
                      )}

                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-8 px-2 flex items-center gap-1'
                        onClick={() =>
                          router.push(
                            `/doctor/my-patient/detail/${patientId}/consultation/${apt.id}`
                          )
                        }
                      >
                        <FileText className='w-4 h-4' />
                        <span className='text-xs'>{t('prescribe')}</span>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 text-slate-400'
                          >
                            <MoreVertical className='w-4 h-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/doctor/my-patient/detail/${patientId}`
                              )
                            }
                          >
                            {t('viewDetail')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleOpenUploadModal(apt.id)}
                          >
                            <Upload className='w-4 h-4 mr-2' />
                            {t('uploadDocs')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {t('downloadRecord')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <UploadMedicalDocumentModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        appointmentId={selectedAppointmentId}
      />

      <Dialog
        open={prescriptionModalOpen}
        onOpenChange={setPrescriptionModalOpen}
      >
        <DialogContent className='sm:max-w-[80%] max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>{t('prescriptionDetail')}</DialogTitle>
          </DialogHeader>
          {selectedAppointmentId && (
            <PrescriptionDetailView appointmentId={selectedAppointmentId} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
