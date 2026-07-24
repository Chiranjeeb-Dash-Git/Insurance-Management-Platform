import React from 'react';
import { useInsurance } from '../context/InsuranceContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { downloadCSV, downloadPDF } from '../utils/exportUtils';


const AdminDashboard = () => {
  const { metrics, chartData, token } = useInsurance();

  return (
    <div className="p-10 max-w-[1440px] mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-[32px] font-bold text-on-surface leading-tight tracking-tight">Business Performance Dashboard</h2>
          <p className="text-on-surface-variant text-[14px] mt-1">Real-time overview of metrics across the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-surface-container-lowest border border-outline-variant text-on-surface-variant text-[12px] font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-surface-container transition-all">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Last 30 Days
          </button>
          <button onClick={() => {
            const data = [
              ['Metric', 'Value'],
              ['Total Premium', `$${metrics.premiumCollection.value}`],
              ['Active Policies', metrics.activePolicies.value],
              ['Pending Claims', metrics.pendingClaims.value],
              ['Customer Growth', metrics.customerGrowth.value]
            ];
            downloadCSV(data, 'business_report.csv');
          }} className="flex items-center gap-2 bg-surface-container border border-outline-variant text-on-surface px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-surface-container-high transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined text-[18px]">table_view</span>
            Export CSV
          </button>
          <button onClick={() => {
            downloadPDF('Admin_Report.pdf', '/api/export/report', token);
          }} className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-surface-container-highest transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export PDF
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { title: 'Active Policies', value: metrics.activePolicies.value.toLocaleString(), trend: `+${metrics.activePolicies.trend}%`, icon: 'policy', color: 'primary' },
          { title: 'Claim Statistics', value: `${metrics.pendingClaims.value} Pending`, trend: `${metrics.pendingClaims.trend}%`, icon: 'assignment_late', color: 'error' },
          { title: 'Premium Collection', value: `$${(metrics.premiumCollection.value / 1000000).toFixed(1)}M`, trend: `+${metrics.premiumCollection.trend}%`, icon: 'payments', color: 'tertiary' },
          { title: 'Customer Growth', value: `+${metrics.customerGrowth.value.toLocaleString()}`, trend: `+${metrics.customerGrowth.trend}%`, icon: 'person_add', color: 'secondary' }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl transition-all hover:shadow-md group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-${kpi.color}/10 text-${kpi.color} rounded-lg`}>
                <span className="material-symbols-outlined">{kpi.icon}</span>
              </div>
              <span className={`text-${kpi.trend.startsWith('+') ? 'tertiary' : 'error'} text-[11px] font-medium flex items-center gap-1 bg-${kpi.trend.startsWith('+') ? 'tertiary' : 'error'}-fixed/20 px-2 py-0.5 rounded-full`}>
                <span className="material-symbols-outlined text-[14px]">{kpi.trend.startsWith('+') ? 'trending_up' : 'trending_down'}</span>
                {kpi.trend.replace('+', '').replace('-', '')}
              </span>
            </div>
            <p className="text-on-surface-variant text-[12px] font-semibold">{kpi.title}</p>
            <h3 className="text-[24px] font-bold text-on-surface mt-1">{kpi.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[20px] font-semibold">Monthly Business Reports</h3>
            <div className="flex gap-3">
              <div className="bg-primary-container/20 text-on-surface text-[11px] px-2 py-1 rounded flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Premium
              </div>
              <div className="bg-tertiary/10 text-on-surface text-[11px] px-2 py-1 rounded flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
                Claims
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e3e5" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#727785', fontSize: 10, fontWeight: 500}} tickFormatter={(val) => val.toUpperCase()} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e0e3e5', fontSize: '12px' }} />
                <Bar dataKey="premium" fill="#d1e4ff" radius={[4, 4, 0, 0]} barSize={40} />
                <Line type="monotone" dataKey="premium" stroke="#0058be" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="claims" stroke="#106d43" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-[20px] font-semibold mb-2">System Status</h3>
            <p className="text-[13px] text-on-surface-variant">All services are operating normally.</p>
          </div>
          <div className="space-y-4 mt-8">
            <div className="flex justify-between items-center p-3 bg-surface-container rounded-lg">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <span className="text-[14px] font-medium">Claims Engine</span>
              </div>
              <span className="text-[11px] font-medium text-tertiary">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-surface-container rounded-lg">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <span className="text-[14px] font-medium">Payment Gateway</span>
              </div>
              <span className="text-[11px] font-medium text-tertiary">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-surface-container rounded-lg">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error">warning</span>
                <span className="text-[14px] font-medium">Document Storage</span>
              </div>
              <span className="text-[11px] font-medium text-error">85% Full</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
