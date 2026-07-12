import React from 'react';
import {
  MdDirectionsBus, MdCheckCircle, MdBuild, MdPeople,
  MdRoute, MdPending, MdSpeed, MdAttachMoney,
} from 'react-icons/md';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import Table from '../components/ui/Table';
import Loader from '../components/ui/Loader';
import { useDashboard } from '../hooks/useDashboard';
import type { Trip } from '../types';

const Dashboard: React.FC = () => {
  const { stats, recentTrips, vehicles, loading, error } = useDashboard();

  const totalVehicles = vehicles.length;

  const vehicleStatusData = [
    { label: 'Active',      count: stats.activeVehicles,          color: 'bg-emerald-500' },
    { label: 'Available',   count: stats.availableVehicles,       color: 'bg-blue-500' },
    { label: 'Maintenance', count: stats.vehiclesInMaintenance,   color: 'bg-amber-500' },
    { label: 'Inactive',    count: vehicles.filter(v => v.status === 'Inactive').length, color: 'bg-slate-500' },
  ];

  const tripColumns = [
    { header: 'Route', accessor: (t: Trip) => (
      <span className="font-medium text-slate-200">{t.source} → {t.destination}</span>
    )},
    { header: 'Vehicle', accessor: (t: Trip) => (
      <span className="font-mono text-xs bg-slate-700 px-2 py-0.5 rounded">{t.vehicleReg}</span>
    )},
    { header: 'Driver', accessor: 'driverName' as keyof Trip },
    { header: 'Cargo',  accessor: 'cargo' as keyof Trip },
    { header: 'Status', accessor: (t: Trip) => <StatusBadge status={t.status} /> },
    { header: 'Revenue', accessor: (t: Trip) => (
      <span className="text-emerald-400 font-medium">₹{t.revenue.toLocaleString()}</span>
    )},
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 text-center mt-12">{error}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of your fleet operations</p>
      </div>

      {/* Stat Cards Row 1 */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Active Vehicles"
          value={stats.activeVehicles}
          icon={<MdDirectionsBus size={22} />}
          color="emerald"
          subtitle={`of ${totalVehicles} total`}
          trend={{ value: 8, label: 'vs last month' }}
        />
        <StatCard
          title="Available Vehicles"
          value={stats.availableVehicles}
          icon={<MdCheckCircle size={22} />}
          color="blue"
          subtitle="ready for dispatch"
        />
        <StatCard
          title="In Maintenance"
          value={stats.vehiclesInMaintenance}
          icon={<MdBuild size={22} />}
          color="amber"
          subtitle="vehicles offline"
        />
        <StatCard
          title="Drivers On Duty"
          value={stats.driversOnDuty}
          icon={<MdPeople size={22} />}
          color="purple"
          subtitle="currently active"
        />
      </div>

      {/* Stat Cards Row 2 */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Active Trips"
          value={stats.activeTrips}
          icon={<MdRoute size={22} />}
          color="cyan"
          subtitle="in progress"
        />
        <StatCard
          title="Pending Trips"
          value={stats.pendingTrips}
          icon={<MdPending size={22} />}
          color="amber"
          subtitle="awaiting dispatch"
        />
        <StatCard
          title="Fleet Utilization"
          value={`${stats.fleetUtilization}%`}
          icon={<MdSpeed size={22} />}
          color="blue"
          trend={{ value: -3, label: 'vs last month' }}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${(stats.totalRevenue / 1000).toFixed(0)}K`}
          icon={<MdAttachMoney size={22} />}
          color="emerald"
          subtitle="this month"
          trend={{ value: 12, label: 'vs last month' }}
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Vehicle Status Breakdown */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-base font-semibold text-slate-200 mb-4">Vehicle Status</h2>
          <div className="space-y-3">
            {vehicleStatusData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-medium text-slate-300">{item.count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: totalVehicles ? `${(item.count / totalVehicles) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Fleet Utilization</span>
              <span className="font-bold text-blue-400">{stats.fleetUtilization}%</span>
            </div>
          </div>
        </div>

        {/* Fuel Usage Placeholder */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-base font-semibold text-slate-200 mb-4">Fuel Usage (Jul)</h2>
          <div className="flex items-end gap-1.5 h-28">
            {[65, 80, 55, 90, 70, 85, 60].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm bg-gradient-to-t from-blue-600 to-cyan-500 opacity-80"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-600">
            {['M','T','W','T','F','S','S'].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between text-xs">
            <span className="text-slate-500">This week</span>
            <span className="text-blue-400 font-medium">600 Liters</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-base font-semibold text-slate-200 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            {[
              { label: 'Trips Completed (Jul)', value: '12',       color: 'text-emerald-400' },
              { label: 'Avg Safety Score',      value: '85/100',   color: 'text-blue-400' },
              { label: 'Overdue Maintenance',   value: '1',        color: 'text-red-400' },
              { label: 'Fuel Cost (Jul)',        value: '₹55.5K',  color: 'text-amber-400' },
              { label: 'Total Distance (Jul)',   value: '2,390 km', color: 'text-purple-400' },
            ].map((s) => (
              <div key={s.label} className="flex justify-between text-sm">
                <span className="text-slate-500">{s.label}</span>
                <span className={`font-semibold ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Trips */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-base font-semibold text-slate-200 mb-4">Recent Trips</h2>
        <Table
          columns={tripColumns}
          data={recentTrips}
          keyExtractor={(t) => t.id}
        />
      </div>
    </div>
  );
};

export default Dashboard;
