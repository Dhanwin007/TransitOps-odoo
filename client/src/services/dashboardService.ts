// TODO: Backend Integration Pending
// When backend is ready, replace mock imports with:
//   import api from './api';

import {
  mockDashboardStats,
  mockTrips,
  mockVehicles,
} from '../data/mockData';
import type { DashboardStats, Trip, Vehicle } from '../types';

const delay = (ms = 300) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    // TODO: Backend Integration Pending → return api.get('/dashboard/stats').then(r => r.data)
    await delay();
    return { ...mockDashboardStats };
  },

  getRecentTrips: async (limit = 5): Promise<Trip[]> => {
    // TODO: Backend Integration Pending → return api.get(`/dashboard/recent-trips?limit=${limit}`).then(r => r.data)
    await delay();
    return mockTrips.slice(0, limit);
  },

  getVehicleStatusBreakdown: async (): Promise<Vehicle[]> => {
    // TODO: Backend Integration Pending → return api.get('/dashboard/vehicle-status').then(r => r.data)
    await delay();
    return [...mockVehicles];
  },
};
