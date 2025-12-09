import React from 'react';

import DataQuality from './DataQuality';
import QuickFilters from './QuickFilters';
import ScheduleSnapshot from './ScheduleSnapshot';

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
