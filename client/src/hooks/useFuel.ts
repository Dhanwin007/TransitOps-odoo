import { useState, useEffect, useCallback } from 'react';
import { fuelService } from '../services/fuelService';
import type { FuelLog, ExpenseLog } from '../types';

interface UseFuelReturn {
  fuelLogs: FuelLog[];
  expenseLogs: ExpenseLog[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  addFuelLog: (data: Omit<FuelLog, 'id'>) => Promise<void>;
  deleteFuelLog: (id: string) => Promise<void>;
  addExpenseLog: (data: Omit<ExpenseLog, 'id'>) => Promise<void>;
  deleteExpenseLog: (id: string) => Promise<void>;
}

export const useFuel = (): UseFuelReturn => {
  const [fuelLogs, setFuelLogs]       = useState<FuelLog[]>([]);
  const [expenseLogs, setExpenseLogs] = useState<ExpenseLog[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [fuel, expenses] = await Promise.all([
        fuelService.getFuelLogs(),
        fuelService.getExpenseLogs(),
      ]);
      setFuelLogs(fuel);
      setExpenseLogs(expenses);
    } catch (err) {
      setError('Failed to load fuel and expense data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const addFuelLog = async (data: Omit<FuelLog, 'id'>) => {
    const created = await fuelService.createFuelLog(data);
    setFuelLogs((prev) => [...prev, created]);
  };

  const deleteFuelLog = async (id: string) => {
    await fuelService.deleteFuelLog(id);
    setFuelLogs((prev) => prev.filter((f) => f.id !== id));
  };

  const addExpenseLog = async (data: Omit<ExpenseLog, 'id'>) => {
    const created = await fuelService.createExpenseLog(data);
    setExpenseLogs((prev) => [...prev, created]);
  };

  const deleteExpenseLog = async (id: string) => {
    await fuelService.deleteExpenseLog(id);
    setExpenseLogs((prev) => prev.filter((e) => e.id !== id));
  };

  return {
    fuelLogs,
    expenseLogs,
    loading,
    error,
    refresh: fetchAll,
    addFuelLog,
    deleteFuelLog,
    addExpenseLog,
    deleteExpenseLog,
  };
};
