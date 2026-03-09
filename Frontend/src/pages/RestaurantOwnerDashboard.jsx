import React, { useState } from 'react';
import { 
  Star, TrendingUp, DollarSign, CalendarDays, ImageIcon, 
  Upload, Clock, MapPin, Phone, ChevronUp, ChevronDown 
} from 'lucide-react';

const reviews = [
  { id: 1, user: 'Alice M.', rating: 5, text: 'Absolutely incredible pasta! Will be back.', date: '2 days ago', avatar: 'A' },
  { id: 2, user: 'Brian T.', rating: 4, text: 'Great ambiance, service was a bit slow.', date: '4 days ago', avatar: 'B' },
  { id: 3, user: 'Chloe R.', rating: 5, text: 'Best tiramisu in the city. No question.', date: '1 week ago', avatar: 'C' },
];

const reservations = [
  { id: 1, name: 'Johnson Party', size: 4, time: '7:00 PM', date: 'Today', status: 'confirmed' },
  { id: 2, name: 'Smith x2', size: 2, time: '8:30 PM', date: 'Today', status: 'pending' },
  { id: 3, name: 'Wedding Anniv', size: 6, time: '6:00 PM', date: 'Tomorrow', status: 'confirmed' },
];

const revenueData = [
  { day: 'Mon', value: 1200 }, { day: 'Tue', value: 1800 },
  { day: 'Wed', value: 1500 }, { day: 'Thu', value: 2200 },
  { day: 'Fri', value: 3100 }, { day: 'Sat', value: 3800 },
  { day: 'Sun', value: 2900 },
];

const maxRev = Math.max(...revenueData.map(d => d.value));

export default function RestaurantOwnerDashboard({ user, activeTab }) {
  const [hours, setHours] = useState({ open: '11:00', close: '22:00' });

  // ── RENDER REVIEWS TAB ──
  if (activeTab === 'reviews') {
    return (
      <div className="dashboard-container max-w-4xl">
        <div className="page-header-simple">
          <h2 className="text-3xl font-black text-slate-900">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
            </div>
            <span className="font-bold text-slate-900">4.8</span>
            <span className="text-slate-400 font-medium">· 342 reviews</span>
          </div>
        </div>
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white flex items-center justify-center font-black text-sm shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">{r.user}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-500">
                      {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                    </div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{r.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">{r.text}</p>
              <button className="mt-4 text-xs text-orange-500 font-black uppercase tracking-widest hover:underline">Reply →</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── RENDER RESERVATIONS TAB ──
  if (activeTab === 'reservations') {
    return (
      <div className="dashboard-container max-w-4xl">
        <div className="page-header-simple">
          <h2 className="text-3xl font-black text-slate-900">Reservations</h2>
          <p className="text-slate-400 font-medium">3 upcoming today</p>
        </div>
        <div className="space-y-4">
          {reservations.map((res) => (
            <div key={res.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <CalendarDays size={24} />
              </div>
              <div className="flex-1">
                <p className="font-black text-slate-900 text-lg">{res.name}</p>
                <p className="text-slate-400 font-bold text-sm uppercase">{res.date} • {res.time} • Party of {res.size}</p>
              </div>
              <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${res.status === 'confirmed' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                {res.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── RENDER ANALYTICS TAB ──
  if (activeTab === 'analytics') {
    return (
      <div className="dashboard-container max-w-5xl">
        <h2 className="text-3xl font-black text-slate-900 mb-8">Analytics</h2>
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm mb-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="font-black text-slate-900 text-xl">Weekly Revenue</h3>
              <p className="text-slate-400 font-bold">Total: $16,500</p>
            </div>
            <TrendingUp size={24} className="text-orange-500" />
          </div>
          <div className="flex items-end gap-4 h-48">
            {revenueData.map(({ day, value }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-gradient-to-t from-orange-500 to-red-400 rounded-2xl transition-all hover:opacity-80 cursor-pointer"
                  style={{ height: `${(value / maxRev) * 100}%` }} />
                <span className="text-xs font-black text-slate-400 uppercase">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── DEFAULT OVERVIEW VIEW (Matching Image) ──
  return (
    <div className="dashboard-container">
      <div className="owner-gradient header-banner-refined">
        <div className="banner-main-content">
          <div className="greeting-area">
            <p className="welcome-tag">Restaurant Dashboard</p>
            <h2 className="user-display-name">{user?.username || 'test'}</h2>
            <p className="text-white/80 font-bold -mt-6">Bella Vista Trattoria • Italian</p>
          </div>

          <div className="flex gap-10 mt-6">
            <div className="flex flex-col">
              <span className="text-2xl font-black">4.8 ★</span>
              <span className="welcome-tag text-[10px]">Rating</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black">342</span>
              <span className="welcome-tag text-[10px]">Reviews</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black">3</span>
              <span className="welcome-tag text-[10px]">Today's Res</span>
            </div>
          </div>
        </div>
      </div>

      <div className="metrics-row">
        {[
          { label: 'Revenue Today', value: '$1,280', icon: DollarSign, b: 'bg-orange-50', c: 'text-orange-500' },
          { label: 'Reservations', value: '3', icon: CalendarDays, b: 'bg-blue-50', c: 'text-blue-500' },
          { label: 'Avg Rating', value: '4.8', icon: Star, b: 'bg-yellow-50', c: 'text-yellow-500' },
          { label: 'New Reviews', value: '+18', icon: TrendingUp, b: 'bg-green-50', c: 'text-green-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white-card stat-item-card">
            <div className={`${s.b} ${s.c} stat-icon-box`}><s.icon size={20} /></div>
            <div className="stat-texts">
              <p className="stat-number">{s.value}</p>
              <p className="stat-label uppercase tracking-tighter">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white-panel">
        <h3 className="panel-title mb-8">Recent Reviews</h3>
        <div className="space-y-8">
          {reviews.slice(0, 2).map((r) => (
            <div key={r.id} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-lg shadow-orange-100">
                {r.avatar}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-black text-slate-900">{r.user}</p>
                  <div className="text-yellow-500 flex gap-0.5">
                    {'★'.repeat(r.rating)}
                  </div>
                </div>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed font-medium">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
