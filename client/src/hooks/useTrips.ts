import { useState, useEffect, useCallback } from 'react';
import { tripService } from '../services/tripService';
import type { Trip } from '../types';

interface UseTripsReturn {
  trips: Trip[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  addTrip: (trip: Omit<Trip, 'id'>) => Promise<void>;
  updateTrip: (id: string, updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
}

export const useTrips = (): UseTripsReturn => {
  const [trips, setTrips]   = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tripService.getTrips();
      setTrips(data);
    } catch (err) {
      setError('Failed to load trips.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const addTrip = async (trip: Omit<Trip, 'id'>) => {
    const created = await tripService.createTrip(trip);
    setTrips((prev) => [...prev, created]);
  };

  const updateTrip = async (id: string, updates: Partial<Trip>) => {
    const updated = await tripService.updateTrip(id, updates);
    setTrips((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTrip = async (id: string) => {
    await tripService.deleteTrip(id);
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    trips,
    loading,
    error,
    refresh: fetchTrips,
    addTrip,
    updateTrip,
    deleteTrip,
  };
};
