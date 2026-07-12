import React from 'react';
import { MdBarChart, MdTrendingUp, MdBuild, MdLocalGasStation } from 'react-icons/md';
import Loader from '../components/ui/Loader';
import { useAnalytics } from '../hooks/useAnalytics';
import type { TripStatData } from '../types';

const BarChart: React.FC<{ data: number[]; labels: string[]; color: string; maxValue?: number }> = ({
  data, labels, color, maxValue,
}) => {
  const max = maxValue ?? Math.max(...data);
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className={`w-full rounded-t-sm ${color} opacity-80 hover:opacity-100 transition-opacity`}
            style={{ height: `${(val / max) * 100}%`, minHeight: '4px' }}
            title={`${labels[i]}: ${val}`}
          />
          <span className="text-xs text-slate-600">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
};

const StackedTripChart: React.FC<{ data: TripStatData[] }> = ({ data }) => {
  const maxVal = Math.max(...data.map(x => x.completed + x.pending + x.cancelled));
  return (
    <div className="flex items-end gap-3 h-32">
      {data.map((d) => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full flex flex-col-reverse rounded-t-sm overflow-hidden"
            style={{ height: `${((d.completed + d.pending + d.cancelled) / maxVal) * 100}%`, minHeight: '8px' }}
          >
            <div className="bg-emerald-500 flex-grow" style={{ flexGrow: d.completed }} title={`Completed: ${d.completed}`} />
            <div className="bg-amber-500"             style={{ flexGrow: d.pending }}   title={`Pending: ${d.pending}`} />
            <div className="bg-red-500"               style={{ flexGrow: d.cancelled }} title={`Cancelled: ${d.cancelled}`} />
          </div>
          <span className="text-xs text-slate-600">{d.month}</span>
        </div>
      ))}
    </div>
  );
};

const Analytics: React.FC = () => {
  const {
    fleetUtilization,
    fuelCosts,
    tripStats,
    maintenanceCosts,
    insights,
    loading,
    error,
  } = useAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" text="Loading analytics..." />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 text-center mt-12">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Fleet performance insights and trends</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Avg Fleet Utilization', value: '71%',    change: '+3%', icon: <MdBarChart size={20} />,         color: 'text-blue-400',    bg: 'bg-blue-500/10' },
          { label: 'Total Trips (2026)',     value: '312',    change: '+18%',icon: <MdTrendingUp size={20} />,       color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Maintenance Cost',       value: '₹1.6L', change: '-5%', icon: <MdBuild size={20} />,            color: 'text-amber-400',   bg: 'bg-amber-500/10' },
          { label: 'Fuel Cost (YTD)',        value: '₹11.9L',change: '+8%', icon: <MdLocalGasStation size={20} />,  color: 'text-cyan-400',    bg: 'bg-cyan-500/10' },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-100 mt-2">{kpi.value}</p>
                <p className={`text-xs mt-1 font-medium ${kpi.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {kpi.change} vs last year
                </p>
              </div>
              <div className={`${kpi.bg} ${kpi.color} p-2.5 rounded-lg`}>{kpi.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-1">Fleet Utilization (%)</h2>
          <p className="text-xs text-slate-500 mb-5">Monthly fleet utilization rate</p>
          <BarChart
            data={fleetUtilization.map(d => d.utilization)}
            labels={fleetUtilization.map(d => d.month)}
            color="bg-blue-500"
            maxValue={100}
          />
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-1">Fuel Cost (₹)</h2>
          <p className="text-xs text-slate-500 mb-5">Monthly fuel expenditure</p>
          <BarChart
            data={fuelCosts.map(d => d.cost)}
            labels={fuelCosts.map(d => d.month)}
            color="bg-cyan-500"
          />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-1">Trip Statistics</h2>
          <p className="text-xs text-slate-500 mb-5">Completed vs Pending vs Cancelled</p>
          <StackedTripChart data={tripStats} />
          <div className="flex gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500 inline-block" />Completed</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-amber-500 inline-block" />Pending</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-red-500 inline-block" />Cancelled</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-sm font-semibold text-slate-300 mb-1">Maintenance Cost by Type</h2>
          <p className="text-xs text-slate-500 mb-5">Cost breakdown per service type</p>
          <div className="space-y-3">
            {maintenanceCosts.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-medium text-slate-300">₹{item.cost.toLocaleString()}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-700">
                  <div
                    className={`h-1.5 rounded-full ${item.color}`}
                    style={{ width: `${(item.cost / (maintenanceCosts[0]?.cost ?? 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {insights.map((insight) => (
          <div key={insight.title} className={`rounded-xl border p-4 ${insight.color}`}>
            <p className="text-xs text-slate-500 uppercase tracking-wider">{insight.title}</p>
            <p className="text-base font-bold text-slate-200 mt-2">{insight.value}</p>
            <p className="text-xs text-slate-500 mt-1">{insight.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
