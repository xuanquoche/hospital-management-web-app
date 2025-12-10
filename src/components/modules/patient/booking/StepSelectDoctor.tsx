'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { DoctorList } from './DoctorList';
import { DoctorSearch } from './DoctorSearch';
import { SpecialtyList } from './SpecialtyList';

export const StepSelectDoctor = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='space-y-6'
    >
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        {/* Left Column: Search & Specialty List */}
        <div className='space-y-6 lg:col-span-5'>
          <DoctorSearch />
          <SpecialtyList />
        </div>

        {/* Right Column: Doctor List */}
        <div className='lg:col-span-7'>
          <DoctorList />
        </div>
      </div>
    </motion.div>
  );
};
