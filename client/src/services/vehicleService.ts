// TODO: Backend Integration Pending
// When backend is ready, replace mock imports with:
//   import api from './api';
// And swap each function body with the corresponding API call.

import {
  mockVehicles,
} from '../data/mockData';
import type { Vehicle } from '../types';

const delay = (ms = 300) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const vehicleService = {
  getVehicles: async (): Promise<Vehicle[]> => {
    // TODO: Backend Integration Pending → return api.get('/vehicles').then(r => r.data)
    await delay();
    return [...mockVehicles];
  },

  getVehicleById: async (id: string): Promise<Vehicle | undefined> => {
    // TODO: Backend Integration Pending → return api.get(`/vehicles/${id}`).then(r => r.data)
    await delay();
    return mockVehicles.find((v) => v.id === id);
  },

  createVehicle: async (data: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    // TODO: Backend Integration Pending → return api.post('/vehicles', data).then(r => r.data)
    await delay();
    return { ...data, id: `v${Date.now()}` };
  },

  updateVehicle: async (id: string, data: Partial<Vehicle>): Promise<Vehicle> => {
    // TODO: Backend Integration Pending → return api.put(`/vehicles/${id}`, data).then(r => r.data)
    await delay();
    const vehicle = mockVehicles.find((v) => v.id === id);
    return { ...vehicle!, ...data };
  },

  deleteVehicle: async (id: string): Promise<void> => {
    // TODO: Backend Integration Pending → return api.delete(`/vehicles/${id}`)
    await delay();
    console.log(`[Mock] Deleted vehicle ${id}`);
  },
};
