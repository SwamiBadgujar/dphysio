import { useState } from "react";
import { motion } from "framer-motion";

export default function Appointment() {
  const [form, setForm] = useState({ name: "", email: "", number: "", date: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
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
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
            required
          />
          <input
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            placeholder="Additional Notes"
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
          />

          {/* Centered Send Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-700 text-white font-medium rounded-full shadow-lg hover:bg-blue-800 transition"
            >
              {sent ? "Booked ✓" : "Book Appointment"}
            </button>
          </div>
        </form>

        {/* Optional Contact Info */}
        <div className="text-center mt-8 text-gray-700">
          <p>
            Or call us directly:{" "}
            <a href="tel:+917744898939" className="text-blue-700 font-semibold">
              +91 77448 98939
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:info@physiotherapyclinic.com" className="text-blue-700 font-semibold">
              info@physiotherapyclinic.com
            </a>
          </p>
        </div>
      </div>
    </motion.section>
  );
}