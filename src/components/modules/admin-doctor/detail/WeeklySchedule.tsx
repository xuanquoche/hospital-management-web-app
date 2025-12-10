'use client';

import {
  format,
  startOfWeek,
  addDays,
  isWithinInterval,
  parseISO,
  endOfDay,
  startOfDay,
} from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Schedule } from '@/types/doctor';

interface WeeklyScheduleProps {
  schedules: Schedule[];
}

export function WeeklySchedule({ schedules }: WeeklyScheduleProps) {
  const [date, setDate] = React.useState<Date>(new Date());

  // Get the start of the week for the selected date (Monday start)
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });

  // Generate array of 7 days for the current week view
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handlePreviousWeek = () => {
    setDate((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setDate((prev) => addDays(prev, 7));
  };

  const handleToday = () => {
    setDate(new Date());
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='space-y-1'>
          <CardTitle>Weekly schedule overview</CardTitle>
          <CardDescription>Working hours for the selected week</CardDescription>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon-sm' onClick={handlePreviousWeek}>
              <ChevronLeft className='size-4' />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='ghost'
                  className={cn(
                    'justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={(day) => day && setDate(day)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button variant='ghost' size='icon-sm' onClick={handleNextWeek}>
              <ChevronRight className='size-4' />
            </Button>
          </div>
          <div className='text-muted-foreground text-xs hidden md:block'>
            Timezone: GMT+7 · Asia/Ho Chi Minh
          </div>
          <Button
            variant='ghost'
            size='sm'
            className='text-primary hidden md:flex'
            onClick={handleToday}
          >
            Today
          </Button>
        </div>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
          {weekDays.map((day, index) => {
            // Find active schedules for this day
            const activeSlots = schedules.flatMap((schedule) => {
              const scheduleStart = parseISO(schedule.startDate);
              const scheduleEnd = parseISO(schedule.endDate);

              // Check if the current day is within the schedule's date range
              // We compare day boundaries to be inclusive
              const isDateInRange = isWithinInterval(day, {
                start: startOfDay(scheduleStart),
                end: endOfDay(scheduleEnd),
              });

              if (!isDateInRange || !schedule.isActive) return [];

              // Get day of week string (e.g., "MONDAY")
              const dayOfWeek = format(day, 'EEEE').toUpperCase();

              // Filter slots for this day of week
              return schedule.timeSlots.filter(
                (slot) => slot.dayOfWeek === dayOfWeek
              );
            });

            // Sort slots by start time
            activeSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));

            const isOff = activeSlots.length === 0;

            return (
              <div key={index} className='space-y-3'>
                <div className='text-sm font-medium text-muted-foreground'>
                  {format(day, 'EEE d')}
                </div>
                {isOff ? (
                  <div className='bg-muted/50 rounded-md p-3 text-xs text-muted-foreground h-12 flex items-center'>
                    Off
                  </div>
                ) : (
                  <div className='space-y-2'>
                    {activeSlots.map((slot, slotIndex) => (
                      <div
                        key={`${slot.id}-${slotIndex}`}
                        className={cn(
                          'rounded-md p-2 text-xs text-white font-medium',
                          slot.examinationType === 'IN_PERSON'
                            ? 'bg-emerald-600'
                            : 'bg-blue-600'
                        )}
                      >
                        <div>
                          {slot.startTime} - {slot.endTime} ·{' '}
                          {slot.examinationType === 'IN_PERSON'
                            ? 'In-person'
                            : 'Online'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className='mt-6 text-xs text-muted-foreground'>
          This view shows the doctor's schedule based on the configured time
          slots.
        </div>
      </CardContent>
    </Card>
  );
}
