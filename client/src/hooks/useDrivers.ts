import { useState, useEffect, useCallback } from 'react';
import { driverService } from '../services/driverService';
import type { Driver } from '../types';

interface UseDriversReturn {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  addDriver: (driver: Omit<Driver, 'id'>) => Promise<void>;
  updateDriver: (id: string, updates: Partial<Driver>) => Promise<void>;
  deleteDriver: (id: string) => Promise<void>;
}

export const useDrivers = (): UseDriversReturn => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await driverService.getDrivers();
      setDrivers(data);
    } catch (err) {
      setError('Failed to load drivers.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const addDriver = async (driver: Omit<Driver, 'id'>) => {
    const created = await driverService.createDriver(driver);
    setDrivers((prev) => [...prev, created]);
  };

  const updateDriver = async (id: string, updates: Partial<Driver>) => {
    const updated = await driverService.updateDriver(id, updates);
    setDrivers((prev) => prev.map((d) => (d.id === id ? updated : d)));
  };

  const deleteDriver = async (id: string) => {
    await driverService.deleteDriver(id);
    setDrivers((prev) => prev.filter((d) => d.id !== id));
  };

  return {
    drivers,
    loading,
    error,
    refresh: fetchDrivers,
    addDriver,
    updateDriver,
    deleteDriver,
  };
};
