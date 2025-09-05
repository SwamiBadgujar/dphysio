import express from "express";
import Appointment from "../models/Appointment.js";
import { sendAppointmentEmails } from "../utils/email.js";
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
    res.status(401).json({ error: "Invalid token" });
  }
};

// --- Create Appointment ---
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, time, message } = req.body;

    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ error: "Please fill all required fields." });
    }

    // Save appointment
    const appointment = new Appointment({ name, email, phone, date, time, message });
    await appointment.save();

    // Respond immediately (fast)
    res.status(201).json({
      message: "Appointment booked successfully! You will receive a confirmation email shortly.",
      appointment,
    });

    // Send emails in background (doesn't block response)
    sendAppointmentEmails(
      { patientName: name, patientEmail: email, phone, date, time, message },
      process.env.CLINIC_EMAIL
    ).catch((err) => console.error("❌ Email sending failed:", err));

  } catch (err) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// --- Get all appointments (doctor only) ---
router.get("/", authMiddleware, async (_req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// --- Delete single appointment ---
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Appointment not found" });
    res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// --- Bulk delete appointments ---
router.post("/bulk-delete", authMiddleware, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "No appointment IDs provided" });
    }

    await Appointment.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, message: "Appointments deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete appointments" });
  }
});

export default router;