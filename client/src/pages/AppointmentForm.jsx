import { useState } from "react";
import { createAppointment } from "../services/api";

export default function AppointmentForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", time: "", note: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment(form);
      alert("Appointment booked!");
    } catch (error) {
      alert("Failed to book appointment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="date" name="date" onChange={handleChange} required />
      <input type="time" name="time" onChange={handleChange} required />
      <textarea name="note" placeholder="Notes" onChange={handleChange}></textarea>
      <button type="submit">Book</button>
    </form>
  );
}