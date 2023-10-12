import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getEsMessages, localizer } from '../../helpers';
import { useAuthStore, useCalendarStore, useUIStore } from '../../hooks';
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from '../components';

export const CalendarPage = () => {
  const { openDateModal } = useUIStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { user } = useAuthStore();

  const [lastView] = useState(localStorage.getItem('last-view') || 'week');

  useEffect(() => {
    startLoadingEvents();
  }, []);

  function eventStylesGetter(event, start, end, isSelected) {
    const isLoggedUserEvent = (event.user._id || event.user.uid) === user.uid;

    const style = {
      backgroundColor: isLoggedUserEvent ? '#347cf7' : '#465660',
      borderRadius: 0,
      opacity: 0.8,
      color: 'white',
    };

    return { style };
  }

  function onDoubleClick(event) {
    openDateModal();
  }

  function onSelect(calendarEvent) {
    setActiveEvent(calendarEvent);
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

      <CalendarModal />
      <FabAddNew />

      <FabDelete />
    </>
  );
};
