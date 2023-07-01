import {createSlice, createSelector} from '@reduxjs/toolkit';
import {create} from 'react-test-renderer';

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    listAppointment: [],
  },
  reducers: {
    setListAppointment: (state, payload) => {
      state.listAppointment = payload;
    },
  },
});

export const selectFullAppointmentList = state =>
  state?.booking?.listAppointment;

export const {setListAppointment} = bookingSlice.actions;

export default bookingSlice.reducer;
