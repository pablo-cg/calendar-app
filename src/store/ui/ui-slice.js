import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDateModalOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpendateModal(state) {
      state.isDateModalOpen = true;
    },
    onClosedateModal(state) {
      state.isDateModalOpen = false;
    },
  },
});

export const { onOpendateModal, onClosedateModal } = uiSlice.actions;
