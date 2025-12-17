import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Doctor } from '@/types/doctor';

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className='flex flex-row items-center justify-between gap-4 p-4 rounded-xl border hover:shadow-md transition-all h-[170px]'>
      <div className='relative w-[35%] h-[95%] flex-shrink-0'>
        <Image
          src={doctor?.image || '/placeholder.png'}
          alt={doctor.user.fullName}
          fill
          className='object-cover rounded-lg'
        />
      </div>

      <CardContent className='p-0 flex-1'>
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='text-lg font-semibold'>{doctor.user.fullName}</h3>
            <p className='text-base text-muted-foreground'>
              {doctor.primarySpecialty.name}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 p-0 text-gray-500 hover:text-gray-700'
              >
                <EllipsisVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem className='cursor-pointer'>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className='text-red-600 cursor-pointer hover:text-red-600'>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className='text-base mt-2'>
          <span className='text-muted-foreground'>Available :</span>{' '}
          <span className='font-medium'>Available</span>
        </p>
        <p className='text-base mt-1'>
          <span className='text-muted-foreground'>Starts From :</span>{' '}
          <span className='text-blue-600 font-semibold'>
            ${doctor.consultationFee ?? 0}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
