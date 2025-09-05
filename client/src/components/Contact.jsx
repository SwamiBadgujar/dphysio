import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.number) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5002/api/contacts", // 👈 Matches your updated index.js
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(`✅ Message sent! We'll reply to ${form.email}`);
      console.log("📩 Contact saved:", res.data);

      // Reset form
      setForm({ name: "", email: "", number: "", message: "" });
    } catch (err) {
      console.error("❌ Contact form error:", err);
      toast.error(err.response?.data?.error || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="bg-gray-50 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-2">
            How May We Help You;
          </h2>
          <p className="text-gray-600">
            Reach out to us for appointments or any inquiries. We’ll get back to
            you as soon as possible!
          </p>
        </div>

        {/* Contact Form */}
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
            type="email"
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
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
          />

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 bg-blue-700 text-white font-medium rounded-full shadow-lg transition ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-800"
              }`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>

        {/* Optional Contact Info */}
        <div className="text-center mt-8 text-gray-700">
          <p>
            Or call us directly:{" "}
            <a
              href="tel:+917744898939"
              className="text-blue-700 font-semibold"
            >
              +91 77448 98939
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:mangalamphysiotherapy@gmail.com"
              className="text-blue-700 font-semibold"
            >
              mangalamphysiotherapy@gmail.com
            </a>
          </p>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </motion.section>
  );
}