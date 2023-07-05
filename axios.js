import axios from 'axios';

export const axiosConfig = axios.create({
  baseURL: 'http://192.168.1.88:4000',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const loginUri = '/api/v1/users/login';
export const bookingUri = '/api/v1/appointments/customer';
export const listBookingProviderUri = '/api/v1/appointments/provider';
export const getListServicesElasticUri = '/api/v1/services/elastic';
export const getListServicesEachProvider = '/api/v1/users/';
