import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Doctor from "../models/Doctor.js";

const router = express.Router();
const JWT_SECRET = "supersecretkey"; // 👉 move this to .env later

// Register doctor (one-time setup)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({ email, password: hashedPassword });
    await doctor.save();

    res.json({ success: true, message: "Doctor registered" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login doctor
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) return res.status(400).json({ error: "Invalid email" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: doctor._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;