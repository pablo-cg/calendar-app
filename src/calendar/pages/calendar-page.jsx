import { addHours } from 'date-fns';
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getEsMessages, localizer } from '../../helpers';
import { CalendarEvent, Navbar } from '../components';

const events = [
  {
    title: 'Reunión Importante',
    notes: 'notas',
    start: new Date(),
    end: addHours(new Date(), 3),
    bgColor: '#fafafa',
    user: {
      _id: 'asdasd',
      name: 'John Doe',
    },
  },
];

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('last-view') || 'week'
  );

  function eventStylesGetter(event, start, end, isSelected) {
    const style = {
      backgroundColor: '#347cf7',
      borderRadius: 0,
      opacity: 0.8,
      color: 'white',
    };

    return { style };
  }

  function onDoubleClick(event) {
    console.log(
      '🚀 ~ file: calendar-page.jsx:34 ~ onDoubleClick ~ event:',
      event
    );
  }

  function onSelect(event) {
    console.log('🚀 ~ file: calendar-page.jsx:34 ~ onSelect ~ event:', event);
  }

  function onViewChange(currentView) {
    localStorage.setItem('last-view', currentView);
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        messages={getEsMessages()}
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)', padding: '1rem' }}
        eventPropGetter={eventStylesGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
    </>
  );
};
