import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdDirectionsBus,
  MdPeople,
  MdRoute,
  MdBuild,
  MdLocalGasStation,
  MdBarChart,
  MdSettings,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard',      icon: <MdDashboard size={20} />,       path: '/dashboard' },
  { label: 'Fleet',          icon: <MdDirectionsBus size={20} />,   path: '/fleet' },
  { label: 'Drivers',        icon: <MdPeople size={20} />,          path: '/drivers' },
  { label: 'Trips',          icon: <MdRoute size={20} />,           path: '/trips' },
  { label: 'Maintenance',    icon: <MdBuild size={20} />,           path: '/maintenance' },
  { label: 'Fuel & Expenses',icon: <MdLocalGasStation size={20} />, path: '/fuel' },
  { label: 'Analytics',      icon: <MdBarChart size={20} />,        path: '/analytics' },
  { label: 'Settings',       icon: <MdSettings size={20} />,        path: '/settings' },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`relative flex flex-col bg-slate-900 border-r border-slate-700/50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      } min-h-screen shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700/50">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <MdDirectionsBus size={18} className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-white tracking-tight">
            Transit<span className="text-blue-400">Ops</span>
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors"
      >
        {collapsed ? <MdChevronRight size={14} /> : <MdChevronLeft size={14} />}
      </button>

      {/* Version */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-slate-700/50">
          <p className="text-xs text-slate-600">TransitOps v1.0.0</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
