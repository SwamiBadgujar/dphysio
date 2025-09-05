// client/src/components/DoctorDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorDashboard({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [selected, setSelected] = useState([]);
  const [activeTab, setActiveTab] = useState("appointments");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:5002/api";

  // --- Fetch appointments & enquiries ---
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [resAppointments, resEnquiries] = await Promise.all([
          axios.get(`${API_BASE}/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE}/enquiries`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAppointments(resAppointments.data);
        setEnquiries(resEnquiries.data);
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // --- Delete single item ---
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      if (activeTab === "appointments") {
        await axios.delete(`${API_BASE}/appointments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments((prev) => prev.filter((a) => a._id !== id));
      } else {
        await axios.delete(`${API_BASE}/enquiries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
      }
      setSelected((prev) => prev.filter((sid) => sid !== id));
    } catch (err) {
      console.error("❌ Error deleting:", err);
      alert("Failed to delete.");
    }
  };

  // --- Toggle select ---
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const list = activeTab === "appointments" ? appointments : enquiries;
    if (selected.length === list.length) {
      setSelected([]);
    } else {
      setSelected(list.map((item) => item._id));
    }
  };

  // --- Bulk delete ---
  const handleBulkDelete = async () => {
    if (!window.confirm("Delete selected items?")) return;
    try {
      if (activeTab === "appointments") {
        await axios.post(
          `${API_BASE}/appointments/bulk-delete`,
          { ids: selected },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppointments((prev) => prev.filter((a) => !selected.includes(a._id)));
      } else {
        await axios.post(
          `${API_BASE}/enquiries/bulk-delete`,
          { ids: selected },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEnquiries((prev) => prev.filter((e) => !selected.includes(e._id)));
      }
      setSelected([]);
    } catch (err) {
      console.error("❌ Error bulk deleting:", err);
      alert("Failed to bulk delete.");
    }
  };

  // --- Render list items ---
  const renderList = (list, type) => (
    <>
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.length === list.length && list.length > 0}
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
        {list.map((item) => (
          <li
            key={item._id}
            className="border-b pb-2 flex justify-between items-start"
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selected.includes(item._id)}
                onChange={() => toggleSelect(item._id)}
              />
              <div>
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Email:</strong> {item.email || "N/A"}</p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {type === "appointments" ? item.phone : item.number}
                </p>
                {type === "appointments" ? (
                  <>
                    <p><strong>Date:</strong> {item.date}</p>
                    <p><strong>Time:</strong> {item.time || "N/A"}</p>
                    <p><strong>Note:</strong> {item.note || "N/A"}</p>
                  </>
                ) : (
                  <p><strong>Message:</strong> {item.message}</p>
                )}
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      {/* Tabs with badge counts */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setActiveTab("appointments");
            setSelected([]);
          }}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeTab === "appointments"
              ? "bg-blue-700 text-white"
              : "bg-gray-200"
          }`}
        >
          Appointments
          <span className="px-2 py-0.5 bg-white text-blue-700 rounded-full text-sm">
            {appointments.length}
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab("enquiries");
            setSelected([]);
          }}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeTab === "enquiries" ? "bg-blue-700 text-white" : "bg-gray-200"
          }`}
        >
          Enquiries
          <span className="px-2 py-0.5 bg-white text-blue-700 rounded-full text-sm">
            {enquiries.length}
          </span>
        </button>
      </div>

      {loading && <p>Loading {activeTab}...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && activeTab === "appointments" && (
        appointments.length > 0
          ? renderList(appointments, "appointments")
          : <p>No appointments yet.</p>
      )}

      {!loading && !error && activeTab === "enquiries" && (
        enquiries.length > 0
          ? renderList(enquiries, "enquiries")
          : <p>No enquiries yet.</p>
      )}
    </div>
  );
}