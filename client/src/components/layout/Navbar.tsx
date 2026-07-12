import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdLogout, MdNotifications, MdDirectionsBus } from 'react-icons/md';
import { useAuth } from '../../hooks/useAuth';

const breadcrumbMap: Record<string, string> = {
  '/dashboard':   'Dashboard',
  '/fleet':       'Fleet',
  '/drivers':     'Drivers',
  '/trips':       'Trips',
  '/maintenance': 'Maintenance',
  '/fuel':        'Fuel & Expenses',
  '/analytics':   'Analytics',
  '/settings':    'Settings',
};

const roleColors: Record<string, string> = {
  Admin:              'bg-red-500/20 text-red-300',
  'Fleet Manager':    'bg-blue-500/20 text-blue-300',
  Driver:             'bg-emerald-500/20 text-emerald-300',
  'Safety Officer':   'bg-amber-500/20 text-amber-300',
  'Financial Analyst':'bg-purple-500/20 text-purple-300',
};

const Navbar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const pageTitle = breadcrumbMap[location.pathname] ?? 'TransitOps';

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() ?? 'U';

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-700/50 bg-slate-900/80 px-6 backdrop-blur-sm">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <MdDirectionsBus className="text-blue-400" size={16} />
        <span className="text-slate-500">TransitOps</span>
        <span className="text-slate-600">/</span>
        <span className="font-medium text-slate-200">{pageTitle}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative text-slate-400 hover:text-slate-200 transition-colors">
          <MdNotifications size={22} />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* Role Badge */}
        {role && (
          <span className={`hidden sm:inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${roleColors[role] ?? 'bg-slate-700 text-slate-300'}`}>
            {role}
          </span>
        )}

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
            {initials}
          </div>
          <span className="hidden text-sm font-medium text-slate-300 md:block">{user?.name}</span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          title="Logout"
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all"
        >
          <MdLogout size={16} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
