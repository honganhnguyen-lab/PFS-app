import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit';
import moment from 'moment';

export const registerAppointment = createAsyncThunk(
  'appointmentSlice/registerAppointment',
  async (payload, {getState}) => {
    try {
      // Access data from the Redux state
      const {dataAppointment} = getState().appointmentSlice;
      console.log('data', dataAppointment);

      // Use the data as needed in the API request payload
      const requestData = {
        ...payload,
        someData,
      };
      console.log('request', requestData);

      // const response = await axiosConfig.post('/api/endpoint', requestData);
      // return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
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
    onChangePayment: (state, payload) => {
      state.price = payload;
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
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
