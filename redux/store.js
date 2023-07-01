import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import bookingReducer from './auth/bookingSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
  },
});
