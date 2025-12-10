'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DoctorProps {
  name: string;
  specialty: string;
  experience: string;
  location: string;
  availability: string;
  slots: number;
  image?: string;
  tags?: string[];
  isFemale?: boolean;
}

export const DoctorCard = ({ doctor }: { doctor: DoctorProps }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className='flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center'
    >
      <div className='relative'>
        <Avatar className='h-20 w-20 border-2 border-white shadow-sm'>
          <AvatarImage src={doctor.image} alt={doctor.name} />
          <AvatarFallback className='bg-teal-100 text-teal-700 font-bold text-xl'>
            {doctor.name.split(' ').pop()?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {doctor.tags?.includes('Được đánh giá cao') && (
          <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-white'>
            Được đánh giá cao
          </div>
        )}
      </div>

      <div className='flex-1 space-y-1'>
        <div className='flex items-center gap-2'>
          <h4 className='font-bold text-slate-900'>{doctor.name}</h4>
          {doctor.isFemale && (
            <Badge
              variant='outline'
              className='border-pink-200 bg-pink-50 text-pink-600 text-[10px] h-5'
            >
              Bác sĩ nữ
            </Badge>
          )}
        </div>

        <p className='text-sm text-slate-600'>
          {doctor.specialty} • {doctor.experience}
        </p>

        <div className='flex flex-wrap gap-2 pt-1'>
          <Badge
            variant='secondary'
            className='bg-slate-100 text-slate-600 font-normal'
          >
            {doctor.location}
          </Badge>
          {doctor.tags
            ?.filter((t) => t !== 'Được đánh giá cao')
            .map((tag, i) => (
              <Badge
                key={i}
                variant='outline'
                className='border-slate-200 text-slate-500 font-normal'
              >
                {tag}
              </Badge>
            ))}
        </div>
      </div>

      <div className='flex flex-col items-end gap-2 sm:min-w-[140px]'>
        <div className='text-right'>
          <p className='text-xs font-medium text-teal-600'>
            {doctor.availability}
          </p>
          <p className='text-xs text-slate-400'>{doctor.slots} khung giờ</p>
        </div>
        <Button
          size='sm'
          className='w-full bg-teal-50 text-teal-700 hover:bg-teal-100 shadow-none border border-teal-100'
        >
          Chọn
        </Button>
      </div>
    </motion.div>
  );
};
