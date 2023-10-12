import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  activeEvent: null,
  isLoadingEvents: true,
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
      const { id } = payload;

      state.events = state.events.map((event) => {
        if (event.id === id) {
          return payload;
        }
        return event;
      });

      state.activeEvent = null;
    },

    onDeleteEvent(state) {
      if (!state.activeEvent) return;

      const { id } = state.activeEvent;

      state.events = state.events.filter((event) => event?.id !== id);

      state.activeEvent = null;
    },

    onLoadingEvents(state, { payload = [] }) {
      state.isLoadingEvents = false;
      // state.events = payload;

      payload.forEach((payloadEvent) => {
        const exist = state.events.some(
          (event) => event.id === payloadEvent.id
        );

        if (!exist) {
          state.events.push(payloadEvent);
        }
      });
    },

    onResetState(state) {
      state.events = [];
      state.activeEvent = null;
      state.isLoadingEvents = true;
    },
  },
});

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadingEvents,
  onResetState,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
