import { useState, useEffect, useCallback } from 'react';
import { maintenanceService } from '../services/maintenanceService';
import type { MaintenanceRecord } from '../types';

interface UseMaintenanceReturn {
  records: MaintenanceRecord[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  createMaintenance: (data: Omit<MaintenanceRecord, 'id'>) => Promise<void>;
  updateMaintenance: (id: string, updates: Partial<MaintenanceRecord>) => Promise<void>;
  completeMaintenance: (id: string) => Promise<void>;
  deleteMaintenance: (id: string) => Promise<void>;
}

export const useMaintenance = (): UseMaintenanceReturn => {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await maintenanceService.getMaintenanceRecords();
      setRecords(data);
    } catch (err) {
      setError('Failed to load maintenance records.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const createMaintenance = async (data: Omit<MaintenanceRecord, 'id'>) => {
    const created = await maintenanceService.createMaintenance(data);
    setRecords((prev) => [...prev, created]);
  };

  const updateMaintenance = async (id: string, updates: Partial<MaintenanceRecord>) => {
    const updated = await maintenanceService.updateMaintenance(id, updates);
    setRecords((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  const completeMaintenance = async (id: string) => {
    const updated = await maintenanceService.completeMaintenance(id);
    setRecords((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  const deleteMaintenance = async (id: string) => {
    await maintenanceService.deleteMaintenance(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return {
    records,
    loading,
    error,
    refresh: fetchRecords,
    createMaintenance,
    updateMaintenance,
    completeMaintenance,
    deleteMaintenance,
  };
};
