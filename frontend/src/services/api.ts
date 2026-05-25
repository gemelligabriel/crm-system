import axios from 'axios';
import { EventPayload, EvolutionPayload, PatientPayload } from '../types';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const patientsApi = {
  list: (search = '') => api.get('/patients', { params: { search } }),
  get: (id: string) => api.get(`/patients/${id}`),
  create: (data: PatientPayload) => api.post('/patients', data),
  update: (id: string, data: PatientPayload) => api.patch(`/patients/${id}`, data),
  remove: (id: number) => api.delete(`/patients/${id}`),
};

export const eventsApi = {
  create: (patientId: string, data: EventPayload) => api.post(`/patients/${patientId}/events`, data),
};

export const evolutionsApi = {
  create: (patientId: string, data: EvolutionPayload) => api.post(`/patients/${patientId}/evolutions`, data),
};
