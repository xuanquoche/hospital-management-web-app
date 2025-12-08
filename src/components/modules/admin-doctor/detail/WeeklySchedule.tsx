import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleSlot {
  start: string;
  end: string;
  type: 'In-person' | 'Telehealth';
}

interface DaySchedule {
  date: string; // e.g., "Mon 12"
  slots: ScheduleSlot[];
  isOff?: boolean;
}

interface WeeklyScheduleProps {
  schedule: DaySchedule[];
  dateRange: string;
}

export function WeeklySchedule({ schedule, dateRange }: WeeklyScheduleProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='space-y-1'>
          <CardTitle>Weekly schedule overview</CardTitle>
          <CardDescription>Working hours for the selected week</CardDescription>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon-sm'>
              <ChevronLeft className='size-4' />
            </Button>
            <span className='text-sm font-medium'>{dateRange}</span>
            <Button variant='ghost' size='icon-sm'>
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
          >
            Today
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800'
          >
            Khoảng ngày tùy chỉnh
          </Button>
        </div>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
          {schedule.map((day, index) => (
            <div key={index} className='space-y-3'>
              <div className='text-sm font-medium text-muted-foreground'>
                {day.date}
              </div>
              {day.isOff ? (
                <div className='bg-muted/50 rounded-md p-3 text-xs text-muted-foreground h-12 flex items-center'>
                  Off
                </div>
              ) : (
                <div className='space-y-2'>
                  {day.slots.map((slot, slotIndex) => (
                    <div
                      key={slotIndex}
                      className={cn(
                        'rounded-md p-2 text-xs text-white font-medium',
                        slot.type === 'In-person'
                          ? 'bg-emerald-600'
                          : 'bg-emerald-600' // Using same color for now based on image, can differentiate if needed
                      )}
                    >
                      <div>
                        {slot.start} - {slot.end} · {slot.type}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='mt-6 text-xs text-muted-foreground'>
          Use "Khoảng ngày tùy chỉnh" to define custom date ranges and time
          slots for this doctor. Existing appointments remain unchanged.
        </div>
      </CardContent>
    </Card>
  );
}
