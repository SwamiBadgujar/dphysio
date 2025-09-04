// server/routes/public.js
import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Simple index for /api
router.get("/", (_req, res) => {
  res.json({ message: "Dphysio public API is running" });
});

// Create appointment
router.post("/appointments", async (req, res) => {
  try {
    const { name, phone, email, date, time, message } = req.body || {};

    if (!name || !phone || !date || !time) {
      return res
        .status(400)
        .json({ error: "name, phone, date, and time are required" });
    }

    // Map frontend `message` to backend `note`
    const appt = await Appointment.create({
      name,
      phone,
      email,
      date,
      time,
      note: message,
    });

    res.status(201).json(appt);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// List appointments
router.get("/appointments", async (_req, res) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 }).limit(100);
    res.json(list);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

export default router;