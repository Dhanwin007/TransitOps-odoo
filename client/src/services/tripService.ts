// TODO: Backend Integration Pending
// When backend is ready, replace mock imports with:
//   import api from './api';

import { mockTrips } from '../data/mockData';
import type { Trip } from '../types';

const delay = (ms = 300) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const tripService = {
  getTrips: async (): Promise<Trip[]> => {
    // TODO: Backend Integration Pending → return api.get('/trips').then(r => r.data)
    await delay();
    return [...mockTrips];
  },

  getTripById: async (id: string): Promise<Trip | undefined> => {
    // TODO: Backend Integration Pending → return api.get(`/trips/${id}`).then(r => r.data)
    await delay();
    return mockTrips.find((t) => t.id === id);
  },

  createTrip: async (data: Omit<Trip, 'id'>): Promise<Trip> => {
    // TODO: Backend Integration Pending → return api.post('/trips', data).then(r => r.data)
    await delay();
    return { ...data, id: `t${Date.now()}` };
  },

  updateTrip: async (id: string, data: Partial<Trip>): Promise<Trip> => {
    // TODO: Backend Integration Pending → return api.put(`/trips/${id}`, data).then(r => r.data)
    await delay();
    const trip = mockTrips.find((t) => t.id === id);
    return { ...trip!, ...data };
  },

  deleteTrip: async (id: string): Promise<void> => {
    // TODO: Backend Integration Pending → return api.delete(`/trips/${id}`)
    await delay();
    console.log(`[Mock] Deleted trip ${id}`);
  },
};
