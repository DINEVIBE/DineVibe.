import { useState } from "react";
import "../styles/dashboard.css";

export default function Reservations() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const reservations = [
    {
      id: 1,
      name: "Rohan Mehta",
      guests: 4,
      time: "7:30 PM",
      date: "Today",
      status: "confirmed",
    },
    {
      id: 2,
      name: "Ananya Sharma",
      guests: 2,
      time: "8:15 PM",
      date: "Today",
      status: "pending",
    },
    {
      id: 3,
      name: "Karthik Rao",
      guests: 6,
      time: "9:00 PM",
      date: "Tomorrow",
      status: "cancelled",
    },
  ];

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch = r.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getBadgeClass = (status) => {
    if (status === "confirmed") return "success";
    if (status === "pending") return "warning";
    if (status === "cancelled") return "error";
    return "";
  };

  return (
    <div className="dashboard-content">
      <h2 className="page-title">Reservations Management</h2>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            minWidth: "220px",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        >
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button className="primary-btn">+ New Reservation</button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Total Today</h4>
          <p className="metric-number">38</p>
        </div>
        <div className="metric-card">
          <h4>Pending</h4>
          <p className="metric-number">5</p>
        </div>
        <div className="metric-card">
          <h4>Confirmed</h4>
          <p className="metric-number">29</p>
        </div>
        <div className="metric-card">
          <h4>Cancelled</h4>
          <p className="metric-number">4</p>
        </div>
      </div>

      <div className="section-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Guests</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReservations.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.guests}</td>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                  <td>
                    {/* ✅ STATUS FONT ENLARGED HERE */}
                    <span 
                      className={`badge ${getBadgeClass(r.status)}`}
                      style={{ 
                        fontSize: "14px", 
                        fontWeight: "800", 
                        padding: "6px 12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <button className="small-btn confirm">Confirm</button>
                    <button className="small-btn cancel">Cancel</button>
                  </td>
                </tr>
              ))}

              {filteredReservations.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
