import React, { useState } from 'react';
import { MdAdd, MdDelete, MdLocationOn, MdLocalShipping } from 'react-icons/md';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import StatusBadge from '../components/ui/StatusBadge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { useTrips } from '../hooks/useTrips';
import type { Trip } from '../types';

const Trips: React.FC = () => {
  const { trips, deleteTrip } = useTrips();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const statuses = ['All', 'Active', 'Pending', 'Completed', 'Cancelled', 'Delayed'];

  const filtered = trips.filter((t) => {
    const matchSearch =
      t.source.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase()) ||
      t.driverName.toLowerCase().includes(search.toLowerCase()) ||
      t.vehicleReg.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns = [
    {
      header: 'Route',
      accessor: (t: Trip) => (
        <div className="flex items-center gap-2">
          <MdLocationOn size={14} className="text-blue-400 flex-shrink-0" />
          <div>
            <p className="font-medium text-slate-200 text-sm">{t.source}</p>
            <p className="text-xs text-slate-500">→ {t.destination}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Vehicle',
      accessor: (t: Trip) => (
        <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded text-slate-200">{t.vehicleReg}</span>
      ),
    },
    { header: 'Driver', accessor: 'driverName' as keyof Trip },
    {
      header: 'Cargo',
      accessor: (t: Trip) => (
        <div className="flex items-center gap-1.5">
          <MdLocalShipping size={12} className="text-slate-500" />
          <span className="text-sm">{t.cargo}</span>
          <span className="text-xs text-slate-500">({t.cargoWeight}T)</span>
        </div>
      ),
    },
    { header: 'Distance', accessor: (t: Trip) => `${t.distance} km` },
    { header: 'Start Date', accessor: 'startDate' as keyof Trip },
    { header: 'Status', accessor: (t: Trip) => <StatusBadge status={t.status} /> },
    {
      header: 'Revenue',
      accessor: (t: Trip) => (
        <span className={t.status === 'Cancelled' ? 'text-slate-500' : 'text-emerald-400 font-medium'}>
          {t.status === 'Cancelled' ? '—' : `₹${t.revenue.toLocaleString()}`}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (t: Trip) => (
        <Button size="sm" variant="danger" icon={<MdDelete size={14} />} onClick={() => setDeleteId(t.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Trips</h1>
          <p className="text-sm text-slate-500 mt-1">{trips.length} total trips</p>
        </div>
        <Button variant="primary" icon={<MdAdd size={18} />}>New Trip</Button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
        {['Active','Pending','Completed','Cancelled','Delayed'].map(status => (
          <div key={status} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
            <p className="text-2xl font-bold text-slate-100">
              {trips.filter(t => t.status === status).length}
            </p>
            <p className="text-xs text-slate-500 mt-1">{status}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search trips..." className="w-72" />
        <div className="flex gap-2 flex-wrap">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${
                statusFilter === s
                  ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                  : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="text-sm text-slate-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <Table columns={columns} data={filtered} keyExtractor={(t) => t.id} emptyMessage="No trips found." />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { if (deleteId) { deleteTrip(deleteId); setDeleteId(null); } }}
        title="Delete Trip"
        message="Are you sure you want to delete this trip record? This action cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
};

export default Trips;
