import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Star, Bell, Search, Utensils, TrendingUp, Users, Settings, ChevronRight } from 'lucide-react';

const savedRestaurants = [
  { id: 1, name: 'Bella Vista Trattoria', cuisine: 'Italian', rating: 4.8, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop' },
  { id: 2, name: 'Sakura Garden', cuisine: 'Japanese', rating: 4.7, image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&h=400&fit=crop' },
  { id: 3, name: 'Le Petit Bistro', cuisine: 'French', rating: 4.9, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop' },
];

const feed = [
  { id: 1, user: 'Maria L.', action: 'reviewed', place: 'Bella Vista Trattoria', time: '2h ago', avatar: 'M' },
  { id: 2, user: 'James K.', action: 'saved', place: 'Zen Ramen House', time: '5h ago', avatar: 'J' },
  { id: 3, user: 'Priya S.', action: 'reviewed', place: 'Spice Route', time: '1d ago', avatar: 'P' },
  { id: 4, user: 'Tom B.', action: 'checked in', place: 'The Smokehouse BBQ', time: '1d ago', avatar: 'T' },
];

export default function UserDashboard({ user, activeTab }) {
  const navigate = useNavigate();
  
  // ── STATE FOR PREFERENCES ──
  const [formData, setFormData] = useState({
    displayName: user?.username || 'TestAdmin',
    location: 'New York, NY',
    bio: 'Food explorer 🍜 Always hunting the next great meal.'
  });

  const [activeMood, setActiveMood] = useState('Romantic 🕯️');
  const [activeAllergen, setActiveAllergen] = useState('Nuts');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ── VIEW: SAVED ──
  if (activeTab === 'saved') {
    return (
      <div className="dashboard-container">
        <div className="page-header-simple">
          <h1 className="text-3xl font-black text-slate-900">Saved Restaurants</h1>
          <p className="text-slate-400 font-medium mt-1">3 places bookmarked</p>
        </div>
        <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {savedRestaurants.map((res) => (
            <div key={res.id} onClick={() => navigate(`/home/restaurant/${res.id}`)} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
              <img src={res.image} alt={res.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-6">
                <h3 className="font-bold text-xl text-slate-800">{res.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{res.cuisine}</p>
                <div className="flex items-center gap-1 mt-4">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-slate-700">{res.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── VIEW: PREFERENCES ──
  if (activeTab === 'preferences') {
    return (
      <div className="dashboard-container max-w-5xl">
        <div className="page-header-simple">
          <h1 className="text-3xl font-black text-slate-900">My Preferences</h1>
          <p className="text-slate-400 font-medium mt-1">Personalize your experience</p>
        </div>

        <div className="bg-white-panel profile-setup-card mb-8">
          <div className="profile-header-row">
            <div className="avatar-large-box">{formData.displayName.charAt(0).toUpperCase()}</div>
            <div className="profile-info-main">
              <h3 className="profile-name-text">{formData.displayName}</h3>
              <p className="profile-email-text">{user?.email || 'test@dinevibe.com'}</p>
            </div>
          </div>

          <div className="input-field-grid">
            <div className="input-group">
              <label>Display Name</label>
              <input type="text" name="displayName" value={formData.displayName} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
            </div>
          </div>

          <div className="input-group full-width mt-6">
            <label>Bio</label>
            <textarea name="bio" rows="3" value={formData.bio} onChange={handleInputChange} />
          </div>
        </div>

        <div className="bg-white-panel selection-panel mb-6">
          <h3 className="panel-title">Dining Moods</h3>
          <div className="selection-chip-group">
            {['Romantic 🕯️', 'Quick Bite ⚡', 'Group Outing 👥', 'Healthy 🥗', 'Treat Yourself 🥩', 'Late Night 🌙'].map(mood => (
              <button key={mood} onClick={() => setActiveMood(mood)} className={`chip ${activeMood === mood ? 'active-blue' : ''}`}>{mood}</button>
            ))}
          </div>
        </div>

        <div className="bg-white-panel selection-panel">
          <h3 className="panel-title">Allergy Settings</h3>
          <div className="selection-chip-group">
            {['Gluten', 'Dairy', 'Nuts', 'Shellfish', 'Eggs', 'Soy'].map(a => (
              <button key={a} onClick={() => setActiveAllergen(a)} className={`chip ${activeAllergen === a ? 'active-red' : ''}`}>{a}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── VIEW: HOME ──
  return (
    <div className="dashboard-container">
      <div className="user-gradient header-banner-refined">
        <div className="banner-decoration-circle"></div>
        <div className="banner-main-content">
          <div className="greeting-area">
            <div className="flex items-center gap-2 mb-2">
              <span className="status-indicator-dot"></span>
              <p className="welcome-tag">Online • Welcome back</p>
            </div>
            <h2 className="user-display-name">
              {formData.displayName} <span className="wave-emoji">👋</span>
            </h2>
          </div>

          <div className="search-integration-row">
            <div className="glass-search-container">
              <Search size={20} className="glass-icon" />
              <input 
                type="text" 
                placeholder="Search for pasta, pizza, or restaurants..." 
                className="glass-input"
              />
              <div className="search-shortcut">/</div>
            </div>
            <button className="glass-action-btn">
              <Bell size={22} />
              <span className="notif-ping"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="metrics-row">
        {[
          { l: 'Reviews Written', v: '12', i: Star, c: 'text-yellow-500', b: 'bg-yellow-50' },
          { l: 'Places Saved', v: '4', i: Heart, c: 'text-red-500', b: 'bg-red-50' },
          { l: 'Following', v: '24', i: Users, c: 'text-blue-500', b: 'bg-blue-50' },
          { l: 'Check-ins', v: '37', i: MapPin, c: 'text-green-500', b: 'bg-green-50' }
        ].map(s => (
          <div key={s.l} className="bg-white-card stat-item-card">
            <div className={`${s.b} ${s.c} stat-icon-box`}><s.i size={24} /></div>
            <div className="stat-texts">
              <p className="stat-number">{s.v}</p>
              <p className="stat-label uppercase tracking-widest">{s.l}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="main-data-grid">
        <div className="bg-white-panel">
          <div className="panel-header mb-8">
            <h3 className="panel-title">Recommended for You</h3>
            <TrendingUp size={20} className="text-blue-400" />
          </div>
          <div className="item-list">
            {savedRestaurants.map(item => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/home/restaurant/${item.id}`)}
                className="list-row-item group cursor-pointer hover:bg-slate-50 transition-all rounded-2xl p-3 -mx-3"
              >
                <img src={item.image} className="item-thumb" alt={item.name} />
                <div className="item-info">
                  <p className="item-title group-hover:text-blue-600 transition-colors">{item.name}</p>
                  <div className="item-meta">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span>{item.rating} · {item.cuisine}</span>
                  </div>
                </div>
                <ChevronRight size={20} className="chevron group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white-panel">
          <div className="panel-header mb-8">
            <h3 className="panel-title">Activity Feed</h3>
            <Utensils size={20} className="text-blue-400" />
          </div>
          <div className="feed-list space-y-6">
            {feed.map(f => (
              <div key={f.id} className="feed-item">
                <div className="feed-avatar shadow-sm">{f.avatar}</div>
                <div className="feed-content">
                  <p className="feed-text">
                    <strong className="text-slate-900">{f.user}</strong> reviewed <span className="text-blue-600 font-bold">{f.place}</span>
                  </p>
                  <span className="feed-time font-bold">{f.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
