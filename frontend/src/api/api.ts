import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    Authorization: `Bearer your-secret-token`, // better to keep in the .env but for simplicity hardcoded here
    'Content-Type': 'application/json',
  },
});

export const fetchClients = () => api.get('/client');
export const fetchPayments = () => api.get('/payments');
export const createClient = (data: any) => api.post('/client', data);
export const updateClient = (id: number, data: any) =>
  api.put(`/client/${id}`, data);
export const createPayment = (data: any) => api.post('/payments', data);
export const updatePayment = (id: number, data: any) =>
  api.put(`/payments/${id}`, data);
