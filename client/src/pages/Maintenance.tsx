import React, { useState } from 'react';
import { MdAdd, MdCheckCircle, MdBuild } from 'react-icons/md';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import StatusBadge from '../components/ui/StatusBadge';
import Loader from '../components/ui/Loader';
import { useMaintenance } from '../hooks/useMaintenance';
import type { MaintenanceRecord } from '../types';

const Maintenance: React.FC = () => {
  const { records, loading, error, completeMaintenance } = useMaintenance();
  const [search, setSearch] = useState('');

  const filtered = records.filter(
    (r) =>
      r.vehicleReg.toLowerCase().includes(search.toLowerCase()) ||
      r.serviceType.toLowerCase().includes(search.toLowerCase()) ||
      r.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalCost = records
    .filter((r) => r.status === 'Completed')
    .reduce((sum, r) => sum + r.cost, 0);

  const columns = [
    {
      header: 'Vehicle',
      accessor: (r: MaintenanceRecord) => (
        <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded text-slate-200">{r.vehicleReg}</span>
      ),
    },
    { header: 'Service Type',    accessor: 'serviceType' as keyof MaintenanceRecord },
    { header: 'Scheduled Date',  accessor: 'scheduledDate' as keyof MaintenanceRecord },
    {
      header: 'Completed Date',
      accessor: (r: MaintenanceRecord) => (
        <span className={r.completedDate ? 'text-emerald-400' : 'text-slate-500'}>
          {r.completedDate ?? '—'}
        </span>
      ),
    },
    { header: 'Technician', accessor: 'technician' as keyof MaintenanceRecord },
    {
      header: 'Cost',
      accessor: (r: MaintenanceRecord) => (
        <span className="font-medium text-slate-200">₹{r.cost.toLocaleString()}</span>
      ),
    },
    { header: 'Status', accessor: (r: MaintenanceRecord) => <StatusBadge status={r.status} /> },
    {
      header: 'Actions',
      accessor: (r: MaintenanceRecord) => (
        <div className="flex gap-2">
          {(r.status === 'In Progress' || r.status === 'Scheduled' || r.status === 'Overdue') && (
            <Button
              size="sm"
              variant="success"
              icon={<MdCheckCircle size={14} />}
              onClick={() => completeMaintenance(r.id)}
            >
              Complete
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" text="Loading maintenance records..." />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 text-center mt-12">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Maintenance</h1>
          <p className="text-sm text-slate-500 mt-1">{records.length} maintenance records</p>
        </div>
        <Button variant="primary" icon={<MdAdd size={18} />}>Create Maintenance</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Scheduled',   count: records.filter(r => r.status === 'Scheduled').length,   color: 'text-blue-400',    icon: <MdBuild size={20} className="text-blue-400" /> },
          { label: 'In Progress', count: records.filter(r => r.status === 'In Progress').length, color: 'text-cyan-400',    icon: <MdBuild size={20} className="text-cyan-400" /> },
          { label: 'Completed',   count: records.filter(r => r.status === 'Completed').length,   color: 'text-emerald-400', icon: <MdCheckCircle size={20} className="text-emerald-400" /> },
          { label: 'Overdue',     count: records.filter(r => r.status === 'Overdue').length,     color: 'text-red-400',     icon: <MdBuild size={20} className="text-red-400" /> },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 flex items-center gap-3">
            {s.icon}
            <div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <SearchBar value={search} onChange={setSearch} placeholder="Search maintenance..." className="w-72" />
        <div className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm">
          <span className="text-slate-500">Total Completed Cost: </span>
          <span className="font-bold text-emerald-400">₹{totalCost.toLocaleString()}</span>
        </div>
      </div>

      <Table columns={columns} data={filtered} keyExtractor={(r) => r.id} emptyMessage="No maintenance records found." />

      {/* Notes Section */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-sm font-semibold text-slate-300 mb-3">Service Notes</h2>
        <div className="space-y-2">
          {filtered.slice(0, 3).map((r) => (
            <div key={r.id} className="flex gap-3 text-sm">
              <span className="font-mono text-xs text-blue-400 flex-shrink-0 mt-0.5">{r.vehicleReg}</span>
              <span className="text-slate-400">{r.notes}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
