// TODO: Backend Integration Pending
// When backend is ready, replace mock imports with:
//   import api from './api';

import { mockFuelLogs, mockExpenseLogs } from '../data/mockData';
import type { FuelLog, ExpenseLog } from '../types';

const delay = (ms = 300) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const fuelService = {
  getFuelLogs: async (): Promise<FuelLog[]> => {
    // TODO: Backend Integration Pending → return api.get('/fuel').then(r => r.data)
    await delay();
    return [...mockFuelLogs];
  },

  getFuelLogById: async (id: string): Promise<FuelLog | undefined> => {
    // TODO: Backend Integration Pending → return api.get(`/fuel/${id}`).then(r => r.data)
    await delay();
    return mockFuelLogs.find((f) => f.id === id);
  },

  createFuelLog: async (data: Omit<FuelLog, 'id'>): Promise<FuelLog> => {
    // TODO: Backend Integration Pending → return api.post('/fuel', data).then(r => r.data)
    await delay();
    return { ...data, id: `f${Date.now()}` };
  },

  updateFuelLog: async (id: string, data: Partial<FuelLog>): Promise<FuelLog> => {
    // TODO: Backend Integration Pending → return api.put(`/fuel/${id}`, data).then(r => r.data)
    await delay();
    const log = mockFuelLogs.find((f) => f.id === id);
    return { ...log!, ...data };
  },

  deleteFuelLog: async (id: string): Promise<void> => {
    // TODO: Backend Integration Pending → return api.delete(`/fuel/${id}`)
    await delay();
    console.log(`[Mock] Deleted fuel log ${id}`);
  },

  getExpenseLogs: async (): Promise<ExpenseLog[]> => {
    // TODO: Backend Integration Pending → return api.get('/expenses').then(r => r.data)
    await delay();
    return [...mockExpenseLogs];
  },

  getExpenseLogById: async (id: string): Promise<ExpenseLog | undefined> => {
    // TODO: Backend Integration Pending → return api.get(`/expenses/${id}`).then(r => r.data)
    await delay();
    return mockExpenseLogs.find((e) => e.id === id);
  },

  createExpenseLog: async (data: Omit<ExpenseLog, 'id'>): Promise<ExpenseLog> => {
    // TODO: Backend Integration Pending → return api.post('/expenses', data).then(r => r.data)
    await delay();
    return { ...data, id: `e${Date.now()}` };
  },

  deleteExpenseLog: async (id: string): Promise<void> => {
    // TODO: Backend Integration Pending → return api.delete(`/expenses/${id}`)
    await delay();
    console.log(`[Mock] Deleted expense log ${id}`);
  },
};
