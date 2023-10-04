import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const temp = {
  _id: crypto.randomUUID(),
  title: 'Reunión Importante',
  notes: 'notas',
  start: new Date(),
  end: addHours(new Date(), 3),
  bgColor: '#fafafa',
  user: {
    _id: 'asdasd',
    name: 'John Doe',
  },
};

const initialState = {
  events: [temp],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent(state, { payload }) {
      state.activeEvent = payload;
    },

    onAddNewEvent(state, { payload }) {
      state.events.push(payload);
      state.activeEvent = null;
    },

    onUpdateEvent(state, { payload }) {
      const { _id } = payload;

      state.events = state.events.map((event) => {
        if (event._id === _id) {
          return payload;
        }
        return event;
      });

      state.activeEvent = null;
    },

    onDeleteEvent(state) {
      if (!state.activeEvent) return;

      const { _id } = state.activeEvent;

      state.events = state.events.filter((event) => event?._id !== _id);

      state.activeEvent = null;
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
