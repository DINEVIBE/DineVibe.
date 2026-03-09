import { useState } from 'react';
import {
  Star, TrendingUp, DollarSign, CalendarDays, ImageIcon,
  ChevronUp, ChevronDown, Upload, Clock, MapPin, Phone,
} from 'lucide-react';

const reviews = [
  { id: 1, user: 'Alice M.', rating: 5, text: 'Absolutely incredible pasta! Will be back.',  date: '2 days ago', avatar: 'A' },
  { id: 2, user: 'Brian T.', rating: 4, text: 'Great ambiance, service was a bit slow.',     date: '4 days ago', avatar: 'B' },
  { id: 3, user: 'Chloe R.', rating: 5, text: 'Best tiramisu in the city. No question.',    date: '1 week ago', avatar: 'C' },
];

const reservations = [
  { id: 1, name: 'Johnson Party', size: 4, time: '7:00 PM', date: 'Today',    status: 'confirmed' },
  { id: 2, name: 'Smith x2',      size: 2, time: '8:30 PM', date: 'Today',    status: 'pending'   },
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

  if (activeTab === 'reviews') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            </div>
            <span className="font-bold text-gray-900">4.8</span>
            <span className="text-gray-500 text-sm">· 342 reviews</span>
          </div>
        </div>
        {reviews.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {r.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">{r.user}</p>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-3 h-3 ${s <= r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">{r.date}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700">{r.text}</p>
            <button className="mt-3 text-xs text-orange-500 font-semibold hover:underline">Reply →</button>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'reservations') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reservations</h2>
          <p className="text-sm text-gray-500 mt-1">3 upcoming today</p>
        </div>
        {reservations.map((res) => (
          <div key={res.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">{res.name}</p>
              <p className="text-sm text-gray-500">{res.date} · {res.time} · Party of {res.size}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${res.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {res.status}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'menu') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menu & Photos</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your restaurant's visual identity</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Restaurant Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Restaurant Name', value: 'Bella Vista Trattoria' },
              { label: 'Cuisine Type',    value: 'Italian'               },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
                <input defaultValue={value} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
            ))}
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Opens
                </label>
                <input type="time" value={hours.open} onChange={e => setHours(h => ({ ...h, open: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Closes</label>
                <input type="time" value={hours.close} onChange={e => setHours(h => ({ ...h, close: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Address
              </label>
              <input defaultValue="123 Main Street, Downtown" className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                <Phone className="w-3 h-3" /> Phone
              </label>
              <input defaultValue="+1 (555) 123-4567" className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-orange-400" /> Photo Gallery
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=150&fit=crop',
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=150&fit=crop',
              'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=150&fit=crop',
            ].map((src, i) => (
              <img key={i} src={src} alt="" className="w-full h-24 object-cover rounded-xl" />
            ))}
          </div>
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-orange-200 rounded-xl p-6 cursor-pointer hover:bg-orange-50 transition">
            <Upload className="w-6 h-6 text-orange-400" />
            <span className="text-sm text-gray-500">Click to upload photos or drag & drop</span>
          </label>
        </div>
      </div>
    );
  }

  if (activeTab === 'analytics') {
    return (
      <div className="max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-1">Weekly Revenue</h3>
          <p className="text-sm text-gray-500 mb-4">Total: $16,500</p>
          <div className="flex items-end gap-2 h-32">
            {revenueData.map(({ day, value }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gradient-to-t from-orange-500 to-red-400 rounded-t-lg transition-all"
                  style={{ height: `${(value / maxRev) * 100}%` }} />
                <span className="text-xs text-gray-500">{day}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Avg. Rating',    value: '4.8 ★', change: '+0.1',          up: true  },
            { label: 'Total Reviews',  value: '342',   change: '+18 this week',  up: true  },
            { label: 'Revenue MTD',    value: '$24.6k', change: '+12%',          up: true  },
            { label: 'Cancellations',  value: '3',     change: '-2 vs last wk',  up: false },
          ].map(({ label, value, change, up }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
              <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>
                {up ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {change}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-80">Restaurant Dashboard</p>
        <h2 className="text-2xl font-bold mt-1">{user?.username || 'Owner'}</h2>
        <p className="text-sm opacity-75 mt-1">Bella Vista Trattoria · Italian</p>
        <div className="flex gap-4 mt-4">
          {[{ label: 'Rating', value: '4.8 ★' }, { label: 'Reviews', value: '342' }, { label: "Today's Res", value: '3' }].map(s => (
            <div key={s.label}><p className="text-lg font-bold">{s.value}</p><p className="text-xs opacity-75">{s.label}</p></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Revenue Today', value: '$1,280', icon: DollarSign,  color: 'orange' },
          { label: 'Reservations',  value: '3',      icon: CalendarDays, color: 'blue'  },
          { label: 'Avg Rating',    value: '4.8',    icon: Star,         color: 'yellow' },
          { label: 'New Reviews',   value: '+18',    icon: TrendingUp,   color: 'green'  },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center
              ${color === 'orange' ? 'bg-orange-100 text-orange-500' :
                color === 'blue' ? 'bg-blue-100 text-blue-500' :
                color === 'yellow' ? 'bg-yellow-100 text-yellow-500' : 'bg-green-100 text-green-500'}`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Recent Reviews</h3>
        <div className="space-y-3">
          {reviews.slice(0, 2).map((r) => (
            <div key={r.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {r.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm">{r.user} · <span className="text-yellow-500">{'★'.repeat(r.rating)}</span></p>
                <p className="text-sm text-gray-600">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}