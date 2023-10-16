import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadingEvents,
  onResetState,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendar-slice';
import {
  events,
  initialState,
  stateWithActiveEvent,
  stateWithEvents,
} from '../../fixtures/calendar-states';

describe('calendar-slice Tests', () => {
  test('debe regresar el estado inicial', () => {
    const state = calendarSlice.getInitialState();

    expect(state).toEqual(initialState);
  });

  test('onSetActiveEvent debe activar 1 evento', () => {
    const state = calendarSlice.reducer(
      stateWithEvents,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
  });

  test('onAddNewEvent debe agregar 1 evento', () => {
    const newEvent = {
      id: '3',
      start: new Date('2023-10-15 10:00:00'),
      end: new Date('2023-10-15 12:00:00'),
      title: 'Titulo Evento 3',
      notes: 'Notas Evento 3',
      bgColor: '#fafafa',
    };

    const state = calendarSlice.reducer(
      stateWithEvents,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
  });

  test('onUpdateEvent debe actualizar el evento', () => {
    const updatedEvent = {
      id: '1',
      start: new Date('2023-10-15 10:00:00'),
      end: new Date('2023-10-15 12:00:00'),
      title: 'Titulo Evento 1 Modificado',
      notes: 'Notas Evento 1 Modificado',
      bgColor: '#fafafa',
    };

    const state = calendarSlice.reducer(
      stateWithEvents,
      onUpdateEvent(updatedEvent)
    );

    expect(state.events).toContain(updatedEvent);
  });

  test('onDeleteEvent debe eliminar el evento activo', () => {
    const state = calendarSlice.reducer(stateWithActiveEvent, onDeleteEvent());

    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test('onLoadingEvents debe establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadingEvents(events));

    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);

    const newState = calendarSlice.reducer(state, onLoadingEvents(events));
    expect(newState.events.length).toBe(events.length);
  });

  test('onResetState debe limpiar el estado', () => {
    const state = calendarSlice.reducer(stateWithActiveEvent, onResetState());

    expect(state).toEqual(initialState);
  });
});
