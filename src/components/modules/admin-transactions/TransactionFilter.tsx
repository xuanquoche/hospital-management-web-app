import { Search } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import React from 'react';

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

export function TransactionFilter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('In 2 days');
  const [date, setDate] = React.useState<Date | undefined>();
  const [month, setMonth] = React.useState<Date | undefined>(date);
  return (
    <div className='bg-card rounded-xl border p-4 shadow-sm'>
      <div className='mb-4 text-sm font-medium text-muted-foreground'>
        Filters
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
        <div className='space-y-1.5'>
          <div className='flex flex-col gap-3'>
            <Label htmlFor='date' className='px-1'>
              Schedule Date
            </Label>
            <div className='relative flex gap-2'>
              <Input
                id='date'
                value={value}
                placeholder='Tomorrow or next week'
                className='bg-background pr-10'
                onChange={(e) => {}}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id='date-picker'
                    variant='ghost'
                    className='absolute top-1/2 right-2 size-6 -translate-y-1/2'
                  >
                    <CalendarIcon className='size-3.5' />
                    <span className='sr-only'>Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className='w-auto overflow-hidden p-0'
                  align='end'
                >
                  <Calendar
                    mode='single'
                    selected={date}
                    captionLayout='dropdown'
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
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
              placeholder='Name or phone...'
              className='pl-9'
            />
          </div>
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
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='paid'>Paid</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='failed'>Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Payment method
          </label>
          <Select defaultValue='all'>
            <SelectTrigger>
              <SelectValue placeholder='Select method' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All methods</SelectItem>
              <SelectItem value='cash'>Cash</SelectItem>
              <SelectItem value='card'>Card</SelectItem>
              <SelectItem value='online'>Online</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
