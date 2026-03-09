// StaffDashboard.jsx
import React, { useMemo, useState } from "react";
import { Check, Plus, X, Ticket } from "lucide-react";

/* =========================
   TASKS (My Tasks)
========================= */

// Matches screenshot baseline: 7 tasks total, 2 pending, 5 completed
const initialTasks = [
  { id: 1, title: "Restock bar inventory", due: "Today 3PM", priority: "high", done: false },
  { id: 2, title: "Clean patio seating area", due: "Today 12PM", priority: "medium", done: true },
  { id: 3, title: "Update digital menu display", due: "Tomorrow", priority: "low", done: true },
  { id: 4, title: "Call florist for decor", due: "Today 5PM", priority: "medium", done: true },
  { id: 5, title: "Prepare weekend event setup", due: "Fri 9AM", priority: "high", done: false },
  { id: 6, title: "Staff briefing notes", due: "Done", priority: "low", done: true },
  { id: 7, title: "Check reservation system", due: "Done", priority: "high", done: true }
];

function getPriorityPill(priority) {
  switch (priority) {
    case "high":
      return { bg: "#fee2e2", fg: "#ef4444", text: "high" };
    case "medium":
      return { bg: "#fef3c7", fg: "#d97706", text: "medium" };
    default:
      return { bg: "#f1f5f9", fg: "#64748b", text: "low" };
  }
}

function TaskRow({ task, onToggle }) {
  const p = getPriorityPill(task.priority);

  return (
    <div
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
      style={{
        width: "100%",
        boxSizing: "border-box",
        background: "#ffffff",
        border: "1px solid #eef2f7",
        borderRadius: 16,
        padding: "18px 18px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: "pointer",
        boxShadow: "0 1px 0 rgba(15, 23, 42, 0.02)"
      }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          border: task.done ? "2px solid #22c55e" : "2px solid #cbd5e1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: "#fff"
        }}
      >
        {task.done ? <Check size={12} color="#22c55e" strokeWidth={3} /> : null}
      </div>

      {/* Title + Due */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: task.done ? "#94a3b8" : "#0f172a",
            textDecoration: task.done ? "line-through" : "none",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {task.title}
        </div>
        <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>
          {task.due}
        </div>
      </div>

      {/* Priority */}
      <span
        style={{
          background: p.bg,
          color: p.fg,
          borderRadius: 999,
          padding: "4px 10px",
          fontSize: 12,
          fontWeight: 800,
          textTransform: "lowercase",
          flexShrink: 0
        }}
      >
        {p.text}
      </span>
    </div>
  );
}

/* =========================
   SCHEDULE (My Schedule)
========================= */

const scheduleData = [
  { day: "Mon", shift: "10AM – 6PM", role: "Floor Staff", isToday: false, isOff: false },
  { day: "Tue", shift: "Off", role: "—", isToday: true, isOff: true },
  { day: "Wed", shift: "12PM – 8PM", role: "Bar Support", isToday: false, isOff: false },
  { day: "Thu", shift: "10AM – 6PM", role: "Floor Staff", isToday: false, isOff: false },
  { day: "Fri", shift: "4PM – 12AM", role: "Event Staff", isToday: false, isOff: false },
  { day: "Sat", shift: "4PM – 12AM", role: "Event Staff", isToday: false, isOff: false },
  { day: "Sun", shift: "Off", role: "—", isToday: false, isOff: true }
];

