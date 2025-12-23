'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { clientFetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';
import { Doctor } from '@/types/doctor';

enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export function AppointmentFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for filters
  const [patientSearch, setPatientSearch] = useState(
    searchParams.get('patientSearch') || ''
  );
  const [status, setStatus] = useState(searchParams.get('status') || 'all');
  const [doctorId, setDoctorId] = useState(
    searchParams.get('doctorId') || 'all'
  );

  // Fix initialization to return undefined if no start date
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const start = searchParams.get('startDate');
    const end = searchParams.get('endDate');
    if (start) {
      return {
        from: new Date(start),
        to: end ? new Date(end) : undefined,
      };
    }
    return undefined;
  });

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Sync state with URL params
  useEffect(() => {
    const paramPatient = searchParams.get('patientSearch') || '';
    if (paramPatient !== patientSearch) setPatientSearch(paramPatient);

    const paramStatus = searchParams.get('status') || 'all';
    if (paramStatus !== status) setStatus(paramStatus);

    const paramDoctor = searchParams.get('doctorId') || 'all';
    if (paramDoctor !== doctorId) setDoctorId(paramDoctor);

    const paramStart = searchParams.get('startDate');
    const paramEnd = searchParams.get('endDate');

    const currentStartStr = date?.from ? format(date.from, 'yyyy-MM-dd') : null;
    const currentEndStr = date?.to ? format(date.to, 'yyyy-MM-dd') : null;

    if (paramStart !== currentStartStr || paramEnd !== currentEndStr) {
      if (paramStart) {
        setDate({
          from: new Date(paramStart),
          to: paramEnd ? new Date(paramEnd) : undefined,
        });
      } else {
        setDate(undefined);
      }
    }
  }, [searchParams]);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await clientFetcher.get('/admin/doctors?limit=100');
        if (res.data) {
          setDoctors(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch doctors', error);
      }
    };
    fetchDoctors();
  }, []);

  // Update URL helper
  const updateFilter = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Debounce patient search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (patientSearch) {
        params.set('patientSearch', patientSearch);
      } else {
        params.delete('patientSearch');
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [patientSearch, pathname, router]); // Intentionally omitting searchParams to avoid loop

  const handleStatusChange = (value: string) => {
    setStatus(value);
    updateFilter({ status: value });
  };

  const handleDoctorChange = (value: string) => {
    setDoctorId(value);
    updateFilter({ doctorId: value });
  };

  const handleDateSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from) {
      updateFilter({
        startDate: format(newDate.from, 'yyyy-MM-dd'),
        endDate: newDate.to ? format(newDate.to, 'yyyy-MM-dd') : null,
      });
    } else {
      updateFilter({ startDate: null, endDate: null });
    }
  };

  const clearFilters = () => {
    setPatientSearch('');
    setStatus('all');
    setDoctorId('all');
    setDate(undefined);
    router.replace(pathname);
  };

  return (
    <div className='bg-card rounded-xl border p-4 shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-sm font-medium text-muted-foreground'>Filters</div>
        {(patientSearch ||
          status !== 'all' ||
          doctorId !== 'all' ||
          date?.from) && (
          <Button
            variant='ghost'
            size='sm'
            onClick={clearFilters}
            className='h-auto px-2 text-xs text-muted-foreground hover:text-foreground'
          >
            <X className='mr-1 size-3' />
            Clear filters
          </Button>
        )}
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Date range
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 size-4' />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Calendar</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                initialFocus
                mode='range'
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Status
          </label>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All statuses</SelectItem>
              <SelectItem value={AppointmentStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={AppointmentStatus.CONFIRMED}>
                Confirmed
              </SelectItem>
              <SelectItem value={AppointmentStatus.IN_PROGRESS}>
                In Progress
              </SelectItem>
              <SelectItem value={AppointmentStatus.COMPLETED}>
                Completed
              </SelectItem>
              <SelectItem value={AppointmentStatus.CANCELLED}>
                Cancelled
              </SelectItem>
              <SelectItem value={AppointmentStatus.NO_SHOW}>No Show</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Doctor
          </label>
          <Select value={doctorId} onValueChange={handleDoctorChange}>
            <SelectTrigger>
              <SelectValue placeholder='Select doctor' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All doctors</SelectItem>
              {doctors?.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id as string}>
                  {doctor.user.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Patient
          </label>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 size-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search by patient name...'
              className='pl-9'
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
