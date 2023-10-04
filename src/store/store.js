import { configureStore } from '@reduxjs/toolkit';
import { calendarSlice } from './calendar/calendar-slice';
import { uiSlice } from './ui/ui-slice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