export function StaffSchedule() {
  return (
    <div style={pageRootStyle}>
      <div style={pageInnerStyle}>
        <h1 style={pageTitleStyle}>My Schedule</h1>

        <div
          style={{
            marginTop: 18,
            width: "100%",
            maxWidth: 520,
            background: "#fff",
            border: "1px solid #eef2f7",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 2px 0 rgba(15,23,42,0.03)"
          }}
        >
          {scheduleData.map((s, idx) => {
            const rowBg = s.isToday ? "#ecfdf5" : "#fff";
            const dayBg = s.isToday ? "#00c389" : "#f1f5f9";
            const dayFg = s.isToday ? "#fff" : "#334155";

            return (
              <div
                key={`${s.day}-${idx}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "18px 18px",
                  background: rowBg,
                  borderTop: idx === 0 ? "none" : "1px solid #f1f5f9"
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: dayBg,
                    color: dayFg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 14,
                    flexShrink: 0
                  }}
                >
                  {s.day}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 900,
                      color: s.isOff ? "#94a3b8" : "#0f172a",
                      lineHeight: 1.2
                    }}
                  >
                    {s.shift}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      fontWeight: 700,
                      color: s.isOff ? "#94a3b8" : "#64748b"
                    }}
                  >
                    {s.role}
                  </div>
                </div>

                {s.isToday && (
                  <span
                    style={{
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "#dcfce7",
                      color: "#16a34a",
                      fontWeight: 900,
                      fontSize: 12,
                      whiteSpace: "nowrap"
                    }}
                  >
                    Today
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <FloatingSupportButton />
    </div>
  );
}

/* =========================
   TICKETS (Support Tickets)
========================= */

const tickets = [
  { id: "DV-4021", title: "POS system not responding", age: "1h ago", status: "open", priority: "high" },
  { id: "DV-4019", title: "Wi‑Fi password reset needed", age: "3h ago", status: "in progress", priority: "medium" },
  { id: "DV-4012", title: "Menu allergy info update", age: "1d ago", status: "resolved", priority: "low" }
];

function statusStyle(status) {
  const s = status.toLowerCase();
  if (s === "open") return { chipBg: "#fee2e2", chipFg: "#ef4444", iconBg: "#fee2e2", iconFg: "#ef4444" };
  if (s === "in progress") return { chipBg: "#dbeafe", chipFg: "#2563eb", iconBg: "#dbeafe", iconFg: "#2563eb" };
  return { chipBg: "#dcfce7", chipFg: "#16a34a", iconBg: "#dcfce7", iconFg: "#16a34a" };
}

function priorityStyle(priority) {
  const p = priority.toLowerCase();
  if (p === "high") return { chipBg: "#fee2e2", chipFg: "#ef4444" };
  if (p === "medium") return { chipBg: "#fef3c7", chipFg: "#d97706" };
  return { chipBg: "#f1f5f9", chipFg: "#94a3b8" };
}

export function StaffTickets() {
  const openCount = useMemo(
    () => tickets.filter((t) => t.status.toLowerCase() !== "resolved").length,
    []
  );

  return (
    <div style={pageRootStyle}>
      <div style={pageInnerStyle}>
        <h1 style={pageTitleStyle}>Support Tickets</h1>
        <div style={pageSubtitleStyle}>{openCount} open</div>

        <div style={{ marginTop: 18, width: "100%", maxWidth: 820 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {tickets.map((t) => {
              const ss = statusStyle(t.status);
              const ps = priorityStyle(t.priority);

              return (
                <div
                  key={t.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #eef2f7",
                    borderRadius: 18,
                    padding: "18px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    boxShadow: "0 2px 0 rgba(15,23,42,0.03)"
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: ss.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <Ticket size={18} color={ss.iconFg} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 900,
                        color: "#0f172a",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {t.title}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>
                      {t.age}
                    </div>
                  </div>

                  {/* Right stacked chips (status then priority) */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                    <span
                      style={{
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: ss.chipBg,
                        color: ss.chipFg,
                        fontWeight: 900,
                        fontSize: 12,
                        textTransform: "lowercase",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {t.status}
                    </span>
                    <span
                      style={{
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: ps.chipBg,
                        color: ps.chipFg,
                        fontWeight: 900,
                        fontSize: 12,
                        textTransform: "lowercase",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {t.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <FloatingSupportButton />
    </div>
  );
}

/* =========================
   ACTIVITY LOGS
========================= */

const logs = [
  { dot: "#3b82f6", title: "Checked in", time: "Today 10:02 AM" },
  { dot: "#22c55e", title: "Completed task: Menu allergy info update", time: "Today 11:15 AM" },
  { dot: "#f59e0b", title: "Opened ticket #DV-4021", time: "Today 11:47 AM" },
  { dot: "#3b82f6", title: "Checked out", time: "Yesterday 6:00 PM" }
];

export function StaffActivityLogs() {
  return (
    <div style={pageRootStyle}>
      <div style={pageInnerStyle}>
        <h1 style={pageTitleStyle}>Activity Logs</h1>

        <div
          style={{
            marginTop: 18,
            width: "100%",
            maxWidth: 660,
            background: "#fff",
            border: "1px solid #eef2f7",
            borderRadius: 18,
            padding: 18,
            boxShadow: "0 2px 0 rgba(15,23,42,0.03)"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {logs.map((l, idx) => (
              <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    marginTop: 6,
                    background: l.dot,
                    flexShrink: 0
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: "#0f172a" }}>{l.title}</div>
                  <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: "#94a3b8" }}>
                    {l.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FloatingSupportButton />
    </div>
  );
}

/* =========================
   DEFAULT EXPORT = TASKS PAGE
   (use for /home/dashboard)
========================= */

export default function StaffDashboard() {
  const [taskList, setTaskList] = useState(initialTasks);

  // Add-task UI state
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDue, setNewDue] = useState("Today");
  const [newPriority, setNewPriority] = useState("medium");

  const pending = useMemo(() => taskList.filter((t) => !t.done).length, [taskList]);
  const completed = useMemo(() => taskList.filter((t) => t.done).length, [taskList]);

  const toggleTask = (id) => {
    setTaskList((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const nextId = useMemo(
    () => (taskList.length ? Math.max(...taskList.map((t) => t.id)) + 1 : 1),
    [taskList]
  );

  const resetAddForm = () => {
    setNewTitle("");
    setNewDue("Today");
    setNewPriority("medium");
  };

  const addTask = (e) => {
    e?.preventDefault?.();
    const title = newTitle.trim();
    if (!title) return;

    setTaskList((prev) => [
      { id: nextId, title, due: newDue.trim() || "Today", priority: newPriority, done: false },
      ...prev
    ]);

    resetAddForm();
    setShowAdd(false);
  };

  const inputStyle = {
    height: 40,
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    padding: "0 12px",
    fontSize: 13,
    fontWeight: 700,
    color: "#0f172a",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    width: "100%"
  };

  return (
    <div style={pageRootStyle}>
      <div style={pageInnerStyle}>
        {/* Header */}
        <div
          style={{
            marginBottom: 18,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12
          }}
        >
          <div>
            <h1 style={pageTitleStyle}>My Tasks</h1>
            <div style={pageSubtitleStyle}>
              {pending} pending · {completed} completed
            </div>
          </div>

          {/* Add Task button */}
          <button
            type="button"
            onClick={() => setShowAdd((v) => !v)}
            style={{
              height: 40,
              padding: "0 14px",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              background: "#fff",
              color: "#0f172a",
              cursor: "pointer",
              fontWeight: 900,
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0
            }}
          >
            {showAdd ? <X size={16} /> : <Plus size={16} />}
            {showAdd ? "Close" : "Add task"}
          </button>
        </div>

        {/* Add Task Panel */}
        {showAdd && (
          <form
            onSubmit={addTask}
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#fff",
              border: "1px solid #eef2f7",
              borderRadius: 16,
              padding: 16,
              marginBottom: 14,
              boxShadow: "0 1px 0 rgba(15, 23, 42, 0.02)"
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10 }}>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Task title (e.g., Restock bar inventory)"
                style={inputStyle}
                autoFocus
              />
              <input
                value={newDue}
                onChange={(e) => setNewDue(e.target.value)}
                placeholder="Due (e.g., Today 3PM)"
                style={inputStyle}
              />
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
              <button
                type="button"
                onClick={() => {
                  resetAddForm();
                  setShowAdd(false);
                }}
                style={{
                  height: 40,
                  padding: "0 14px",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 900,
                  fontSize: 13,
                  color: "#64748b"
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  height: 40,
                  padding: "0 14px",
                  borderRadius: 12,
                  border: "none",
                  background: "#22c55e",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 900,
                  fontSize: 13,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8
                }}
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </form>
        )}

        {/* Tasks List */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
          {taskList.map((t) => (
            <TaskRow key={t.id} task={t} onToggle={() => toggleTask(t.id)} />
          ))}
        </div>
      </div>

      <FloatingSupportButton />
    </div>
  );
}

/* =========================
   Shared styles/components
========================= */

const pageRootStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "transparent",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
};

const pageInnerStyle = {
  width: "100%",
  // IMPORTANT: no tight maxWidth here; lets tasks/tickets fill the available main area
  margin: "0",
  padding: "6px 0"
};

const pageTitleStyle = {
  margin: 0,
  fontSize: 30,
  fontWeight: 900,
  color: "#0f172a",
  letterSpacing: "-0.02em"
};

const pageSubtitleStyle = {
  marginTop: 6,
  fontSize: 14,
  fontWeight: 700,
  color: "#94a3b8"
};

function FloatingSupportButton() {
  return (
    <button
      type="button"
      aria-label="Support"
      style={{
        position: "fixed",
        right: 18,
        bottom: 18,
        width: 46,
        height: 46,
        borderRadius: 999,
        border: "1px solid #eef2f7",
        background:
          "conic-gradient(from 210deg, #8b5cf6, #06b6d4, #22c55e, #f59e0b, #ef4444, #8b5cf6)",
        boxShadow: "0 18px 40px rgba(15,23,42,0.12)",
        cursor: "pointer"
      }}
      onClick={() => {}}
    />
  );
}