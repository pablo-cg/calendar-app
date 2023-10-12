import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { transformEventDates } from '../helpers';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadingEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  function setActiveEvent(calendarEvent) {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  async function startSavingEvent(calendarEvent) {
    try {
      if (calendarEvent?.id) {
        await calendarApi.put(`/events/${calendarEvent?.id}`, calendarEvent);

        dispatch(onUpdateEvent({ ...calendarEvent, user }));

        return;
      }

      const { data } = await calendarApi.post('/events', calendarEvent);

      dispatch(onAddNewEvent({ id: data.event.id, ...calendarEvent, user }));
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: 'Hubo un error al guardar el evento',
        text: error?.response?.data?.msg || 'Error inesperado',
        icon: 'error',
      });
    }
  }

  async function startDeleteEvent() {
    if (!activeEvent) {
      return;
    }

    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: 'Hubo un error al eliminar el evento',
        text: error?.response?.data?.msg || 'Error inesperado',
        icon: 'error',
      });
    }
  }

  async function startLoadingEvents() {
    try {
      const { data } = await calendarApi.get('/events');

      const events = transformEventDates(data.events);

      dispatch(onLoadingEvents(events));
    } catch (error) {
      console.log(error);
    }
  }

  return {
    activeEvent,
    events,
    hasActiveEvent: !!activeEvent,
    setActiveEvent,
    startDeleteEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
