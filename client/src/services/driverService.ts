// TODO: Backend Integration Pending
// When backend is ready, replace mock imports with:
//   import api from './api';

import { mockDrivers } from '../data/mockData';
import type { Driver } from '../types';

const delay = (ms = 300) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const driverService = {
  getDrivers: async (): Promise<Driver[]> => {
    // TODO: Backend Integration Pending → return api.get('/drivers').then(r => r.data)
    await delay();
    return [...mockDrivers];
  },

  getDriverById: async (id: string): Promise<Driver | undefined> => {
    // TODO: Backend Integration Pending → return api.get(`/drivers/${id}`).then(r => r.data)
    await delay();
    return mockDrivers.find((d) => d.id === id);
  },

  createDriver: async (data: Omit<Driver, 'id'>): Promise<Driver> => {
    // TODO: Backend Integration Pending → return api.post('/drivers', data).then(r => r.data)
    await delay();
    return { ...data, id: `d${Date.now()}` };
  },

  updateDriver: async (id: string, data: Partial<Driver>): Promise<Driver> => {
    // TODO: Backend Integration Pending → return api.put(`/drivers/${id}`, data).then(r => r.data)
    await delay();
    const driver = mockDrivers.find((d) => d.id === id);
    return { ...driver!, ...data };
  },

  deleteDriver: async (id: string): Promise<void> => {
    // TODO: Backend Integration Pending → return api.delete(`/drivers/${id}`)
    await delay();
    console.log(`[Mock] Deleted driver ${id}`);
  },
};
