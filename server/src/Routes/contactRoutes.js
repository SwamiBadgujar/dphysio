import express from "express";
import Contact from "../models/Contact.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dphysio_clinic_secret";

// Doctor auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.doctorEmail = decoded.email;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// POST - Save contact form submission
router.post("/", async (req, res) => {
  try {
    const { name, email, number, message } = req.body;

    if (!name || !email || !number || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = new Contact({ name, email, number, message });
    await newContact.save();

    res.status(201).json({ message: "Message received!", contact: newContact });
  } catch (err) {
    console.error("❌ [Contact] Error saving message:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// GET - Fetch all contacts (doctor only)
router.get("/", authMiddleware, async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("❌ [Contact] Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// DELETE - Remove a message by ID (doctor only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    console.error("❌ [Contact] Error deleting message:", err);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

export default router;