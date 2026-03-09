import { useState } from 'react';
import {
  Users, ShieldAlert, Globe, Eye,
  CheckCircle, XCircle, AlertTriangle, Search,
  Ban, RotateCcw, ChevronRight, TrendingUp, Activity,
} from 'lucide-react';

const userList = [
  { id: 1, name: 'Alice Moreno',  email: 'alice@test.com',   role: 'user',             trust: 92, status: 'active',    joined: 'Jan 12, 2025' },
  { id: 2, name: 'Bob Tanaka',    email: 'bob@tanaka.com',   role: 'restaurant_owner', trust: 88, status: 'active',    joined: 'Feb 3, 2025'  },
  { id: 3, name: 'Clara Singh',   email: 'clara@creator.io', role: 'creator',          trust: 74, status: 'suspended', joined: 'Mar 17, 2025' },
  { id: 4, name: 'Dev Patel',     email: 'dev@staff.net',    role: 'staff',            trust: 65, status: 'flagged',   joined: 'Apr 5, 2025'  },
  { id: 5, name: 'Eva Schneider', email: 'eva@bistro.fr',    role: 'restaurant_owner', trust: 95, status: 'active',    joined: 'Jan 28, 2025' },
];

const complianceItems = [
  { id: 1, type: 'ID Verification',   user: 'Clara Singh',    status: 'pending',  risk: 'medium', time: '2h ago'  },
  { id: 2, type: 'User Report',       user: 'Dev Patel',      status: 'pending',  risk: 'high',   time: '5h ago'  },
  { id: 3, type: 'Business License',  user: 'New Restaurant', status: 'review',   risk: 'low',    time: '1d ago'  },
  { id: 4, type: 'Content Violation', user: 'Unknown User',   status: 'resolved', risk: 'high',   time: '2d ago'  },
  { id: 5, type: 'Age Verification',  user: 'New Creator',    status: 'pending',  risk: 'medium', time: '3h ago'  },
];

const auditLog = [
  { id: 1, admin: 'You',    action: 'Suspended user clara@creator.io',           time: '1h ago', type: 'warn'    },
  { id: 2, admin: 'You',    action: 'Approved business license #BL-091',         time: '3h ago', type: 'success' },
  { id: 3, admin: 'System', action: 'Auto-flagged trust score < 70',             time: '5h ago', type: 'info'    },
  { id: 4, admin: 'You',    action: 'Rolled back profile v3 → v2 for user #12', time: '1d ago', type: 'info'    },
  { id: 5, admin: 'System', action: 'New region "Southeast Asia" added',         time: '2d ago', type: 'success' },
];

