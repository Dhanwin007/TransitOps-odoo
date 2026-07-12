import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analyticsService';
import type { FleetUtilizationData, FuelCostData, TripStatData } from '../types';

interface MaintenanceCostItem {
  label: string;
  cost: number;
  color: string;
}

interface InsightItem {
  title: string;
  value: string;
  detail: string;
  color: string;
}

interface UseAnalyticsReturn {
  fleetUtilization: FleetUtilizationData[];
  fuelCosts: FuelCostData[];
  tripStats: TripStatData[];
  maintenanceCosts: MaintenanceCostItem[];
  insights: InsightItem[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const [fleetUtilization, setFleetUtilization] = useState<FleetUtilizationData[]>([]);
  const [fuelCosts, setFuelCosts]               = useState<FuelCostData[]>([]);
  const [tripStats, setTripStats]               = useState<TripStatData[]>([]);
  const [maintenanceCosts, setMaintenanceCosts] = useState<MaintenanceCostItem[]>([]);
  const [insights, setInsights]                 = useState<InsightItem[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [util, fuel, trips, maint, ins] = await Promise.all([
        analyticsService.getFleetUtilization(),
        analyticsService.getFuelCosts(),
        analyticsService.getTripStats(),
        analyticsService.getMaintenanceCosts(),
        analyticsService.getInsights(),
      ]);
      setFleetUtilization(util);
      setFuelCosts(fuel);
      setTripStats(trips);
      setMaintenanceCosts(maint);
      setInsights(ins);
    } catch (err) {
      setError('Failed to load analytics data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    fleetUtilization,
    fuelCosts,
    tripStats,
    maintenanceCosts,
    insights,
    loading,
    error,
    refresh: fetchAnalytics,
  };
};
