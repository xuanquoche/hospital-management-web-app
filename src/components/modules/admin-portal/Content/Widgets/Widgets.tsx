import React from 'react';
import QuickFilters from './QuickFilters';
import ScheduleSnapshot from './ScheduleSnapshot';
import DataQuality from './DataQuality';

const Widgets = () => {
  return (
    <div className='flex flex-col gap-4'>
      <QuickFilters />
      <ScheduleSnapshot />
      <DataQuality />
    </div>
  );
};

export default Widgets;
