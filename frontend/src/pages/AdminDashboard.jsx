import React, { useEffect } from 'react';
import { useInsurance } from '../context/InsuranceContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { downloadCSV, downloadPDF } from '../utils/exportUtils';


const AdminDashboard = () => {
  const { metrics, chartData, token } = useInsurance();

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Cyber Gradient Header Banner */}
      <div className="bg-gradient-to-br from-[#0b1329] via-[#101c38] to-[#0a1931] text-white border border-blue-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>
        <span className="material-symbols-outlined absolute right-6 bottom-6 text-[110px] text-white/[0.04] pointer-events-none">analytics</span>
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30 shrink-0">
            <span className="material-symbols-outlined text-[32px] text-white">analytics</span>
          </div>
          <div>
            <h1 className="text-[28px] font-extrabold text-white tracking-tight">Business Performance Dashboard</h1>
            <p className="text-[14px] text-slate-300 mt-1">Real-time overview of revenue, claims velocity, and active policy portfolios</p>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button className="bg-white/10 border border-white/20 text-white text-[12px] font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all backdrop-blur-md">
            <span className="material-symbols-outlined text-[18px] text-cyan-400">calendar_today</span>
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
          }} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2.5 rounded-xl text-[12px] font-bold hover:bg-white/20 transition-all backdrop-blur-md active:scale-95 duration-100">
            <span className="material-symbols-outlined text-[18px] text-blue-400">table_view</span>
            Export CSV
          </button>
          <button onClick={() => {
            downloadPDF('Admin_Report.pdf', '/api/export/report', token);
          }} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl text-[12px] font-extrabold tracking-wide hover:shadow-lg hover:shadow-blue-600/30 border border-blue-400/30 transition-all active:scale-95 duration-100">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export PDF
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { 
            title: 'Active Policies', 
            value: metrics.activePolicies.value.toLocaleString(), 
            trend: `+${metrics.activePolicies.trend}%`, 
            icon: 'policy', 
            bgGradient: 'from-[#0058be] via-[#004395] to-[#00285a]',
            border: 'border-blue-400/30',
            shadow: 'shadow-blue-600/20 hover:shadow-blue-500/30',
            iconBg: 'bg-white/15 text-white border border-white/20',
            trendBg: 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
          },
          { 
            title: 'Claim Statistics', 
            value: `${metrics.pendingClaims.value} Pending`, 
            trend: `${metrics.pendingClaims.trend}%`, 
            icon: 'assignment_late', 
            bgGradient: 'from-[#4338ca] via-[#3730a3] to-[#1e1b4b]',
            border: 'border-indigo-400/30',
            shadow: 'shadow-indigo-600/20 hover:shadow-indigo-500/30',
            iconBg: 'bg-amber-500/20 text-amber-300 border border-amber-400/30',
            trendBg: 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
          },
          { 
            title: 'Premium Collection', 
            value: metrics.premiumCollection.value >= 1000000 ? `$${(metrics.premiumCollection.value / 1000000).toFixed(1)}M` : metrics.premiumCollection.value >= 1000 ? `$${(metrics.premiumCollection.value / 1000).toFixed(1)}k` : `$${metrics.premiumCollection.value.toLocaleString()}`, 
            trend: `+${metrics.premiumCollection.trend}%`, 
            icon: 'payments', 
            bgGradient: 'from-[#0284c7] via-[#0369a1] to-[#0c4a6e]',
            border: 'border-sky-400/30',
            shadow: 'shadow-sky-600/20 hover:shadow-sky-500/30',
            iconBg: 'bg-white/15 text-sky-200 border border-white/20',
            trendBg: 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
          },
          { 
            title: 'Customer Growth', 
            value: `+${metrics.customerGrowth.value.toLocaleString()}`, 
            trend: `+${metrics.customerGrowth.trend}%`, 
            icon: 'person_add', 
            bgGradient: 'from-[#2563eb] via-[#1d4ed8] to-[#1e40af]',
            border: 'border-blue-300/30',
            shadow: 'shadow-blue-600/20 hover:shadow-blue-500/30',
            iconBg: 'bg-white/15 text-blue-100 border border-white/20',
            trendBg: 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
          }
        ].map((kpi, idx) => (
          <div key={idx} className={`relative overflow-hidden bg-gradient-to-br ${kpi.bgGradient} border ${kpi.border} p-6 rounded-2xl shadow-xl ${kpi.shadow} transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group cursor-pointer`}>
            {/* Glowing Orb & Watermark Icon */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:bg-white/20 transition-all duration-500"></div>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-[88px] text-white/[0.08] pointer-events-none group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">{kpi.icon}</span>
            
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl backdrop-blur-md shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${kpi.iconBg}`}>
                <span className="material-symbols-outlined text-[24px]">{kpi.icon}</span>
              </div>
              <span className={`${kpi.trendBg} text-[11px] font-bold flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm`}>
                <span className="material-symbols-outlined text-[14px]">{kpi.trend.startsWith('+') ? 'trending_up' : 'trending_down'}</span>
                {kpi.trend.replace('+', '').replace('-', '')}
              </span>
            </div>
            
            <div className="relative z-10">
              <p className="text-white/80 text-[12px] font-semibold uppercase tracking-wider">{kpi.title}</p>
              <h3 className="text-[32px] font-extrabold text-white mt-1.5 tracking-tight drop-shadow-sm">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#0b1329] via-[#101c38] to-[#0a1931] text-white border border-blue-500/30 rounded-2xl p-6 shadow-2xl shadow-blue-950/40 relative overflow-hidden group">
          {/* Glowing Ambient Light Orbs & Watermark Icon */}
          <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700"></div>
          <span className="material-symbols-outlined absolute right-4 bottom-4 text-[120px] text-white/[0.04] pointer-events-none group-hover:scale-105 group-hover:-rotate-6 transition-all duration-700">monitoring</span>

          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-[20px] font-bold text-white tracking-tight flex items-center gap-2.5">
                <div className="p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-[20px]">insights</span>
                </div>
                Monthly Business Reports
              </h3>
              <p className="text-[12px] text-slate-300 mt-1 pl-1">Real-time revenue & claims analytics across all regions</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-blue-500/15 border border-blue-400/30 text-blue-200 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm shadow-sm">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                Premium
              </div>
              <div className="bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-sm shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                Claims
              </div>
            </div>
          </div>
          <div className="h-[300px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="premiumBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.25} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.4} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} tickFormatter={(val) => val.toUpperCase()} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#60a5fa', fontSize: 11, fontWeight: 600}} tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#34d399', fontSize: 11, fontWeight: 600}} tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} />
                <Tooltip 
                  cursor={{fill: 'rgba(255, 255, 255, 0.05)'}} 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid rgba(96, 165, 250, 0.3)', color: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', fontSize: '12px', fontWeight: 600 }} 
                  formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)}
                />
                <Bar yAxisId="left" dataKey="premium" name="Premium" fill="url(#premiumBar)" radius={[6, 6, 0, 0]} barSize={38} />
                <Line yAxisId="left" type="monotone" dataKey="premium" name="Premium Trend" stroke="#38bdf8" strokeWidth={3} dot={{r: 4, fill: '#38bdf8', strokeWidth: 2, stroke: '#0f172a'}} activeDot={{r: 6, fill: '#fff', stroke: '#0284c7', strokeWidth: 2}} />
                <Line yAxisId="right" type="monotone" dataKey="claims" name="Claims" stroke="#34d399" strokeWidth={2.5} strokeDasharray="5 5" dot={{r: 4, fill: '#34d399', strokeWidth: 2, stroke: '#0f172a'}} activeDot={{r: 6, fill: '#fff', stroke: '#059669', strokeWidth: 2}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#111c2d] text-white border border-slate-700/50 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500"></div>
          <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-[100px] text-white/[0.05] pointer-events-none group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">dns</span>
          <div className="relative z-10">
            <h3 className="text-[20px] font-bold mb-1 text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              System Status
            </h3>
            <p className="text-[13px] text-slate-300">All services are operating normally.</p>
          </div>
          <div className="space-y-4 mt-8 relative z-10">
            <div className="flex justify-between items-center p-3.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                <span className="text-[14px] font-semibold text-slate-100">Claims Engine</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">Online</span>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                <span className="text-[14px] font-semibold text-slate-100">Payment Gateway</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">Online</span>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-400">warning</span>
                <span className="text-[14px] font-semibold text-slate-100">Document Storage</span>
              </div>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">85% Full</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
