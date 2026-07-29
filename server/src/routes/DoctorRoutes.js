import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

// --- Doctor Login Credentials (for dashboard only, not real Gmail) ---
const DOCTOR_LOGIN_EMAIL = process.env.DOCTOR_LOGIN_EMAIL || "doctor@mangalam.com";
const DOCTOR_LOGIN_PASSWORD = process.env.DOCTOR_LOGIN_PASSWORD || "doctor123";
const DOCTOR_NAME = process.env.DOCTOR_NAME || "Dr. Dipak Mirghe";

// --- JWT Secret ---
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

// --- Clinic Email (real Gmail used for sending/receiving) ---
const EMAIL_USER = process.env.EMAIL_USER;     // sender Gmail
const EMAIL_PASS = process.env.EMAIL_PASS;     // Gmail App password
const CLINIC_EMAIL = process.env.CLINIC_EMAIL || EMAIL_USER; // where clinic gets mails

// --- Setup Nodemailer Transporter ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// --- Doctor Login ---
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (email === DOCTOR_LOGIN_EMAIL && password === DOCTOR_LOGIN_PASSWORD) {
    try {
      const token = jwt.sign({ email, role: "doctor" }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({
        message: "✅ Login successful",
        token,
        doctor: { email, name: DOCTOR_NAME },
      });
    } catch (err) {
      console.error("❌ JWT error:", err.message);
      return res.status(500).json({ error: "Token generation failed" });
    }
  }

  res.status(401).json({ error: "❌ Invalid credentials" });
});

// --- Appointment Booking (send email to clinic & patient) ---
router.post("/book-appointment", async (req, res) => {
  const { name, email, phone, date, time, message } = req.body;

  if (!name || !phone || !date) {
    return res.status(400).json({ error: "Name, phone, and date are required" });
  }

  try {
    // --- Email to Clinic ---
    await transporter.sendMail({
      from: EMAIL_USER,
      to: CLINIC_EMAIL,
      subject: "📅 New Appointment Booking",
      text: `You have a new appointment:\n\n
      Name: ${name}\n
      Phone: ${phone}\n
      Email: ${email || "N/A"}\n
      Date: ${date}\n
      Time: ${time || "N/A"}\n
      Note: ${message || "N/A"}`,
    });

    // --- Email to Patient ---
    if (email) {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: "✅ Appointment Confirmation - Mangalam Physiotherapy",
        text: `Dear ${name},\n\nYour appointment is confirmed:\n
        📅 Date: ${date}\n
        ⏰ Time: ${time || "N/A"}\n
        🏥 Clinic: Mangalam Physiotherapy\n\n
        Thank you,\n${DOCTOR_NAME}`,
      });
    }

    res.json({ message: "✅ Appointment booked successfully, emails sent" });
  } catch (err) {
    console.error("❌ Email error:", err.message);
    res.status(500).json({ error: "Failed to send appointment email" });
  }
});

export default router;
