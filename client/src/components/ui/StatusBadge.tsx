import React from 'react';

type StatusType =
  | 'Active' | 'Available' | 'In Maintenance' | 'Inactive'
  | 'On Duty' | 'Off Duty' | 'On Leave' | 'Suspended'
  | 'Completed' | 'Pending' | 'Cancelled' | 'Delayed'
  | 'Scheduled' | 'In Progress' | 'Overdue';

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string }> = {
  Active:          { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  Available:       { bg: 'bg-blue-500/10',    text: 'text-blue-400',    dot: 'bg-blue-400' },
  'In Maintenance':{ bg: 'bg-amber-500/10',   text: 'text-amber-400',   dot: 'bg-amber-400' },
  Inactive:        { bg: 'bg-slate-500/10',   text: 'text-slate-400',   dot: 'bg-slate-400' },
  'On Duty':       { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  'Off Duty':      { bg: 'bg-slate-500/10',   text: 'text-slate-400',   dot: 'bg-slate-400' },
  'On Leave':      { bg: 'bg-purple-500/10',  text: 'text-purple-400',  dot: 'bg-purple-400' },
  Suspended:       { bg: 'bg-red-500/10',     text: 'text-red-400',     dot: 'bg-red-400' },
  Completed:       { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  Pending:         { bg: 'bg-amber-500/10',   text: 'text-amber-400',   dot: 'bg-amber-400' },
  Cancelled:       { bg: 'bg-red-500/10',     text: 'text-red-400',     dot: 'bg-red-400' },
  Delayed:         { bg: 'bg-orange-500/10',  text: 'text-orange-400',  dot: 'bg-orange-400' },
  Scheduled:       { bg: 'bg-blue-500/10',    text: 'text-blue-400',    dot: 'bg-blue-400' },
  'In Progress':   { bg: 'bg-cyan-500/10',    text: 'text-cyan-400',    dot: 'bg-cyan-400' },
  Overdue:         { bg: 'bg-red-500/10',     text: 'text-red-400',     dot: 'bg-red-400' },
};

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const cfg = statusConfig[status] ?? { bg: 'bg-slate-500/10', text: 'text-slate-400', dot: 'bg-slate-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
