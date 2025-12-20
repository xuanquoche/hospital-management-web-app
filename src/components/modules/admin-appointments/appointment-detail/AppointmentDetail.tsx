'use client';

import { format } from 'date-fns';
import { Calendar, Clock, CreditCard, FileText, MapPin, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ApiAppointment } from '@/types/appointment-api';

import { CancelAppointmentModal } from '../CancelAppointmentModal';

interface AppointmentDetailProps {
  appointment: ApiAppointment;
}

export function AppointmentDetail({ appointment }: AppointmentDetailProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-emerald-600 hover:bg-emerald-700';
      case 'PENDING':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'COMPLETED':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'CANCELLED':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-slate-500 hover:bg-slate-600';
    }
  };

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>Appointment Details</h1>
          <p className='text-sm text-slate-500'>ID: {appointment.id}</p>
        </div>
        <div className='flex items-center gap-3'>
          <Badge className={cn('text-white', getStatusColor(appointment.status))}>{appointment.status}</Badge>
          <Button variant='outline' onClick={() => setIsModalOpen(true)}>
            Cancel Appointment
          </Button>
          <Button>Edit Details</Button>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Left Column - Main Info */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Patient Info */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-base'>
                <User className='h-5 w-5 text-slate-500' />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-start gap-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                  <AvatarFallback>{appointment.patient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                  <h3 className='font-semibold text-lg'>{appointment.patient.name}</h3>
                  <div className='flex items-center gap-2 text-sm text-slate-500'>
                    <Phone className='h-4 w-4' />
                    {appointment.patient.phone}
                  </div>
                  <div className='flex items-center gap-2 text-sm text-slate-500'>
                    <FileText className='h-4 w-4' />
                    {appointment.patient.email}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appointment Info */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-base'>
                <Calendar className='h-5 w-5 text-slate-500' />
                Appointment Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-slate-500'>Date & Time</p>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-slate-400' />
                    <span className='font-medium'>
                      {format(new Date(appointment.appointmentDate), 'EEEE, dd MMMM yyyy')}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-slate-600 pl-6'>
                    <Clock className='h-4 w-4 text-slate-400' />
                    {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}
                  </div>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm font-medium text-slate-500'>Examination Type</p>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4 text-slate-400' />
                    <span className='font-medium'>
                      {appointment.examinationType === 'IN_PERSON' ? 'In-person Visit' : 'Online Consultation'}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className='space-y-4'>
                <div>
                  <p className='text-sm font-medium text-slate-500 mb-1'>Symptoms</p>
                  <p className='text-sm text-slate-700 bg-slate-50 p-3 rounded-md'>
                    {appointment.symptoms || 'No symptoms described.'}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-slate-500 mb-1'>Notes</p>
                  <p className='text-sm text-slate-700 bg-slate-50 p-3 rounded-md'>
                    {appointment.notes || 'No notes provided.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-base'>
                <CreditCard className='h-5 w-5 text-slate-500' />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div>
                  <p className='text-sm font-medium text-slate-500'>Total Fee</p>
                  <p className='text-lg font-bold text-emerald-600'>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(appointment.consultationFee)}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-slate-500'>Payment Method</p>
                  <p className='font-medium'>{appointment.payment.method}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-slate-500'>Payment Status</p>
                  <Badge variant={appointment.payment.status === 'PAID' ? 'default' : 'secondary'}>
                    {appointment.payment.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Doctor Info */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-base'>
                <User className='h-5 w-5 text-slate-500' />
                Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col items-center text-center space-y-3'>
                <Avatar className='h-20 w-20'>
                  <AvatarImage src={appointment.doctor.avatar} alt={appointment.doctor.name} />
                  <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold text-lg'>{appointment.doctor.name}</h3>
                  <p className='text-sm text-slate-500'>{appointment.doctor.specialty.name}</p>
                </div>
                <div className='w-full pt-4 space-y-3 text-left'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-slate-500'>Experience</span>
                    <span className='font-medium'>{appointment.doctor.yearsOfExperience} years</span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-slate-500'>Phone</span>
                    <span className='font-medium'>{appointment.doctor.phone}</span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-slate-500'>Email</span>
                    <span className='font-medium truncate max-w-[150px]'>{appointment.doctor.email}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CancelAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointmentId={appointment.id}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
