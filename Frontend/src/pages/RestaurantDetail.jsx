import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, MapPin, Clock, Phone, Globe, Share2 } from 'lucide-react';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you'd fetch this from your API using the ID
  const restaurant = {
    name: 'Bella Vista Trattoria',
    cuisine: 'Italian',
    rating: 4.8,
    reviews: 124,
    address: '123 Tuscany Way, Hyderabad',
    hours: '11:00 AM - 11:00 PM',
    phone: '+91 98765 43210',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200'
  };

  return (
    <div className="dashboard-container w-full max-w-6xl animate-in fade-in duration-500">
      {/* Navigation Header */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-6 transition-colors"
      >
        <ChevronLeft size={20} /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image Gallery */}
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-100 border border-white">
          <img src={restaurant.image} className="w-full h-[500px] object-cover" alt={restaurant.name} />
        </div>

        {/* Right: Info Panel */}
        <div className="flex flex-col gap-6">
          <div className="bg-white-panel">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest">
                  {restaurant.cuisine}
                </span>
                <h1 className="text-4xl font-black text-slate-900 mt-3">{restaurant.name}</h1>
              </div>
              <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-red-500 transition-colors">
                <Heart size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-xl font-bold">
                <Star size={18} className="fill-yellow-600" />
                {restaurant.rating}
              </div>
              <span className="text-slate-400 font-medium">{restaurant.reviews} Reviews</span>
            </div>

            <div className="space-y-4 border-t border-slate-50 pt-6">
              <div className="flex items-center gap-4 text-slate-600 font-medium">
                <MapPin className="text-blue-500" size={20} />
                {restaurant.address}
              </div>
              <div className="flex items-center gap-4 text-slate-600 font-medium">
                <Clock className="text-blue-500" size={20} />
                {restaurant.hours}
              </div>
              <div className="flex items-center gap-4 text-slate-600 font-medium">
                <Phone className="text-blue-500" size={20} />
                {restaurant.phone}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-blue-600 text-white p-5 rounded-3xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
              Book a Table
            </button>
            <button className="bg-white border-2 border-slate-100 text-slate-800 p-5 rounded-3xl font-black text-lg hover:bg-slate-50 transition-all">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}