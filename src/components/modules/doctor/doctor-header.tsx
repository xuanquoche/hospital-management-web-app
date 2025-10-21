import { AlertTriangle, Calendar, Scissors, UserPlus } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export default function DoctorHeader() {
  return (
    <div className='flex gap-6'>
      <div className='flex gap-4 flex-shrink-0'>
        <div>
          <Avatar className='w-24 h-24'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback className='text-lg'>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className='min-w-0'>
          <div className='mb-3'>
            <h1 className='text-2xl font-bold mb-2'>Doctor Appointment</h1>
            <h2 className='text-xl font-semibold'>Dr. Ratul Ahamed</h2>
            <div className='flex items-center gap-2 flex-wrap'>
              <p className='text-sm text-muted-foreground'>Heart Specialist</p>
              <p className='text-sm font-medium'>9:30am - 01:00am BST</p>
            </div>
          </div>

          <div className='mb-3'>
            <p className='text-sm text-muted-foreground text-wrap max-w-[500px]'>
              Infectious Diseases Hub aims to provide up-to-date, essential
              research and on aspects of microbiology, virology, and
              parasitology.
            </p>
          </div>

          <div className='mb-3'>
            <p className='text-sm'>
              <strong>DiMa@umtitledul.com</strong>
            </p>
          </div>
        </div>
      </div>

      <div className='flex-1 grid grid-cols-2 md:grid-cols-4 gap-4'>
        <StatsCard
          label='Appointment'
          value='165'
          icon={<Calendar className='w-5 h-5' />}
        />
        <StatsCard
          label='New Admitted'
          value='102'
          icon={<UserPlus className='w-5 h-5' />}
        />
        <StatsCard
          label='Surgery'
          value='4'
          icon={<Scissors className='w-5 h-5' />}
        />
        <StatsCard
          label='Critical Patient'
          value='54'
          icon={<AlertTriangle className='w-5 h-5' />}
        />
      </div>
    </div>
  );
}

function StatsCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <Card className='h-[60%] my-auto bg-doctor-tab'>
      <CardContent className='p-6 text-center flex flex-col justify-center h-full'>
        <div className='flex justify-center mb-3 text-doctor-primary'>
          {icon}
        </div>
        <p className='text-2xl font-semibold mb-1'>{value}</p>
        <p className='text-sm text-muted-foreground'>{label}</p>
      </CardContent>
    </Card>
  );
}
