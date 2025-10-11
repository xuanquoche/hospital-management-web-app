import { Calendar, Settings, Bell } from 'lucide-react';

import { AiButton, UserAvatar } from '@/components/modules/header/index';
import { Button } from '@/components/ui/button';

export function HeaderActions() {
  return (
    <div className='flex items-center gap-3'>
      <AiButton />

      <Button variant='ghost' size='icon' className='cursor-pointer'>
        <Calendar className='h-5 w-5' />
      </Button>

      <Button variant='ghost' size='icon' className='cursor-pointer'>
        <Settings className='h-5 w-5' />
      </Button>

      <Button variant='ghost' size='icon' className='cursor-pointer'>
        <Bell className='h-5 w-5' />
      </Button>

      <UserAvatar />
    </div>
  );
}
