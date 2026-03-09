import React, { useState } from 'react';
import { 
  Star, TrendingUp, DollarSign, Eye, Users, 
  Briefcase, ShieldCheck, CheckCircle, Clock, 
  AlertCircle, Upload, ChevronRight, Globe 
} from 'lucide-react';

// Use data that matches the reference images exactly
const currentGigs = [
  { id: 1, brand: 'Le Petit Bistro', type: 'Photo Shoot', pay: '$800', status: 'pending', date: 'Due Jun 18' },
  { id: 2, brand: 'Olive & Vine', type: 'Blog Post', pay: '$300', status: 'in_review', date: 'Due Jun 20' },
];

const completedGigs = [
  { id: 3, brand: 'Sakura Garden', type: 'Reel Review', pay: '$450', status: 'completed', date: 'Jun 10' },
  { id: 4, brand: 'Casa de Maíz', type: 'Story Feature', pay: '$200', status: 'completed', date: 'Jun 5' },
];

export default function CreatorDashboard({ user, activeTab }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // ── VIEW 1: GIG HISTORY ──
  if (activeTab === 'gigs') {
    return (
      <div className="dashboard-container max-w-4xl animate-in fade-in">
        <div className="flex justify-between items-center mb-8 px-2">
          <h2 className="text-3xl font-black text-slate-900">Gig History</h2>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">4 total contracts</p>
        </div>
        <div className="space-y-4">
          {completedGigs.map((g) => (
            <div key={g.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
                <Briefcase size={24} />
              </div>
              <div className="flex-1">
                <p className="font-black text-slate-900 text-lg">{g.brand}</p>
                <p className="text-slate-400 font-bold text-sm uppercase">{g.type} • {g.date}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900 text-xl">{g.pay}</p>
                <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600">
                  {g.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── VIEW 2: REVENUE ──
  if (activeTab === 'revenue') {
    return (
      <div className="dashboard-container animate-in fade-in duration-500">
        <h2 className="text-3xl font-black text-slate-900 mb-8 px-2">Revenue Flow</h2>
        <div className="creator-gradient rounded-[2.5rem] p-12 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Total Earnings — June 2026</p>
          <h3 className="text-7xl font-black mt-2 tracking-tight">$1,750</h3>
          <p className="text-lg font-medium opacity-90 mt-2">+$800 pending from 2 active gigs</p>
        </div>
        <div className="metrics-row">
          {[
            { label: 'Gigs Completed', value: '2', icon: CheckCircle, b: 'bg-green-50', c: 'text-green-500' },
            { label: 'Gigs Pending', value: '2', icon: Clock, b: 'bg-yellow-50', c: 'text-yellow-500' },
            { label: 'Avg Per Gig', value: '$437', icon: DollarSign, b: 'bg-purple-50', c: 'text-purple-500' },
            { label: 'YTD Earnings', value: '$8.2k', icon: TrendingUp, b: 'bg-blue-50', c: 'text-blue-500' },
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
      </div>
    );
  }

  // ── VIEW 3: VERIFICATION (Improved Layout) ──
  if (activeTab === 'verification') {
    return (
      <div className="dashboard-container max-w-5xl animate-in fade-in duration-700">
        <h2 className="text-3xl font-black text-slate-900 mb-8 px-2">Verification & Badge</h2>
        
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-inner">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">Creator Verification</h3>
              <p className="text-orange-500 font-bold flex items-center gap-1 mt-1 uppercase text-sm tracking-tight">
                <TrendingUp size={16} /> In Progress (Step 2 of 3)
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            {[
              { text: 'Government ID Uploaded', status: selectedFile ? 'done' : 'pending', date: selectedFile ? 'Just Now' : 'Pending' },
              { text: 'Age Verification (18+)', status: 'done', date: 'Jun 10, 2026' },
              { text: 'Profile Review by Admin', status: 'pending', date: 'In Queue' },
            ].map((step, i) => (
              <div key={i} className={`flex items-center gap-4 p-5 rounded-2xl border ${step.status === 'done' ? 'bg-green-50/50 border-green-100 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                {step.status === 'done' ? <CheckCircle size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-slate-200" />}
                <div className="flex-1">
                  <span className="font-bold text-slate-900">{step.text}</span>
                  <p className="text-[10px] uppercase font-black opacity-50 tracking-wider mt-0.5">{step.date}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${step.status === 'done' ? 'bg-green-100/50 text-green-700' : 'bg-slate-100/70 text-slate-500'}`}>
                  {step.status}
                </span>
              </div>
            ))}
          </div>

          {/* ── UPDATED UPLOAD ZONE ── */}
          <div className="border-2 border-dashed border-purple-100 rounded-[2rem] p-10 bg-slate-50/40 hover:bg-slate-50/60 transition-all">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-purple-600 mb-2">
                  <Upload size={24} />
                  <span className="font-black uppercase tracking-widest text-xs">Upload Government ID</span>
                </div>
                <p className="text-sm text-slate-500 mb-6 font-medium">Passport, Driver's License, National ID (Max 10MB)</p>
                
                <label className="px-10 py-3.5 bg-purple-600 text-white rounded-xl font-bold cursor-pointer hover:bg-purple-700 transition-all shadow-lg shadow-purple-100 inline-block uppercase tracking-widest text-[10px]">
                  {selectedFile ? 'Change File' : 'Choose File'}
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
              
              {/* Visual Preview Card - ONLY SHOWS AFTER MANUAL UPLOAD */}
              {selectedFile && (
                <div className="w-64 h-36 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between animate-in zoom-in">
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-slate-300" />
                    <span className="font-black text-slate-400 text-[10px] uppercase tracking-tight truncate">
                      {selectedFile.name}
                    </span>
                  </div>
                  <div className="h-12 w-full bg-slate-50 rounded-lg flex items-center justify-center text-slate-200">
                    <Users size={20} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-300">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] font-black text-green-500 uppercase">Uploaded</span>
                      <CheckCircle size={12} className="text-green-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── DEFAULT VIEW: PORTFOLIO ──
  return (
    <div className="dashboard-container animate-in fade-in">
      <div className="creator-gradient header-banner-refined mb-10">
        <div className="banner-main-content">
          <div className="greeting-area">
            <p className="welcome-tag text-white/70">Creator Dashboard</p>
            <h2 className="user-display-name">{user?.username || 'test'}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span className="text-sm font-black text-white">Verified Creator</span>
            </div>
          </div>
          <div className="flex gap-10 mt-8">
            <div className="flex flex-col text-white">
              <span className="text-2xl font-black">82.1K</span>
              <span className="welcome-tag text-[10px] text-white/70">Total Followers</span>
            </div>
            <div className="flex flex-col text-white">
              <span className="text-2xl font-black">595K</span>
              <span className="welcome-tag text-[10px] text-white/70">Total Views</span>
            </div>
            <div className="flex flex-col text-white">
              <span className="text-2xl font-black">$1,750</span>
              <span className="welcome-tag text-[10px] text-white/70">Earnings MTD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="metrics-row mb-10">
        {[
          { label: 'Followers', value: '82.1K', icon: Users, b: 'bg-purple-50', c: 'text-purple-500' },
          { label: 'Total Views', value: '595K', icon: Eye, b: 'bg-pink-50', c: 'text-pink-500' },
          { label: 'Gigs Done', value: '2', icon: Briefcase, b: 'bg-green-50', c: 'text-green-500' },
          { label: 'MTD Revenue', value: '$1.75k', icon: DollarSign, b: 'bg-blue-50', c: 'text-blue-500' },
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
        <h3 className="panel-title mb-6">Active Gigs</h3>
        <div className="space-y-3">
          {currentGigs.map((g) => (
            <div key={g.id} className="flex items-center gap-4 p-4 bg-purple-50/40 rounded-2xl border border-purple-100/50">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-purple-500 shadow-sm">
                <Briefcase size={18} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{g.brand}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">{g.type} • Due {g.date}</p>
              </div>
              <span className="font-black text-purple-600">{g.pay}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}