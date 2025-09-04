import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("doctorToken");

  useEffect(() => {
    if (!token) {
      navigate("/doctor-login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    navigate("/doctor-login");
  };

  // --- Delete single appointment
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await axios.delete(`http://localhost:5002/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(appointments.filter((appt) => appt._id !== id));
      setSelected(selected.filter((sid) => sid !== id));
    } catch {
      alert("Failed to delete appointment.");
    }
  };

  // --- Toggle select
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // --- Select all
  const toggleSelectAll = () => {
    if (selected.length === appointments.length) {
      setSelected([]);
    } else {
      setSelected(appointments.map((appt) => appt._id));
    }
  };

  // --- Bulk delete
  const handleBulkDelete = async () => {
    if (!window.confirm("Delete selected appointments?")) return;
    try {
      await axios.post(
        "http://localhost:5002/api/appointments/bulk-delete",
        { ids: selected },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(appointments.filter((appt) => !selected.includes(appt._id)));
      setSelected([]);
    } catch {
      alert("Failed to bulk delete.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      {/* ✅ Added pt-24 so content starts below navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Appointments</h2>
          {selected.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Selected ({selected.length})
            </button>
          )}
        </div>

        {loading && <p>Loading appointments...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && appointments.length > 0 ? (
          <>
            <div className="mb-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selected.length === appointments.length}
                  onChange={toggleSelectAll}
                />
                <span>Select All</span>
              </label>
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
        ) : (
          !loading && <p>No appointments yet.</p>
        )}
      </div>
    </div>
  );
}