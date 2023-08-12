import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import bookingReducer from './auth/bookingSlice';
import appointmentReducer from './appointment/appointmentSlice';
import notiReducer from './noti/notiSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    appointment: appointmentReducer,
    noti: notiReducer,
  },
});
