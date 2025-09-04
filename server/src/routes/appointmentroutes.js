// server/src/routes/appointmentRoutes.js
import express from "express";
import Appointment from "../models/Appointment.js";
import { sendAppointmentEmails, sendEmail } from "../utils/email.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dphysio_clinic_secret";

// --- Doctor auth middleware ---
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.doctorEmail = decoded.email;
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

// 📌 Test Email Route (Clinic only)
router.get("/test-email", async (req, res) => {
  try {
    console.log("📨 [TestEmail] Triggered clinic-only test...");
    await sendEmail({
      to: process.env.CLINIC_EMAIL,
      subject: "✅ Test Email - Mangalam Physiotherapy",
      text: "This is a test email from your server. If you see this, email setup works 🎉",
      html: "<h2>Test Email</h2><p>This is a <b>test email</b> from your server 🎉</p>",
    });
    res.json({ success: true, message: "Test email to clinic sent successfully!" });
  } catch (err) {
    console.error("❌ [TestEmail] Failed:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 📌 Test Appointment Email (Patient + Clinic)
router.get("/test-appointment-email", async (req, res) => {
  try {
    console.log("📨 [TestAppointmentEmail] Triggered...");

    const fakeAppointment = {
      patientName: "Swami badgujar",
      patientEmail: "swamibadgujar007@gmail.com", // 👈 replace with your email for testing
      phone: "9999999999",
      date: "2025-09-10",
      time: "10:00 AM",
      message: "This is a test appointment message.",
    };

    await sendAppointmentEmails(fakeAppointment, process.env.CLINIC_EMAIL);

    res.json({ success: true, message: "Test appointment emails sent (patient + clinic)!" });
  } catch (err) {
    console.error("❌ [TestAppointmentEmail] Failed:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- Create Appointment
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, time, message } = req.body;

    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ error: "Please fill all required fields." });
    }

    const appointment = new Appointment({ name, email, phone, date, time, message });
    await appointment.save();

    const clinicEmail = process.env.CLINIC_EMAIL;
    await sendAppointmentEmails(
      { patientName: name, patientEmail: email, phone, date, time, message },
      clinicEmail
    );

    res.status(201).json({ message: "Appointment booked & emails sent!", appointment });
  } catch (err) {
    console.error("❌ Appointment booking error:", err.message);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// --- Get all appointments (doctor only)
router.get("/", authMiddleware, async (_req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// --- Delete single appointment
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Appointment not found" });
    res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err.message);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// --- Bulk Delete
router.post("/bulk-delete", authMiddleware, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "No appointment IDs provided" });
    }

    await Appointment.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, message: "Appointments deleted successfully" });
  } catch (err) {
    console.error("❌ Bulk delete error:", err.message);
    res.status(500).json({ error: "Failed to delete appointments" });
  }
});

export default router;