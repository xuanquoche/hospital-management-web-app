import { format } from 'date-fns';
import { CalendarIcon, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useDebounce } from '@/hooks/use-debounce';
import { clientFetcher } from '@/lib/fetcher';
import { DoctorListItem } from '@/types/doctor';
import { PaymentMethod, PaymentStatus } from '@/types/payment';

interface TransactionFilterProps {
  onFilterChange: (filters: any) => void;
}

export function TransactionFilter({ onFilterChange }: TransactionFilterProps) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const [paymentCode, setPaymentCode] = useState('');
  const [patientSearch, setPatientSearch] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [method, setMethod] = useState<string>('all');
  const [doctorId, setDoctorId] = useState<string>('all');

  const [doctors, setDoctors] = useState<DoctorListItem[]>([]);

  const debouncedPaymentCode = useDebounce(paymentCode, 500);
  const debouncedPatientSearch = useDebounce(patientSearch, 500);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await clientFetcher.get<any>('/doctors');
        if (res.data) {
          setDoctors(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const filters: any = {};

    if (debouncedPaymentCode) filters.paymentCode = debouncedPaymentCode;
    if (debouncedPatientSearch) filters.patientSearch = debouncedPatientSearch;
    if (startDate) filters.startDate = format(startDate, 'yyyy-MM-dd');
    if (endDate) filters.endDate = format(endDate, 'yyyy-MM-dd');
    if (status && status !== 'all') filters.status = status;
    if (method && method !== 'all') filters.method = method;
    if (doctorId && doctorId !== 'all') filters.doctorId = doctorId;

    onFilterChange(filters);
  }, [
    debouncedPaymentCode,
    debouncedPatientSearch,
    startDate,
    endDate,
    status,
    method,
    doctorId,
    onFilterChange,
  ]);

  return (
    <div className='bg-card rounded-xl border p-4 shadow-sm'>
      <div className='mb-4 text-sm font-medium text-muted-foreground'>
        Filters
      </div>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-7'>
        {/* Payment Code */}
        <div className='space-y-1.5'>
          <Label className='text-xs font-medium text-muted-foreground'>
            Payment Code
          </Label>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 size-4 text-muted-foreground' />
            <Input
              placeholder='Search code...'
              className='pl-9'
              value={paymentCode}
              onChange={(e) => setPaymentCode(e.target.value)}
            />
          </div>
        </div>

        {/* Start Date */}
        <div className='space-y-1.5'>
          <Label className='text-xs font-medium text-muted-foreground'>
            Start Date
          </Label>
          <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={`w-full justify-start text-left font-normal ${!startDate && 'text-muted-foreground'}`}
              >
                <CalendarIcon className='mr-2 size-4' />
                {startDate ? format(startDate, 'dd/MM/yyyy') : null}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={startDate}
                onSelect={(newDate) => {
                  setStartDate(newDate);
                  setOpenStartDate(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div className='space-y-1.5'>
          <Label className='text-xs font-medium text-muted-foreground'>
            End Date
          </Label>
          <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={`w-full justify-start text-left font-normal ${!endDate && 'text-muted-foreground'}`}
              >
                <CalendarIcon className='mr-2 size-4' />
                {endDate ? format(endDate, 'dd/MM/yyyy') : null}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={endDate}
                onSelect={(newDate) => {
                  setEndDate(newDate);
                  setOpenEndDate(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Doctor */}
        <div className='space-y-1.5'>
          <Label className='text-xs font-medium text-muted-foreground'>
            Doctor
          </Label>
          <Select value={doctorId} onValueChange={setDoctorId}>
            <SelectTrigger>
              <SelectValue placeholder='Select doctor' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All doctors</SelectItem>
              {doctors.map((doctor) => {
                const name =
                  doctor.user?.username || doctor.professionalTitle || 'Doctor';
                return (
                  <SelectItem
                    key={doctor.id}
                    value={doctor.id.toString()}
                    title={name}
                  >
                    {name.length > 10 ? `${name.slice(0, 10)}...` : name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Patient Search */}
        <div className='space-y-1.5'>
          <Label className='text-xs font-medium text-muted-foreground'>
            Patient
          </Label>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 size-4 text-muted-foreground' />
            <Input
              placeholder='Name or phone...'
              className='pl-9'
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Status */}
        <div className='space-y-1.5'>
          <Label className='text-xs font-medium text-muted-foreground'>
            Status
          </Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value={PaymentStatus.SUCCESS}>Success</SelectItem>
              <SelectItem value={PaymentStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={PaymentStatus.FAILED}>Failed</SelectItem>
              <SelectItem value={PaymentStatus.REFUNDED}>Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method */}
        <div className='space-y-1.5'>
          <Label className='text-xs font-medium text-muted-foreground'>
            Method
          </Label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger>
              <SelectValue placeholder='Select method' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All methods</SelectItem>
              <SelectItem value={PaymentMethod.CASH}>Cash</SelectItem>
              <SelectItem value={PaymentMethod.BANK_TRANSFER}>
                Bank Transfer
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
