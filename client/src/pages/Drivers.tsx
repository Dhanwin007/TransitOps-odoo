import React, { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdStar } from 'react-icons/md';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import StatusBadge from '../components/ui/StatusBadge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { useDrivers } from '../hooks/useDrivers';
import type { Driver } from '../types';

const Drivers: React.FC = () => {
  const { drivers, deleteDriver } = useDrivers();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.licenseNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.status.toLowerCase().includes(search.toLowerCase())
  );

  const getSafetyColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 75) return 'text-blue-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const columns = [
    {
      header: 'Driver',
      accessor: (d: Driver) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-slate-200">{d.name}</p>
            <p className="text-xs text-slate-500">{d.email}</p>
          </div>
        </div>
      ),
    },
    { header: 'Phone', accessor: 'phone' as keyof Driver },
    {
      header: 'License',
      accessor: (d: Driver) => (
        <div>
          <p className="font-mono text-xs text-slate-300">{d.licenseNumber}</p>
          <p className="text-xs text-slate-500">Expires: {d.licenseExpiry}</p>
        </div>
      ),
    },
    { header: 'Status', accessor: (d: Driver) => <StatusBadge status={d.status} /> },
    {
      header: 'Safety Score',
      accessor: (d: Driver) => (
        <div className="flex items-center gap-1.5">
          <MdStar size={14} className={getSafetyColor(d.safetyScore)} />
          <span className={`font-bold ${getSafetyColor(d.safetyScore)}`}>{d.safetyScore}</span>
          <span className="text-slate-600 text-xs">/100</span>
        </div>
      ),
    },
    { header: 'Trips', accessor: (d: Driver) => (
      <span className="font-semibold text-slate-300">{d.tripsCompleted}</span>
    )},
    { header: 'Joined', accessor: 'joinedDate' as keyof Driver },
    {
      header: 'Actions',
      accessor: (d: Driver) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" icon={<MdEdit size={14} />}>Edit</Button>
          <Button size="sm" variant="danger" icon={<MdDelete size={14} />} onClick={() => setDeleteId(d.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Drivers</h1>
          <p className="text-sm text-slate-500 mt-1">{drivers.length} drivers registered</p>
        </div>
        <Button variant="primary" icon={<MdAdd size={18} />}>Add Driver</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'On Duty', count: drivers.filter(d => d.status === 'On Duty').length, color: 'text-emerald-400' },
          { label: 'Off Duty', count: drivers.filter(d => d.status === 'Off Duty').length, color: 'text-slate-400' },
          { label: 'On Leave', count: drivers.filter(d => d.status === 'On Leave').length, color: 'text-purple-400' },
          { label: 'Suspended', count: drivers.filter(d => d.status === 'Suspended').length, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search drivers..." className="w-72" />
        <span className="text-sm text-slate-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <Table columns={columns} data={filtered} keyExtractor={(d) => d.id} emptyMessage="No drivers found." />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { if (deleteId) { deleteDriver(deleteId); setDeleteId(null); } }}
        title="Remove Driver"
        message="Are you sure you want to remove this driver? This action cannot be undone."
        confirmLabel="Remove"
      />
    </div>
  );
};

export default Drivers;
