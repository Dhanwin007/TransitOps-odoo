// TODO: Backend Integration Pending
// When backend is ready, replace mock imports with:
//   import api from './api';

import { mockMaintenance } from '../data/mockData';
import type { MaintenanceRecord } from '../types';

const delay = (ms = 300) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const maintenanceService = {
  getMaintenanceRecords: async (): Promise<MaintenanceRecord[]> => {
    // TODO: Backend Integration Pending → return api.get('/maintenance').then(r => r.data)
    await delay();
    return [...mockMaintenance];
  },

  getMaintenanceById: async (id: string): Promise<MaintenanceRecord | undefined> => {
    // TODO: Backend Integration Pending → return api.get(`/maintenance/${id}`).then(r => r.data)
    await delay();
    return mockMaintenance.find((m) => m.id === id);
  },

  createMaintenance: async (data: Omit<MaintenanceRecord, 'id'>): Promise<MaintenanceRecord> => {
    // TODO: Backend Integration Pending → return api.post('/maintenance', data).then(r => r.data)
    await delay();
    return { ...data, id: `m${Date.now()}` };
  },

  updateMaintenance: async (id: string, data: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> => {
    // TODO: Backend Integration Pending → return api.put(`/maintenance/${id}`, data).then(r => r.data)
    await delay();
    const record = mockMaintenance.find((m) => m.id === id);
    return { ...record!, ...data };
  },

  completeMaintenance: async (id: string): Promise<MaintenanceRecord> => {
    // TODO: Backend Integration Pending → return api.patch(`/maintenance/${id}/complete`).then(r => r.data)
    await delay();
    const record = mockMaintenance.find((m) => m.id === id);
    return { ...record!, status: 'Completed', completedDate: new Date().toISOString().slice(0, 10) };
  },

  deleteMaintenance: async (id: string): Promise<void> => {
    // TODO: Backend Integration Pending → return api.delete(`/maintenance/${id}`)
    await delay();
    console.log(`[Mock] Deleted maintenance record ${id}`);
  },
};