export default function AdminDashboard({ user, activeTab }) {
  const [search, setSearch] = useState('');
  const [impersonateTarget, setImpersonateTarget] = useState('');

  const filteredUsers = userList.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (activeTab === 'users') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage, suspend, and audit all platform users</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-5 py-3 text-left">User</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Trust</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, i) => (
                <tr key={u.id} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-rose-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${u.trust >= 80 ? 'bg-green-400' : u.trust >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                          style={{ width: `${u.trust}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{u.trust}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      u.status === 'active' ? 'bg-green-100 text-green-700' :
                      u.status === 'suspended' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition" title="Impersonate">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {u.status === 'active' || u.status === 'flagged' ? (
                        <button className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition" title="Suspend">
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition" title="Restore">
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'compliance') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compliance Queue</h2>
          <p className="text-sm text-gray-500 mt-1">{complianceItems.filter(c => c.status !== 'resolved').length} items need review</p>
        </div>
        {complianceItems.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.risk === 'high' ? 'bg-red-100' : c.risk === 'medium' ? 'bg-yellow-100' : 'bg-green-100'}`}>
              <ShieldAlert className={`w-5 h-5 ${c.risk === 'high' ? 'text-red-500' : c.risk === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">{c.type}</p>
              <p className="text-xs text-gray-500 mt-0.5">User: {c.user} · {c.time}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                c.status === 'resolved' ? 'bg-green-100 text-green-700' :
                c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                {c.status}
              </span>
              {c.status !== 'resolved' && (
                <div className="flex gap-1">
                  <button className="p-1 bg-green-50 rounded-lg text-green-600 hover:bg-green-100 transition">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="p-1 bg-red-50 rounded-lg text-red-500 hover:bg-red-100 transition">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'impersonate') {
    return (
      <div className="max-w-xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Impersonate User</h2>
          <p className="text-sm text-gray-500 mt-1">Debug user sessions for support & auditing</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Impersonation is logged</p>
              <p className="text-xs text-amber-700 mt-1">All impersonation sessions are recorded in the audit trail.</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">User Email or ID</label>
          <div className="flex gap-2 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={impersonateTarget} onChange={e => setImpersonateTarget(e.target.value)}
                placeholder="user@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
            </div>
            <button className="px-4 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition flex items-center gap-2">
              <Eye className="w-4 h-4" /> Impersonate
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Access</p>
          {userList.map((u) => (
            <button key={u.id} onClick={() => setImpersonateTarget(u.email)}
              className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50 transition text-left">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-rose-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {u.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                <p className="text-xs text-gray-400">{u.email}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'audit') {
    return (
      <div className="max-w-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Audit Trail</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
          {auditLog.map((l) => (
            <div key={l.id} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${l.type === 'success' ? 'bg-green-500' : l.type === 'warn' ? 'bg-red-500' : 'bg-blue-400'}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{l.action}</p>
                <p className="text-xs text-gray-400">{l.admin} · {l.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'regions') {
    return (
      <div className="max-w-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Regional Management</h2>
        <div className="space-y-3">
          {[
            { region: 'North America',  users: 12400, restaurants: 340, active: true  },
            { region: 'Europe',         users: 8900,  restaurants: 210, active: true  },
            { region: 'Southeast Asia', users: 3200,  restaurants: 98,  active: true  },
            { region: 'Middle East',    users: 1100,  restaurants: 32,  active: false },
          ].map((r) => (
            <div key={r.region} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <Globe className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{r.region}</p>
                <p className="text-xs text-gray-500">{r.users.toLocaleString()} users · {r.restaurants} restaurants</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {r.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-80">System Admin Dashboard</p>
        <h2 className="text-2xl font-bold mt-1">{user?.username || 'Admin'}</h2>
        <p className="text-sm opacity-75 mt-1">Full platform governance & compliance access</p>
        <div className="flex gap-6 mt-4">
          {[{ v: '25.6K', l: 'Total Users' }, { v: '680', l: 'Restaurants' }, { v: '5', l: 'Pending Reviews' }].map(s => (
            <div key={s.l}><p className="text-lg font-bold">{s.v}</p><p className="text-xs opacity-75">{s.l}</p></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users',      value: '25.6K', icon: Users,       color: 'blue'   },
          { label: 'Compliance Items', value: '5',     icon: ShieldAlert,  color: 'red'    },
          { label: 'Active Regions',   value: '3',     icon: Globe,        color: 'green'  },
          { label: 'Platform Health',  value: '99.8%', icon: Activity,     color: 'purple' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center
              ${color === 'blue' ? 'bg-blue-100 text-blue-500' :
                color === 'red' ? 'bg-red-100 text-red-500' :
                color === 'green' ? 'bg-green-100 text-green-500' : 'bg-purple-100 text-purple-500'}`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" /> Compliance Queue
          </h3>
          {complianceItems.slice(0, 3).map(c => (
            <div key={c.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <AlertTriangle className={`w-4 h-4 shrink-0 ${c.risk === 'high' ? 'text-red-500' : c.risk === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{c.type}</p>
                <p className="text-xs text-gray-400">{c.user}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-400" /> Platform Growth
          </h3>
          {[
            { label: 'New Users (7d)',   value: '+1,234', color: 'green' },
            { label: 'New Restaurants',  value: '+23',    color: 'green' },
            { label: 'Flagged Accounts', value: '4',      color: 'red'   },
            { label: 'Active Sessions',  value: '3,847',  color: 'blue'  },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-600">{label}</span>
              <span className={`text-sm font-bold ${color === 'green' ? 'text-green-600' : color === 'red' ? 'text-red-500' : 'text-blue-600'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}