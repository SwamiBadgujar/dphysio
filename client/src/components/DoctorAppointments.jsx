// client/src/components/DoctorAppointments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorAppointments({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:5002/api";

  // --- Fetch appointments ---
  useEffect(() => {
    if (!token) return;

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${API_BASE}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error("❌ Error fetching appointments:", err);
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  // --- Delete single appointment ---
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    try {
      await axios.delete(`${API_BASE}/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(appointments.filter((appt) => appt._id !== id));
      setSelected(selected.filter((sid) => sid !== id));
    } catch (err) {
      console.error("❌ Error deleting appointment:", err);
      alert("Failed to delete appointment.");
    }
  };

  // --- Toggle selection for checkbox ---
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === appointments.length) {
      setSelected([]);
    } else {
      setSelected(appointments.map((appt) => appt._id));
    }
  };

  // --- Bulk delete ---
  const handleBulkDelete = async () => {
    if (!window.confirm("Delete selected appointments?")) return;
    try {
      await axios.post(
        `${API_BASE}/appointments/bulk-delete`,
        { ids: selected },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(appointments.filter((appt) => !selected.includes(appt._id)));
      setSelected([]);
    } catch (err) {
      console.error("❌ Error bulk deleting appointments:", err);
      alert("Failed to bulk delete.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && appointments.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selected.length === appointments.length}
                onChange={toggleSelectAll}
              />
              <span>Select All</span>
            </label>

            {selected.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete Selected ({selected.length})
              </button>
            )}
          </div>

          <ul className="space-y-3">
            {appointments.map((appt) => (
              <li
                key={appt._id}
                className="border-b pb-2 flex justify-between items-start"
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(appt._id)}
                    onChange={() => toggleSelect(appt._id)}
                  />
                  <div>
                    <p><strong>Name:</strong> {appt.name}</p>
                    <p><strong>Email:</strong> {appt.email || "N/A"}</p>
                    <p><strong>Phone:</strong> {appt.phone}</p>
                    <p><strong>Date:</strong> {appt.date}</p>
                    <p><strong>Time:</strong> {appt.time || "N/A"}</p>
                    <p><strong>Note:</strong> {appt.note || "N/A"}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(appt._id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {!loading && !error && appointments.length === 0 && <p>No appointments yet.</p>}
    </div>
  );
}