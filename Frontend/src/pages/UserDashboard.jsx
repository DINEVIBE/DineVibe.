import { useState } from 'react';
import { Heart, MapPin, Star, Bell, Search, Utensils, TrendingUp, Users, Settings, User, ChevronRight } from 'lucide-react';

const saved = [
  { id: 1, name: 'Bella Vista Trattoria', cuisine: 'Italian',  rating: 4.8, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop' },
  { id: 2, name: 'Sakura Garden',         cuisine: 'Japanese', rating: 4.7, image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=300&h=200&fit=crop' },
  { id: 3, name: 'Le Petit Bistro',       cuisine: 'French',   rating: 4.9, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop' },
];

const feed = [
  { id: 1, user: 'Maria L.', action: 'reviewed',   place: 'Bella Vista Trattoria', time: '2h ago', avatar: 'M' },
  { id: 2, user: 'James K.', action: 'saved',       place: 'Zen Ramen House',       time: '5h ago', avatar: 'J' },
  { id: 3, user: 'Priya S.', action: 'reviewed',   place: 'Spice Route',           time: '1d ago', avatar: 'P' },
  { id: 4, user: 'Tom B.',   action: 'checked in', place: 'The Smokehouse BBQ',   time: '1d ago', avatar: 'T' },
];

const moods     = ['Romantic 🕯️', 'Quick Bite ⚡', 'Group Outing 👥', 'Healthy 🥗', 'Treat Yourself 🥩', 'Late Night 🌙'];
const allergens = ['Gluten', 'Dairy', 'Nuts', 'Shellfish', 'Eggs', 'Soy'];

export default function UserDashboard({ user, activeTab }) {
  const [activeAllergens, setActiveAllergens] = useState(['Nuts']);
  const [activeMood, setActiveMood]           = useState('Romantic 🕯️');

  if (activeTab === 'preferences') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Preferences</h2>
          <p className="text-gray-500 text-sm mt-1">Personalize your DineVibe experience</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
              {user?.username?.charAt(0) ?? 'U'}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{user?.username}</h3>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <div className="flex gap-4 mt-1 text-xs text-gray-400">
                <span><strong className="text-gray-700">24</strong> Following</span>
                <span><strong className="text-gray-700">12</strong> Followers</span>
              </div>
            </div>
            <button className="ml-auto p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Display Name</label>
              <input defaultValue={user?.username} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</label>
              <input defaultValue="New York, NY" className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bio</label>
              <textarea rows={2} defaultValue="Food explorer 🍜 Always hunting the next great meal."
                className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3">Dining Moods</h3>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button key={m} onClick={() => setActiveMood(m)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition ${activeMood === m ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3">Allergy Settings</h3>
          <div className="flex flex-wrap gap-2">
            {allergens.map((a) => (
              <button key={a}
                onClick={() => setActiveAllergens(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition border ${
                  activeAllergens.includes(a) ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'}`}>
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'saved') {
    return (
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Saved Restaurants</h2>
          <p className="text-gray-500 text-sm mt-1">{saved.length} places bookmarked</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {saved.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={r.image} alt={r.name} className="w-full h-36 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm">{r.name}</h3>
                <p className="text-gray-500 text-xs mt-1">{r.cuisine}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold">{r.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-80">Welcome back 👋</p>
        <h2 className="text-2xl font-bold mt-1">{user?.username || 'Food Explorer'}</h2>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 opacity-70" />
            <span className="text-sm opacity-70">Search restaurants, cuisines...</span>
          </div>
          <button className="p-2 bg-white/20 rounded-xl">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Reviews Written', value: '12', icon: Star,    color: 'yellow' },
          { label: 'Places Saved',    value: '4',  icon: Heart,   color: 'red'    },
          { label: 'Following',       value: '24', icon: Users,   color: 'blue'   },
          { label: 'Check-ins',       value: '37', icon: MapPin,  color: 'green'  },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center
              ${color === 'yellow' ? 'bg-yellow-100 text-yellow-500' :
                color === 'red' ? 'bg-red-100 text-red-500' :
                color === 'blue' ? 'bg-blue-100 text-blue-500' : 'bg-green-100 text-green-500'}`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Recommended for You</h3>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="space-y-3">
            {saved.map((r) => (
              <div key={r.id} className="flex items-center gap-3 group cursor-pointer">
                <img src={r.image} alt={r.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{r.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-500">{r.rating} · {r.cuisine}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Activity Feed</h3>
            <Utensils className="w-4 h-4 text-blue-400" />
          </div>
          <div className="space-y-3">
            {feed.map((f) => (
              <div key={f.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {f.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">
                    <strong>{f.user}</strong> {f.action} <span className="text-blue-600 font-medium">{f.place}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{f.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-xl font-bold text-white">
          {user?.username?.charAt(0) ?? 'U'}
        </div>
        <div>
          <p className="font-bold text-gray-900">{user?.username}</p>
          <p className="text-sm text-gray-500">Trust Score: <span className="text-blue-600 font-semibold">87 / 100</span></p>
        </div>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition">
          <User className="w-4 h-4" /> Edit Profile
        </button>
      </div>
    </div>
  );
}