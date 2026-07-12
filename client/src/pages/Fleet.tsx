import React, { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdDirectionsBus } from 'react-icons/md';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import StatusBadge from '../components/ui/StatusBadge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useVehicles } from '../hooks/useVehicles';
import type { Vehicle, VehicleStatus, VehicleType } from '../types';

const Fleet: React.FC = () => {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useVehicles();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState<Partial<Vehicle>>({
    registrationNumber: '', make: '', model: '', year: 2024,
    type: 'Truck', capacity: 10, status: 'Available', fuelType: 'Diesel',
    lastService: new Date().toISOString().slice(0, 10), mileage: 0,
  });

  const filtered = vehicles.filter(
    (v) =>
      v.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.make.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.type.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({
      registrationNumber: '', make: '', model: '', year: 2024,
      type: 'Truck', capacity: 10, status: 'Available', fuelType: 'Diesel',
      lastService: new Date().toISOString().slice(0, 10), mileage: 0,
    });
    setShowAddModal(true);
  };

  const openEdit = (v: Vehicle) => {
    setForm({ ...v });
    setEditVehicle(v);
  };

  const handleSave = () => {
    if (editVehicle) {
      updateVehicle(editVehicle.id, form);
      setEditVehicle(null);
    } else {
      addVehicle({ ...form, id: `v${Date.now()}` } as Vehicle);
      setShowAddModal(false);
    }
  };

  const handleDelete = () => {
    if (deleteId) { deleteVehicle(deleteId); setDeleteId(null); }
  };

  const columns = [
    { header: 'Reg. Number', accessor: (v: Vehicle) => (
      <span className="font-mono text-xs bg-slate-700 px-2 py-1 rounded font-semibold text-slate-200">{v.registrationNumber}</span>
    )},
    { header: 'Vehicle', accessor: (v: Vehicle) => (
      <div>
        <p className="font-medium text-slate-200">{v.make} {v.model}</p>
        <p className="text-xs text-slate-500">{v.year} · {v.fuelType}</p>
      </div>
    )},
    { header: 'Type', accessor: 'type' as keyof Vehicle },
    { header: 'Capacity', accessor: (v: Vehicle) => `${v.capacity}T` },
    { header: 'Mileage', accessor: (v: Vehicle) => `${v.mileage.toLocaleString()} km` },
    { header: 'Last Service', accessor: 'lastService' as keyof Vehicle },
    { header: 'Status', accessor: (v: Vehicle) => <StatusBadge status={v.status} /> },
    {
      header: 'Actions',
      accessor: (v: Vehicle) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" icon={<MdEdit size={14} />} onClick={() => openEdit(v)}>Edit</Button>
          <Button size="sm" variant="danger" icon={<MdDelete size={14} />} onClick={() => setDeleteId(v.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  const formModal = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input id="reg" label="Registration Number" value={form.registrationNumber ?? ''} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} placeholder="MH-01-AB-1234" />
        <Input id="make" label="Make" value={form.make ?? ''} onChange={(e) => setForm({ ...form, make: e.target.value })} placeholder="Tata" />
        <Input id="model" label="Model" value={form.model ?? ''} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="Prima" />
        <Input id="year" label="Year" type="number" value={form.year ?? 2024} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-300">Type</label>
          <select className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
            value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as VehicleType })}>
            {['Truck','Van','Bus','Pickup','Tanker','Trailer'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <Input id="capacity" label="Capacity (Tons)" type="number" value={form.capacity ?? 0} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-300">Status</label>
          <select className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
            value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as VehicleStatus })}>
            {['Active','Available','In Maintenance','Inactive'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-300">Fuel Type</label>
          <select className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
            value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })}>
            {['Diesel','Petrol','CNG','Electric'].map(f => <option key={f}>{f}</option>)}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Fleet</h1>
          <p className="text-sm text-slate-500 mt-1">{vehicles.length} vehicles registered</p>
        </div>
        <Button variant="primary" icon={<MdAdd size={18} />} onClick={openAdd}>
          Add Vehicle
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Active', count: vehicles.filter(v => v.status === 'Active').length, color: 'text-emerald-400' },
          { label: 'Available', count: vehicles.filter(v => v.status === 'Available').length, color: 'text-blue-400' },
          { label: 'In Maintenance', count: vehicles.filter(v => v.status === 'In Maintenance').length, color: 'text-amber-400' },
          { label: 'Inactive', count: vehicles.filter(v => v.status === 'Inactive').length, color: 'text-slate-400' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 flex items-center gap-3">
            <MdDirectionsBus size={24} className={s.color} />
            <div>
              <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search vehicles..." className="w-72" />
        <span className="text-sm text-slate-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <Table columns={columns} data={filtered} keyExtractor={(v) => v.id} emptyMessage="No vehicles found." />

      {/* Add Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Vehicle" size="lg"
        footer={<><Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button><Button onClick={handleSave}>Save Vehicle</Button></>}>
        {formModal}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editVehicle} onClose={() => setEditVehicle(null)} title="Edit Vehicle" size="lg"
        footer={<><Button variant="ghost" onClick={() => setEditVehicle(null)}>Cancel</Button><Button onClick={handleSave}>Update Vehicle</Button></>}>
        {formModal}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Vehicle"
        message="Are you sure you want to delete this vehicle? This action cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
};

export default Fleet;
