// TODO: Backend Integration Pending
// When backend is ready, replace mock imports with:
//   import api from './api';

import {
  mockFleetUtilization,
  mockFuelCostData,
  mockTripStatData,
} from '../data/mockData';
import type { FleetUtilizationData, FuelCostData, TripStatData } from '../types';

const delay = (ms = 300) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const analyticsService = {
  getFleetUtilization: async (): Promise<FleetUtilizationData[]> => {
    // TODO: Backend Integration Pending → return api.get('/analytics/fleet-utilization').then(r => r.data)
    await delay();
    return [...mockFleetUtilization];
  },

  getFuelCosts: async (): Promise<FuelCostData[]> => {
    // TODO: Backend Integration Pending → return api.get('/analytics/fuel-costs').then(r => r.data)
    await delay();
    return [...mockFuelCostData];
  },

  getTripStats: async (): Promise<TripStatData[]> => {
    // TODO: Backend Integration Pending → return api.get('/analytics/trip-stats').then(r => r.data)
    await delay();
    return [...mockTripStatData];
  },

  getMaintenanceCosts: async (): Promise<{ label: string; cost: number; color: string }[]> => {
    // TODO: Backend Integration Pending → return api.get('/analytics/maintenance-costs').then(r => r.data)
    await delay();
    return [
      { label: 'Engine Overhaul',       cost: 85000, color: 'bg-red-500' },
      { label: 'Transmission Service',  cost: 35000, color: 'bg-amber-500' },
      { label: 'Brake Service',         cost: 12000, color: 'bg-blue-500' },
      { label: 'Tyre Replacement',      cost: 28000, color: 'bg-purple-500' },
      { label: 'Oil Change',            cost: 4500,  color: 'bg-emerald-500' },
      { label: 'AC Service',            cost: 6500,  color: 'bg-cyan-500' },
    ];
  },

  getInsights: async (): Promise<{ title: string; value: string; detail: string; color: string }[]> => {
    // TODO: Backend Integration Pending → return api.get('/analytics/insights').then(r => r.data)
    await delay();
    return [
      { title: 'Top Performing Driver',   value: 'Anwar Sheikh',       detail: 'Safety Score: 97/100 · 189 trips',  color: 'border-emerald-500/30 bg-emerald-500/5' },
      { title: 'Most Active Vehicle',     value: 'UP-08-OP-0123',      detail: 'Scania R500 · 88,900 km',           color: 'border-blue-500/30 bg-blue-500/5' },
      { title: 'Highest Revenue Route',   value: 'Nagpur → Hyderabad', detail: '₹42,000 per trip · 500 km',         color: 'border-amber-500/30 bg-amber-500/5' },
    ];
  },
};
