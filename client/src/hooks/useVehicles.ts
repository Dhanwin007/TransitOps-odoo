import { useState, useEffect, useCallback } from 'react';
import { vehicleService } from '../services/vehicleService';
import type { Vehicle } from '../types';

interface UseVehiclesReturn {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Promise<void>;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
}

export const useVehicles = (): UseVehiclesReturn => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await vehicleService.getVehicles();
      setVehicles(data);
    } catch (err) {
      setError('Failed to load vehicles.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const addVehicle = async (vehicle: Omit<Vehicle, 'id'>) => {
    const created = await vehicleService.createVehicle(vehicle);
    setVehicles((prev) => [...prev, created]);
  };

  const updateVehicle = async (id: string, updates: Partial<Vehicle>) => {
    const updated = await vehicleService.updateVehicle(id, updates);
    setVehicles((prev) => prev.map((v) => (v.id === id ? updated : v)));
  };

  const deleteVehicle = async (id: string) => {
    await vehicleService.deleteVehicle(id);
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  return {
    vehicles,
    loading,
    error,
    refresh: fetchVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
  };
};
