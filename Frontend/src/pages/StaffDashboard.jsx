import { useState } from 'react';
import {
  CheckCircle, Circle, Clock, AlertCircle, TicketCheck,
  CalendarDays, ScrollText, ChevronRight, User,
} from 'lucide-react';

const tasks = [
  { id: 1, title: 'Restock bar inventory',       priority: 'high',   done: false, due: 'Today 3PM'  },
  { id: 2, title: 'Clean patio seating area',    priority: 'medium', done: true,  due: 'Today 12PM' },
  { id: 3, title: 'Update digital menu display', priority: 'low',    done: false, due: 'Tomorrow'   },
  { id: 4, title: 'Call florist for decor',      priority: 'medium', done: false, due: 'Today 5PM'  },
  { id: 5, title: 'Prepare weekend event setup', priority: 'high',   done: false, due: 'Fri 9AM'    },
  { id: 6, title: 'Staff briefing notes',        priority: 'low',    done: true,  due: 'Done'       },
  { id: 7, title: 'Check reservation system',    priority: 'high',   done: true,  due: 'Done'       },
];

const tickets = [
  { id: 1, title: 'POS system not responding',   status: 'open',        priority: 'high',   created: '1h ago' },
  { id: 2, title: 'Wi-Fi password reset needed', status: 'in_progress', priority: 'medium', created: '3h ago' },
  { id: 3, title: 'Menu allergy info update',    status: 'resolved',    priority: 'low',    created: '1d ago' },
];

const schedule = [
  { day: 'Mon', shift: '10AM – 6PM', role: 'Floor Staff' },
  { day: 'Tue', shift: 'Off',        role: '—'           },
  { day: 'Wed', shift: '12PM – 8PM', role: 'Bar Support' },
  { day: 'Thu', shift: '10AM – 6PM', role: 'Floor Staff' },
  { day: 'Fri', shift: '4PM – 12AM', role: 'Event Staff' },
  { day: 'Sat', shift: '4PM – 12AM', role: 'Event Staff' },
  { day: 'Sun', shift: 'Off',        role: '—'           },
];

const logs = [
  { id: 1, action: 'Checked in',                              time: 'Today 10:02 AM',    type: 'info'    },
  { id: 2, action: 'Completed task: Menu allergy info update', time: 'Today 11:15 AM',   type: 'success' },
  { id: 3, action: 'Opened ticket #DV-4021',                  time: 'Today 11:47 AM',   type: 'warning' },
  { id: 4, action: 'Checked out',                             time: 'Yesterday 6:00 PM', type: 'info'    },
];

export default function StaffDashboard({ user, activeTab }) {
  const [taskList, setTaskList] = useState(tasks);
  const toggle = (id) => setTaskList(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));

  if (activeTab === 'tasks') {
    const pending   = taskList.filter(t => !t.done);
    const completed = taskList.filter(t => t.done);
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
          <p className="text-sm text-gray-500 mt-1">{pending.length} pending · {completed.length} completed</p>
        </div>
        <div className="space-y-2">
          {taskList.map((t) => (
            <button key={t.id} onClick={() => toggle(t.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition ${t.done ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100 hover:border-green-200'}`}>
              {t.done
                ? <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                : <Circle className="w-5 h-5 text-gray-300 shrink-0" />}
              <div className="flex-1">
                <p className={`font-medium text-sm ${t.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>{t.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.due}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                t.priority === 'high' ? 'bg-red-100 text-red-600' :
                t.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-500'}`}>
                {t.priority}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'tickets') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
          <p className="text-sm text-gray-500 mt-1">{tickets.filter(t => t.status !== 'resolved').length} open</p>
        </div>
        {tickets.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              t.status === 'open' ? 'bg-red-100' : t.status === 'in_progress' ? 'bg-blue-100' : 'bg-green-100'}`}>
              <TicketCheck className={`w-5 h-5 ${
                t.status === 'open' ? 'text-red-500' : t.status === 'in_progress' ? 'text-blue-500' : 'text-green-500'}`} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">{t.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t.created}</p>
            </div>
            <div className="text-right space-y-1">
              <span className={`block text-xs font-semibold px-2 py-0.5 rounded-full ${
                t.status === 'open' ? 'bg-red-100 text-red-600' :
                t.status === 'in_progress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                {t.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'schedule') {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    return (
      <div className="max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">My Schedule</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {schedule.map(({ day, shift, role }, i) => (
            <div key={day} className={`flex items-center gap-4 px-5 py-4 ${i < schedule.length - 1 ? 'border-b border-gray-50' : ''} ${day === today ? 'bg-green-50' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${day === today ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {day}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${shift === 'Off' ? 'text-gray-400' : 'text-gray-900'}`}>{shift}</p>
                <p className="text-xs text-gray-500">{role}</p>
              </div>
              {day === today && <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Today</span>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'logs') {
    return (
      <div className="max-w-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Activity Logs</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
          {logs.map((l) => (
            <div key={l.id} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${l.type === 'success' ? 'bg-green-500' : l.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-400'}`} />
              <div>
                <p className="text-sm font-medium text-gray-900">{l.action}</p>
                <p className="text-xs text-gray-400">{l.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-80">Staff Dashboard</p>
        <h2 className="text-2xl font-bold mt-1">{user?.username || 'Staff'}</h2>
        <p className="text-sm opacity-75 mt-1">Floor Staff · Bella Vista Trattoria</p>
        <div className="flex gap-6 mt-4">
          {[{ v: '4', l: 'Tasks Today' }, { v: '2', l: 'Open Tickets' }, { v: 'Wed', l: 'Next Shift' }].map(s => (
            <div key={s.l}><p className="text-lg font-bold">{s.v}</p><p className="text-xs opacity-75">{s.l}</p></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tasks Pending',   value: '4',  icon: AlertCircle, color: 'red'   },
          { label: 'Tasks Completed', value: '3',  icon: CheckCircle, color: 'green' },
          { label: 'Open Tickets',    value: '2',  icon: TicketCheck, color: 'blue'  },
          { label: 'Hours This Week', value: '28', icon: Clock,       color: 'amber' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center
              ${color === 'red' ? 'bg-red-100 text-red-500' :
                color === 'green' ? 'bg-green-100 text-green-500' :
                color === 'blue' ? 'bg-blue-100 text-blue-500' : 'bg-amber-100 text-amber-500'}`}>
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
            <CalendarDays className="w-4 h-4 text-green-400" /> Today's Schedule
          </h3>
          {schedule.slice(0, 3).map(s => (
            <div key={s.day} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <Clock className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-700">{s.shift}</span>
              <span className="text-xs text-gray-400 ml-auto">{s.role}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-green-400" /> Recent Activity
          </h3>
          {logs.slice(0, 3).map(l => (
            <div key={l.id} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
              <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${l.type === 'success' ? 'bg-green-500' : l.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-400'}`} />
              <div>
                <p className="text-xs font-medium text-gray-800">{l.action}</p>
                <p className="text-xs text-gray-400">{l.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-xl font-bold text-white">
          {user?.username?.charAt(0) ?? 'S'}
        </div>
        <div>
          <p className="font-bold text-gray-900">{user?.username || 'Staff'}</p>
          <p className="text-sm text-gray-500">Staff Member · Floor Staff</p>
        </div>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 text-sm font-semibold hover:bg-green-100 transition">
          <User className="w-4 h-4" /> View Profile
        </button>
        <ChevronRight className="w-4 h-4 text-gray-300" />
      </div>
    </div>
  );
}
