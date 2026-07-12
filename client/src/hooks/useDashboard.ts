import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/dashboardService';
import type { DashboardStats, Trip, Vehicle } from '../types';

interface UseDashboardReturn {
  stats: DashboardStats;
  recentTrips: Trip[];
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const defaultStats: DashboardStats = {
  activeVehicles:       0,
  availableVehicles:    0,
  vehiclesInMaintenance:0,
  driversOnDuty:        0,
  activeTrips:          0,
  pendingTrips:         0,
  fleetUtilization:     0,
  totalRevenue:         0,
};

export const useDashboard = (): UseDashboardReturn => {
  const [stats, setStats]           = useState<DashboardStats | null>(null);
  const [recentTrips, setRecentTrips] = useState<Trip[]>([]);
  const [vehicles, setVehicles]     = useState<Vehicle[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashStats, trips, vehicleStatus] = await Promise.all([
        dashboardService.getDashboardStats(),
        dashboardService.getRecentTrips(5),
        dashboardService.getVehicleStatusBreakdown(),
      ]);
      setStats(dashStats);
      setRecentTrips(trips);
      setVehicles(vehicleStatus);
    } catch (err) {
      setError('Failed to load dashboard data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats: stats ?? defaultStats,
    recentTrips,
    vehicles,
    loading,
    error,
    refresh: fetchDashboard,
  };
};
