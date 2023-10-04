import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  function setActiveEvent(calendarEvent) {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  async function startSavingEvent(calendarEvent) {
    if (calendarEvent?._id) {
      dispatch(onUpdateEvent(calendarEvent));
    } else {
      dispatch(onAddNewEvent({ _id: crypto.randomUUID(), ...calendarEvent }));
    }
  }

  async function startDeleteEvent() {
    dispatch(onDeleteEvent());
  }

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    hasActiveEvent: !!activeEvent,
  };
};
