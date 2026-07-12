import React, { useState } from 'react';
import { MdLocalGasStation, MdReceipt, MdAttachMoney, MdSpeed } from 'react-icons/md';
import Table from '../components/ui/Table';
import StatCard from '../components/ui/StatCard';
import SearchBar from '../components/ui/SearchBar';
import Loader from '../components/ui/Loader';
import { useFuel } from '../hooks/useFuel';
import type { FuelLog, ExpenseLog } from '../types';

const FuelExpenses: React.FC = () => {
  const { fuelLogs, expenseLogs, loading, error } = useFuel();
  const [activeTab, setActiveTab] = useState<'fuel' | 'expenses'>('fuel');
  const [search, setSearch] = useState('');

  const filteredFuel = fuelLogs.filter(
    (f) =>
      f.vehicleReg.toLowerCase().includes(search.toLowerCase()) ||
      f.driverName.toLowerCase().includes(search.toLowerCase()) ||
      f.fuelStation.toLowerCase().includes(search.toLowerCase())
  );

  const filteredExpenses = expenseLogs.filter(
    (e) =>
      e.vehicleReg.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalFuelCost  = fuelLogs.reduce((s, f) => s + f.totalCost, 0);
  const totalFuelLiters = fuelLogs.reduce((s, f) => s + f.liters, 0);
  const totalExpenses  = expenseLogs.reduce((s, e) => s + e.amount, 0);
  const avgPerLiter    = totalFuelLiters > 0 ? totalFuelCost / totalFuelLiters : 0;

  const fuelColumns = [
    { header: 'Vehicle', accessor: (f: FuelLog) => (
      <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded text-slate-200">{f.vehicleReg}</span>
    )},
    { header: 'Driver',   accessor: 'driverName' as keyof FuelLog },
    { header: 'Date',     accessor: 'date' as keyof FuelLog },
    { header: 'Liters',   accessor: (f: FuelLog) => <span className="font-medium text-blue-400">{f.liters}L</span> },
    { header: 'Price/L',  accessor: (f: FuelLog) => `₹${f.pricePerLiter.toFixed(1)}` },
    { header: 'Total Cost', accessor: (f: FuelLog) => (
      <span className="font-medium text-emerald-400">₹{f.totalCost.toLocaleString()}</span>
    )},
    { header: 'Odometer', accessor: (f: FuelLog) => `${f.odometer.toLocaleString()} km` },
    { header: 'Station',  accessor: 'fuelStation' as keyof FuelLog },
  ];

  const expenseColumns = [
    { header: 'Vehicle', accessor: (e: ExpenseLog) => (
      <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded text-slate-200">{e.vehicleReg}</span>
    )},
    { header: 'Category', accessor: (e: ExpenseLog) => (
      <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300">{e.category}</span>
    )},
    { header: 'Description', accessor: 'description' as keyof ExpenseLog },
    { header: 'Amount', accessor: (e: ExpenseLog) => (
      <span className="font-medium text-amber-400">₹{e.amount.toLocaleString()}</span>
    )},
    { header: 'Date',        accessor: 'date' as keyof ExpenseLog },
    { header: 'Approved By', accessor: 'approvedBy' as keyof ExpenseLog },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" text="Loading fuel and expense data..." />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 text-center mt-12">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Fuel & Expenses</h1>
        <p className="text-sm text-slate-500 mt-1">Track fuel consumption and operational expenses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Total Fuel Cost"   value={`₹${(totalFuelCost / 1000).toFixed(1)}K`}  icon={<MdLocalGasStation size={22} />} color="blue"    subtitle="this period" />
        <StatCard title="Fuel Consumed"     value={`${totalFuelLiters.toLocaleString()}L`}    icon={<MdSpeed size={22} />}           color="cyan"    subtitle="total liters" />
        <StatCard title="Other Expenses"    value={`₹${(totalExpenses / 1000).toFixed(1)}K`}  icon={<MdReceipt size={22} />}         color="amber"   subtitle="non-fuel costs" />
        <StatCard title="Avg Price/Liter"   value={`₹${avgPerLiter.toFixed(1)}`}              icon={<MdAttachMoney size={22} />}     color="emerald" subtitle="blended rate" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700 pb-0">
        {(['fuel', 'expenses'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearch(''); }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${
              activeTab === tab
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab === 'fuel' ? '⛽ Fuel Logs' : '🧾 Expense Logs'}
          </button>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={activeTab === 'fuel' ? 'Search fuel logs...' : 'Search expenses...'}
          className="w-72"
        />
      </div>

      {activeTab === 'fuel' ? (
        <Table columns={fuelColumns} data={filteredFuel} keyExtractor={(f) => f.id} />
      ) : (
        <Table columns={expenseColumns} data={filteredExpenses} keyExtractor={(e) => e.id} />
      )}

      {/* Expense Breakdown */}
      {activeTab === 'expenses' && (
        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Expense Breakdown by Category</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {['Fuel','Toll','Parking','Repair','Insurance','Other'].map((cat) => {
              const total = expenseLogs.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
              return (
                <div key={cat} className="text-center">
                  <p className="text-lg font-bold text-slate-200">₹{(total / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-slate-500 mt-1">{cat}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelExpenses;
