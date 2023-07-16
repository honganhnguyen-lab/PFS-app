import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit';
import moment from 'moment';
import {axiosConfig} from '../../axios';

export const registerAppointment = createAsyncThunk(
  'appointmentSlice/registerAppointment',
  async (payload, {getState}) => {
    try {
      const {appointment, auth} = getState();

      const userId = auth?.user?.payload.id;
      console.log('auth', userId);
      const requestData = {
        location: appointment.location,
        appointmentDate: appointment.appointmentDate,
        appointmentStartTime: appointment.appointmentTime,
        appointmentEndTime: appointment.appointmentEndTime,
        serviceId: appointment.serviceId,
        providerId: appointment.providerId,
        userId: userId,
        status: appointment.status,
        price: appointment.price,
      };

      await axiosConfig.post('/api/v1/appointments', requestData);
    } catch (error) {
      console.log('err', error);
    }
  },
);

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
    appointmentEndTime: '',
    serviceId: '',
    providerId: '',
    status: 0,
    price: 0,
  },
  reducers: {
    onSendNameServices: (state, payload) => {
      state.nameServices = payload;
    },
    onSendLocation: (state, payload) => {
      state.location.coordinates = payload.payload.coordinates;
      state.location.address = payload.payload.address;
    },
    onSendAppointmentDateTime: (state, payload) => {
      const convertedPayload = moment(payload.payload, 'YYYY/MM/DD HH:mm');
      state.appointmentDate = moment(convertedPayload).format('YYYY/MM/DD');
      state.appointmentTime = moment(convertedPayload).format('HH:mm');
    },
    onSendDataProvider: (state, payload) => {
      state.providerId = payload.payload;
    },
    onSendDataService: (state, payload) => {
      state.serviceId = payload.payload;
    },
    onSendAppointmentEndTime: (state, payload) => {
      state.appointmentEndTime = payload.payload;
    },
    onTriggerStatusAppointment: (state, payload) => {
      state.status = payload.payload;
    },
    onChangePayment: (state, payload) => {
      state.price = payload.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerAppointment.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(registerAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  onSendNameServices,
  onSendLocation,
  onSendAppointmentDateTime,
  onSendDataProvider,
  onSendDataService,
  onTriggerStatusAppointment,
  onChangePayment,
  onSendAppointmentEndTime,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
