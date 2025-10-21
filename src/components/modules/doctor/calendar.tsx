'use client';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';

export default function Calendar({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}) {
  const handleDateClick = (info: any) => {
    if (selectedDate === info.dateStr) {
      onSelectDate(null);
    } else {
      onSelectDate(info.dateStr);
    }
  };

  return (
    <div className='bg-white rounded-xl shadow p-4'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
        height='auto'
      />
    </div>
  );
}
