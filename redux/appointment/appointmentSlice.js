import {createSlice, createSelector} from '@reduxjs/toolkit';
import moment from 'moment';

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    nameServices: '',
    location: {
      type: 'Point',
      coordinates: [],
      address: '',
    },
    appointmentDate: '',
    appointmentTime: '',
    serviceId: '',
    providerId: '',
    status: 0,
  },
  reducers: {
    onSendNameServices: (state, payload) => {
      state.nameServices = payload;
    },
    onSendLocation: (state, payload) => {
      state.location.coordinates = payload.coordinates;
      state.location.address = payload.address;
    },
    onSendAppointmentDateTime: (state, payload) => {
      state.appointmentDate = moment(payload, 'YYYY/MM/DD');
      state.appointmentTime = moment(payload, 'HH:mm:ss');
    },
    onSendDataProvider: (state, payload) => {
      state.providerId = payload;
    },
    onSendDataService: (state, payload) => {
      state.serviceId = payload.serviceId;
    },
    onTriggerStatusAppointment: (state, payload) => {
      state.status = payload;
    },
  },
});

export const {
  onSendNameServices,
  onSendLocation,
  onSendAppointmentDateTime,
  onSendDataProvider,
  onSendDataService,
  onTriggerStatusAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
