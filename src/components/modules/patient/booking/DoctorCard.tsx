'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface DoctorProps {
  id: string | number;
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

interface DoctorCardProps {
  doctor: DoctorProps;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const DoctorCard = ({ doctor, isSelected, onSelect }: DoctorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={onSelect}
      className={`flex cursor-pointer flex-col gap-4 rounded-xl border p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center ${
        isSelected
          ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500'
          : 'border-slate-100 bg-white hover:border-teal-200'
      }`}
    >
      <div className='relative'>
        <Avatar className='h-20 w-20 border-2 border-white shadow-sm'>
          <AvatarImage src={doctor.image} alt={doctor.name} />
          <AvatarFallback className='bg-teal-100 text-xl font-bold text-teal-700'>
            {doctor.name?.split(' ').pop()?.charAt(0) ?? 'D'}
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
            <Badge variant='outline' className='h-5 border-pink-200 bg-pink-50 text-[10px] text-pink-600'>
              Bác sĩ nữ
            </Badge>
          )}
        </div>

        <p className='text-sm text-slate-600'>
          {doctor.specialty} • {doctor.experience}
        </p>

        <div className='flex flex-wrap gap-2 pt-1'>
          <Badge variant='secondary' className='bg-slate-100 font-normal text-slate-600'>
            {doctor.location}
          </Badge>
          {doctor.tags
            ?.filter((t) => t !== 'Được đánh giá cao')
            .map((tag, i) => (
              <Badge key={i} variant='outline' className='border-slate-200 font-normal text-slate-500'>
                {tag}
              </Badge>
            ))}
        </div>
      </div>

      <div className='flex flex-col items-end gap-2 sm:min-w-[140px]'>
        <div className='text-right'>
          <p className='text-xs font-medium text-teal-600'>{doctor.availability}</p>
          <p className='text-xs text-slate-400'>{doctor.slots} khung giờ</p>
        </div>
        <Button
          size='sm'
          className={`w-full shadow-none ${
            isSelected
              ? 'bg-teal-600 text-white hover:bg-teal-700'
              : 'border border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-100'
          }`}
        >
          {isSelected ? (
            <>
              <Check className='mr-2 h-4 w-4' />
              Đã chọn
            </>
          ) : (
            'Chọn'
          )}
        </Button>
      </div>
    </motion.div>
  );
};
