// Appointment.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Appointment() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check required fields before sending
    const { name, email, phone, date, time } = form;
    if (!name || !email || !phone || !date || !time) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5002/api/appointments", form, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Appointment booked:", res.data);

      toast.success(
        `Appointment booked successfully! Confirmation email sent to ${form.email}`
      );

      setSent(true);
      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        message: "",
      });

      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("❌ Error booking appointment:", err);
      toast.error(err.response?.data?.error || "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="bg-gray-50 min-h-screen flex items-center justify-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto px-6 max-w-lg">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">
          Book Your Appointment
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 flex flex-col gap-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-4 border rounded-lg"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-4 border rounded-lg"
            type="email"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full p-4 border rounded-lg"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg"
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            placeholder="Additional Notes"
            className="w-full p-4 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 bg-blue-700 text-white font-medium rounded-full shadow-lg ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {sent ? "Booked ✓" : loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </motion.section>
  );
}