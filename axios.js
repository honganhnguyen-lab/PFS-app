import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: 'http://192.168.1.70:4000',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const loginUri = '/api/v1/users/login';
export const bookingUri = 'api/v1/appointments/customer';
