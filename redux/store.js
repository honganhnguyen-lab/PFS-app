import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import bookingReducer from './auth/bookingSlice';
import appointmentReducer from './appointment/appointmentSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    appointment: appointmentReducer,
  },
});
