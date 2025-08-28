import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <motion.div className="container mx-auto px-6 max-w-2xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="w-full mb-3 p-3 border rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Your email" className="w-full mb-3 p-3 border rounded" required />
        <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Your message" className="w-full mb-3 p-3 border rounded" />
        <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded-full">{sent ? "Sent ✓" : "Send"}</button>
      </form>
    </motion.div>
  );
}