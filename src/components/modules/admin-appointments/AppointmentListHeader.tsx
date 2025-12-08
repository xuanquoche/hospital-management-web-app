import { Button } from '@/components/ui/button';
import { Calendar, Sparkles } from 'lucide-react';

export function AppointmentListHeader() {
  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Appointments</h1>
        <p className='text-muted-foreground mt-1 text-sm'>
          Quản lý Lịch hẹn - Xem, điều phối và cập nhật trạng thái.
        </p>
        <div className='text-muted-foreground mt-2 flex items-center gap-2 text-xs'>
          <span>Today: 32 appointments</span>
          <span>•</span>
          <span>Pending: 6</span>
          <span>•</span>
          <span>Cancelled: 2</span>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          className='bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800'
        >
          <Calendar className='mr-2 size-4' />
          Book appointment
        </Button>
        <Button size='sm' className='bg-emerald-600 hover:bg-emerald-700'>
          <Sparkles className='mr-2 size-4' />
          Auto-assign
        </Button>
      </div>
    </div>
  );
}
