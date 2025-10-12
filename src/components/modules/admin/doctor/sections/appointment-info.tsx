'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export function AppointmentInfo({ form }: { form: any }) {
  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-semibold'>Appointment Information</h2>

      <div className='flex flex-col gap-4'>
        {/* Appointment Type */}
        <div>
          <Label className='mb-2 block'>Appointment Type</Label>
          <Select
            onValueChange={(value) => form.setValue('appointmentType', value)}
            defaultValue={form.watch('appointmentType')}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='online'>Online Consultation</SelectItem>
              <SelectItem value='in-person'>In-Person Consultation</SelectItem>
              <SelectItem value='home-visit'>Home Visit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Accept Booking (in Advance) */}
        <div>
          <Label className='mb-2 block'>Accept Booking (in Advance)</Label>
          <Input
            type='number'
            min='0'
            placeholder='Enter number of days'
            {...form.register('acceptBookingAdvance')}
          />
        </div>

        {/* Consultation Charge */}
        <div>
          <Label className='mb-2 block'>Consultation Charge ($)</Label>
          <Input
            type='number'
            min='0'
            step='0.01'
            {...form.register('consultationCharge')}
          />
        </div>

        {/* Display on Booking Page */}
        <div className='col-span-2 flex items-center justify-between border rounded-md px-4 py-2'>
          <Label htmlFor='displayOnBooking' className='text-sm font-medium'>
            Display on Booking Page
          </Label>
          <Switch
            id='displayOnBooking'
            checked={form.watch('displayOnBooking')}
            onCheckedChange={(value) =>
              form.setValue('displayOnBooking', value)
            }
          />
        </div>
      </div>
    </div>
  );
}
