import { Button } from '@/components/ui/button';
import { Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function AppointmentFilter() {
  return (
    <div className='bg-card rounded-xl border p-4 shadow-sm'>
      <div className='mb-4 text-sm font-medium text-muted-foreground'>
        Filters
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Date range
          </label>
          <Button
            variant='outline'
            className='w-full justify-start text-left font-normal'
          >
            <Calendar className='mr-2 size-4' />
            12 Aug 2025 – 18 Aug 2025
          </Button>
        </div>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Status
          </label>
          <Select defaultValue='all'>
            <SelectTrigger>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All statuses</SelectItem>
              <SelectItem value='confirmed'>Confirmed</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='cancelled'>Cancelled</SelectItem>
              <SelectItem value='completed'>Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Doctor
          </label>
          <Select defaultValue='all'>
            <SelectTrigger>
              <SelectValue placeholder='Select doctor' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All doctors</SelectItem>
              <SelectItem value='dr-sarah'>Dr. Sarah Thompson</SelectItem>
              <SelectItem value='dr-miguel'>Dr. Miguel Alvarez</SelectItem>
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
              placeholder='Search by patient name / phone...'
              className='pl-9'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
