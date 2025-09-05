import express from "express";
import Enquiry from "../models/Contact.js"; // renamed model
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dphysio_clinic_secret";

// --- Middleware for doctor authentication ---
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

// --- POST - Save enquiry (public form) ---
router.post("/", async (req, res) => {
  try {
    const { name, email, number, message } = req.body;
    if (!name || !email || !number || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const enquiry = new Enquiry({ name, email, number, message });
    await enquiry.save();

    res.status(201).json({ message: "Enquiry saved!", enquiry });
  } catch (err) {
    console.error("❌ [Enquiry] Error saving:", err);
    res.status(500).json({ error: "Failed to save enquiry" });
  }
});

// --- GET - Fetch all enquiries (doctor only) ---
router.get("/", authMiddleware, async (_req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    console.error("❌ [Enquiry] Error fetching:", err);
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
});

// --- DELETE - Remove single enquiry ---
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Enquiry not found" });
    }
    res.json({ success: true, message: "Enquiry deleted" });
  } catch (err) {
    console.error("❌ [Enquiry] Error deleting:", err);
    res.status(500).json({ error: "Failed to delete enquiry" });
  }
});

// --- POST - Bulk delete enquiries ---
router.post("/bulk-delete", authMiddleware, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "Invalid request format. Provide { ids: [] }" });
    }

    const result = await Enquiry.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error("❌ [Enquiry] Error bulk deleting:", err);
    res.status(500).json({ error: "Failed to bulk delete enquiries" });
  }
});

export default router;