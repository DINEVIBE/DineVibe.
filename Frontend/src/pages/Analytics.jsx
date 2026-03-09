import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import "../styles/dashboard.css";

const revenueData = [
  { day: "Mon", revenue: 12000 }, { day: "Tue", revenue: 18000 },
  { day: "Wed", revenue: 15000 }, { day: "Thu", revenue: 22000 },
  { day: "Fri", revenue: 28000 }, { day: "Sat", revenue: 35000 },
  { day: "Sun", revenue: 30000 },
];

const reservationsData = [
  { day: "Mon", bookings: 20 }, { day: "Tue", bookings: 32 },
  { day: "Wed", bookings: 28 }, { day: "Thu", bookings: 40 },
  { day: "Fri", bookings: 55 }, { day: "Sat", bookings: 70 },
  { day: "Sun", bookings: 60 },
];

export default function Analytics() {
  return (
    <div className="dashboard-container">
      <div className="page-header-simple">
        <h2 className="text-3xl font-black text-slate-900">Analytics Insights</h2>
        <p className="text-slate-400 font-medium">Real-time performance tracking for Bella Vista Trattoria</p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="metrics-row">
        {[
          { label: 'Total Revenue', value: '₹ 1.6L', icon: DollarSign, c: 'text-orange-500', b: 'bg-orange-50', grow: '+12%' },
          { label: 'Reservations', value: '305', icon: Calendar, c: 'text-blue-500', b: 'bg-blue-50', grow: '+8%' },
          { label: 'Occupancy', value: '78%', icon: TrendingUp, c: 'text-green-500', b: 'bg-green-50', grow: '-2%' },
          { label: 'Active Staff', value: '14', icon: Users, c: 'text-purple-500', b: 'bg-purple-50', grow: 'Stable' },
        ].map((s) => (
          <div key={s.label} className="bg-white-card stat-item-card">
            <div className={`${s.b} ${s.c} stat-icon-box`}><s.icon size={20} /></div>
            <div className="stat-texts">
              <p className="stat-number">{s.value}</p>
              <p className="stat-label">{s.label} <span className="ml-1 opacity-70">({s.grow})</span></p>
            </div>
          </div>
        ))}
      </div>

      <div className="main-data-grid">
        {/* ================= REVENUE AREA CHART ================= */}
        <div className="bg-white-panel">
          <div className="panel-header mb-6">
            <h3 className="panel-title">Revenue Flow</h3>
            <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">Weekly</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ================= RESERVATION BAR CHART ================= */}
        <div className="bg-white-panel">
          <div className="panel-header mb-6">
            <h3 className="panel-title">Bookings</h3>
            <Calendar size={18} className="text-slate-300" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reservationsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none' }} />
              <Bar dataKey="bookings" radius={[6, 6, 0, 0]}>
                {reservationsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#34d399'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}