import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './ui/ui-slice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});
