import {
  Star, TrendingUp, DollarSign, Eye, Users, ShieldCheck,
  Upload, Briefcase, CheckCircle, Clock, AlertCircle,
} from 'lucide-react';

const gigs = [
  { id: 1, brand: 'Sakura Garden',   type: 'Reel Review',   pay: '$450', status: 'completed', date: 'Jun 10' },
  { id: 2, brand: 'Casa de Maíz',    type: 'Story Feature', pay: '$200', status: 'completed', date: 'Jun 5'  },
  { id: 3, brand: 'Le Petit Bistro', type: 'Photo Shoot',   pay: '$800', status: 'pending',   date: 'Jun 18' },
  { id: 4, brand: 'Olive & Vine',    type: 'Blog Post',     pay: '$300', status: 'in_review', date: 'Jun 20' },
];

const metrics = [
  { platform: 'Instagram', followers: '42.1K', views: '180K', engagement: '6.2%' },
  { platform: 'TikTok',    followers: '28.7K', views: '320K', engagement: '8.4%' },
  { platform: 'YouTube',   followers: '11.3K', views: '95K',  engagement: '4.1%' },
];

export default function CreatorDashboard({ user, activeTab }) {
  if (activeTab === 'gigs') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gig History</h2>
          <p className="text-sm text-gray-500 mt-1">4 brand partnerships total</p>
        </div>
        {gigs.map((g) => (
          <div key={g.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">{g.brand}</p>
              <p className="text-sm text-gray-500">{g.type} · {g.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{g.pay}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                g.status === 'completed' ? 'bg-green-100 text-green-700' :
                g.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                {g.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'engagement') {
    return (
      <div className="max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Engagement Metrics</h2>
        {metrics.map((m) => (
          <div key={m.platform} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${m.platform === 'Instagram' ? 'bg-pink-500' : m.platform === 'TikTok' ? 'bg-black' : 'bg-red-500'}`} />
              {m.platform}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Followers',   value: m.followers,  icon: Users     },
                { label: 'Total Views', value: m.views,      icon: Eye       },
                { label: 'Engagement', value: m.engagement,  icon: TrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center">
                  <Icon className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'revenue') {
    return (
      <div className="max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Revenue</h2>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-80">Total Earnings — June 2025</p>
          <p className="text-4xl font-bold mt-1">$1,750</p>
          <p className="text-sm opacity-75 mt-1">+$800 pending from 2 active gigs</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Gigs Completed', value: '2',     icon: CheckCircle, color: 'green'  },
            { label: 'Gigs Pending',   value: '2',     icon: Clock,       color: 'yellow' },
            { label: 'Avg Per Gig',    value: '$437',  icon: DollarSign,  color: 'purple' },
            { label: 'YTD Earnings',   value: '$8.2k', icon: TrendingUp,  color: 'blue'   },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center
                ${color === 'green' ? 'bg-green-100 text-green-500' :
                  color === 'yellow' ? 'bg-yellow-100 text-yellow-500' :
                  color === 'purple' ? 'bg-purple-100 text-purple-500' : 'bg-blue-100 text-blue-500'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'verification') {
    return (
      <div className="max-w-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Verification & Badge</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-purple-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Creator Verification</p>
              <p className="text-sm text-yellow-600 font-medium">⚡ In Progress (Step 2 of 3)</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { step: 'Government ID Uploaded', done: true  },
              { step: 'Age Verification (18+)',  done: true  },
              { step: 'Profile Review by Admin', done: false },
            ].map(({ step, done }) => (
              <div key={step} className={`flex items-center gap-3 p-3 rounded-xl ${done ? 'bg-green-50' : 'bg-gray-50'}`}>
                {done
                  ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  : <AlertCircle className="w-5 h-5 text-gray-300 shrink-0" />}
                <span className={`text-sm font-medium ${done ? 'text-green-700' : 'text-gray-500'}`}>{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 border-2 border-dashed border-purple-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Upload className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-700">Upload Government ID</span>
            </div>
            <p className="text-xs text-gray-500">Accepted: Passport, Driver's License, National ID</p>
            <button className="mt-3 px-4 py-2 bg-purple-500 text-white text-sm font-semibold rounded-xl hover:bg-purple-600 transition">
              Choose File
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-80">Creator Dashboard</p>
        <h2 className="text-2xl font-bold mt-1">{user?.username || 'Creator'}</h2>
        <div className="flex items-center gap-2 mt-2">
          <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
          <span className="text-sm font-semibold">Verified Creator</span>
        </div>
        <div className="flex gap-6 mt-4">
          {[{ v: '82.1K', l: 'Total Followers' }, { v: '595K', l: 'Total Views' }, { v: '$1,750', l: 'Earnings MTD' }].map(s => (
            <div key={s.l}><p className="text-lg font-bold">{s.v}</p><p className="text-xs opacity-75">{s.l}</p></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Followers',   value: '82.1K',  icon: Users,      color: 'purple' },
          { label: 'Total Views', value: '595K',   icon: Eye,        color: 'pink'   },
          { label: 'Gigs Done',   value: '2',      icon: Briefcase,  color: 'green'  },
          { label: 'MTD Revenue', value: '$1.75k', icon: DollarSign, color: 'blue'   },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center
              ${color === 'purple' ? 'bg-purple-100 text-purple-500' :
                color === 'pink' ? 'bg-pink-100 text-pink-500' :
                color === 'green' ? 'bg-green-100 text-green-500' : 'bg-blue-100 text-blue-500'}`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Active Gigs</h3>
        <div className="space-y-3">
          {gigs.filter(g => g.status !== 'completed').map((g) => (
            <div key={g.id} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
              <Briefcase className="w-4 h-4 text-purple-500" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">{g.brand}</p>
                <p className="text-xs text-gray-500">{g.type} · Due {g.date}</p>
              </div>
              <span className="text-sm font-bold text-purple-600">{g.pay}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}