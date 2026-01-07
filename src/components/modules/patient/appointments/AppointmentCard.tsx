import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, Clock, Stethoscope, ChevronRight } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';

import { StatusBadge } from '@/components/common/StatusBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Appointment } from '@/types/appointment';

interface AppointmentCardProps {
  appointment: Appointment;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
}) => {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const {
    doctor,
    timeSlot,
    appointmentDate,
    status,
    payment,
    consultationFee,
    symptoms,
  } = appointment;

  const dateObj = parseISO(appointmentDate);
  const day = format(dateObj, 'dd');
  const month = format(dateObj, 'MMM', { locale: vi });
  const year = format(dateObj, 'yyyy');
  const fullDate = format(dateObj, 'EEEE, dd/MM/yyyy', { locale: vi });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <Card className='group overflow-hidden border-border/60 hover:border-primary/50 hover:shadow-md transition-all duration-300'>
      <div className='flex flex-col sm:flex-row'>
        {/* Date Widget Strip - Desktop */}
        <div className='hidden sm:flex flex-col items-center justify-center p-4 bg-muted/30 border-r border-border/50 min-w-[100px]'>
          <span className='text-3xl font-bold text-primary tracking-tighter'>
            {day}
          </span>
          <span className='text-sm font-medium text-muted-foreground uppercase'>
            {month}
          </span>
          <span className='text-xs text-muted-foreground/60'>{year}</span>
        </div>

        {/* Mobile Date Header */}
        <div className='sm:hidden flex items-center justify-between p-3 bg-muted/30 border-b border-border/50'>
          <div className='flex items-center gap-2'>
            <Calendar className='w-4 h-4 text-primary' />
            <span className='font-semibold text-sm capitalize'>{fullDate}</span>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className='flex-1 flex flex-col'>
          <div className='p-4 sm:p-5 flex-1'>
            <div className='flex flex-col lg:flex-row lg:items-start gap-5'>
              {/* Metadata Header (Mobile only status is above, Desktop is here) */}
              <div className='hidden sm:flex justify-between items-start w-full lg:hidden mb-4'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Clock className='w-4 h-4' />
                  <span>
                    {timeSlot.startTime} - {timeSlot.endTime}
                  </span>
                </div>
                <StatusBadge status={status} />
              </div>

              {/* Doctor Info */}
              <div className='flex-1 flex gap-4 min-w-0'>
                <Avatar className='w-14 h-14 border-2 border-background shadow-sm ring-1 ring-border/50'>
                  <AvatarImage src={doctor.avatar || ''} alt={doctor.name} />
                  <AvatarFallback className='bg-primary/5 text-primary text-lg font-medium'>
                    {doctor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='min-w-0'>
                  <div className='flex flex-wrap items-center gap-2 mb-1'>
                    <h3 className='font-bold text-lg text-foreground truncate max-w-full'>
                      {doctor.name}
                    </h3>
                    <Badge
                      variant='outline'
                      className='text-[10px] h-5 px-1.5 font-normal text-muted-foreground hidden sm:inline-flex'
                    >
                      {doctor.specialty.name}
                    </Badge>
                  </div>
                  <p className='text-sm text-muted-foreground line-clamp-1 mb-1.5'>
                    {doctor.professionalTitle}
                  </p>
                  {/* Mobile View: Specialty as text */}
                  <p className='text-xs text-muted-foreground/80 sm:hidden'>
                    {doctor.specialty.name}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-3 text-sm mt-2 lg:mt-0 lg:border-l lg:pl-5 lg:min-w-[280px]'>
                {/* Desktop Time */}
                <div className='hidden lg:flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <Clock className='w-4 h-4' />
                    <span className='font-medium text-foreground'>
                      Thời gian:
                    </span>
                  </div>
                  <span>
                    {timeSlot.startTime} - {timeSlot.endTime}
                  </span>
                </div>

                {/* Status for Desktop Large */}
                <div className='hidden lg:flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <div className='w-4 h-4 rounded-full border-2 border-current p-0.5' />
                    <span className='font-medium text-foreground'>
                      Trạng thái:
                    </span>
                  </div>
                  <StatusBadge status={status} />
                </div>

                <div className='flex items-start gap-2 col-span-full'>
                  <Stethoscope className='w-4 h-4 text-muted-foreground mt-0.5 shrink-0' />
                  <div className='min-w-0'>
                    <span className='font-medium text-foreground mr-1'>
                      Lý do:
                    </span>
                    <span className='text-muted-foreground truncate'>
                      {symptoms?.split('\n')[0]}
                    </span>
                  </div>
                </div>

                <div className='flex items-center justify-between col-span-full pt-2 mt-1 border-t border-border/50 border-dashed'>
                  <span className='text-muted-foreground'>Phí khám</span>
                  <div className='flex items-center gap-2'>
                    <span className='font-bold text-primary text-base'>
                      {formatCurrency(consultationFee)}
                    </span>
                    <StatusBadge
                      status={payment.status}
                      variant='outline'
                      className='h-5 text-[10px] px-1.5'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className='bg-muted/10 border-t border-border/50 p-3 flex justify-end gap-2'>
            <Button
              variant='ghost'
              size='sm'
              className='text-muted-foreground hover:text-foreground h-8 text-xs'
            >
              Hủy lịch
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='h-8 gap-1 text-xs font-medium border-primary/20 text-primary hover:bg-primary/5 hover:text-primary cursor-pointer'
              onClick={() =>
                router.push(`/${locale}/patient/appointments/${appointment.id}`)
              }
            >
              Xem chi tiết
              <ChevronRight className='w-3 h-3' />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
