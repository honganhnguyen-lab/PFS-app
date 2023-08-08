import axios from 'axios';

export const axiosConfig = axios.create({
  // baseURL: 'https://pfs.try0.xyz',
  baseURL: 'http://192.168.22.102:4000',
  timeout: 30000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export const loginUri = '/api/v1/users/login';
export const bookingUri = '/api/v1/appointments/customer';
export const listBookingProviderUri = '/api/v1/appointments/provider';
export const getListServicesElasticUri = '/api/v1/services/elastic';
export const getListServicesEachProvider = '/api/v1/users/';
export const getListServices = '/api/v1/services/distances/';
export const getTransaction = '/api/v1/transaction/create_payment_url';
export const registerAppointment = '/api/v1/appointments';
export const uploadService = 'api/v1/services/upload-picture';
