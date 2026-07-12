import React, { useState } from 'react';
import { MdPerson, MdLock, MdPalette, MdNotifications, MdSave, MdBusiness } from 'react-icons/md';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

type SettingsTab = 'profile' | 'password' | 'theme' | 'notifications' | 'app';

const Settings: React.FC = () => {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    tripAlerts: true,
    maintenanceDue: true,
    fuelAlerts: false,
    driverAlerts: true,
  });
  const [saved, setSaved] = useState(false);

  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile',       label: 'Profile',       icon: <MdPerson size={16} /> },
    { id: 'password',      label: 'Password',      icon: <MdLock size={16} /> },
    { id: 'theme',         label: 'Theme',         icon: <MdPalette size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <MdNotifications size={16} /> },
    { id: 'app',           label: 'Application',   icon: <MdBusiness size={16} /> },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-48 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="flex-1 rounded-xl border border-slate-700 bg-slate-800/60 p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-slate-200">Profile Information</h2>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl font-bold text-white">
                  {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-slate-200">{user?.name}</p>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                  <span className="inline-block mt-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs text-blue-300">{role}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input id="firstName" label="First Name" defaultValue={user?.name.split(' ')[0]} />
                <Input id="lastName" label="Last Name" defaultValue={user?.name.split(' ')[1]} />
                <Input id="email" label="Email Address" type="email" defaultValue={user?.email} />
                <Input id="phone" label="Phone Number" placeholder="+91 9876543210" />
                <div className="col-span-2">
                  <label className="text-sm font-medium text-slate-300 block mb-1">Department</label>
                  <input
                    defaultValue="Operations"
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <Button icon={<MdSave size={16} />} onClick={handleSave} loading={saved}>
                {saved ? 'Saved!' : 'Save Changes'}
              </Button>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="space-y-6 max-w-sm">
              <h2 className="text-base font-semibold text-slate-200">Change Password</h2>
              <Input id="currentPwd" type="password" label="Current Password" placeholder="••••••••" />
              <Input id="newPwd" type="password" label="New Password" placeholder="••••••••" />
              <Input id="confirmPwd" type="password" label="Confirm New Password" placeholder="••••••••" />
              <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-xs text-slate-400">
                <p className="font-medium text-slate-300 mb-2">Password requirements:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Minimum 8 characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                </ul>
              </div>
              <Button icon={<MdSave size={16} />} onClick={handleSave}>Update Password</Button>
            </div>
          )}

          {/* Theme Tab */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-slate-200">Appearance</h2>
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-800/40">
                <div>
                  <p className="font-medium text-slate-200">Dark Mode</p>
                  <p className="text-sm text-slate-500">Use dark theme across the application</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-slate-600'}`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-300">Accent Color</p>
                <div className="flex gap-3">
                  {[
                    { name: 'Blue', cls: 'bg-blue-500', active: true },
                    { name: 'Emerald', cls: 'bg-emerald-500', active: false },
                    { name: 'Purple', cls: 'bg-purple-500', active: false },
                    { name: 'Orange', cls: 'bg-orange-500', active: false },
                    { name: 'Rose', cls: 'bg-rose-500', active: false },
                  ].map((c) => (
                    <button
                      key={c.name}
                      title={c.name}
                      className={`h-8 w-8 rounded-full ${c.cls} ${c.active ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800' : 'opacity-70 hover:opacity-100'} transition-all`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-slate-200">Notification Preferences</h2>
              <div className="space-y-4">
                {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => {
                  const labels: Record<string, string> = {
                    tripAlerts: 'Trip Status Alerts',
                    maintenanceDue: 'Maintenance Due Reminders',
                    fuelAlerts: 'Low Fuel Alerts',
                    driverAlerts: 'Driver Status Changes',
                  };
                  const descs: Record<string, string> = {
                    tripAlerts: 'Get notified when trip status changes',
                    maintenanceDue: 'Receive reminders for upcoming maintenance',
                    fuelAlerts: 'Alert when vehicle fuel level is low',
                    driverAlerts: 'Notify when driver status is updated',
                  };
                  return (
                    <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-800/40">
                      <div>
                        <p className="font-medium text-slate-200">{labels[key]}</p>
                        <p className="text-sm text-slate-500">{descs[key]}</p>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                        className={`relative h-6 w-11 rounded-full transition-colors ${notifications[key] ? 'bg-blue-600' : 'bg-slate-600'}`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${notifications[key] ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              <Button icon={<MdSave size={16} />} onClick={handleSave}>Save Preferences</Button>
            </div>
          )}

          {/* App Tab */}
          {activeTab === 'app' && (
            <div className="space-y-6">
              <h2 className="text-base font-semibold text-slate-200">Application Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-300">Currency</label>
                  <select className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-300">Distance Unit</label>
                  <select className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500">
                    <option>Kilometers (km)</option>
                    <option>Miles (mi)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-300">Fuel Unit</label>
                  <select className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500">
                    <option>Liters (L)</option>
                    <option>Gallons (gal)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-300">Date Format</label>
                  <select className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-blue-500">
                    <option>DD-MM-YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-4">
                <p className="text-sm font-medium text-slate-300">About TransitOps</p>
                <p className="text-xs text-slate-500 mt-1">Version 1.0.0 · Built with React 19 + TypeScript</p>
                <p className="text-xs text-slate-600 mt-0.5">Backend integration pending</p>
              </div>
              <Button icon={<MdSave size={16} />} onClick={handleSave}>Save Settings</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
