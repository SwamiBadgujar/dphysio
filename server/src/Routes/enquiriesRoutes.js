import express from "express";
import Enquiry from "../models/Contact.js"; // updated model
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dphysio_clinic_secret";

// Middleware for doctor authentication
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

// POST - Save enquiry (patient side)
router.post("/", async (req, res) => {
  try {
    const { name, number, message } = req.body;

    // ✅ Only require name and number
    if (!name || !number) {
      return res.status(400).json({ error: "Name and number are required." });
    }

    const enquiry = new Enquiry({
      name,
      number,
      message: message || "", // ✅ default to empty if not provided
    });

    await enquiry.save();
    res.status(201).json({ message: "Enquiry saved!", enquiry });
  } catch (err) {
    console.error("❌ [Enquiry] Error saving:", err);
    res.status(500).json({ error: "Failed to save enquiry" });
  }
});

// GET - Fetch all enquiries (doctor only)
router.get("/", authMiddleware, async (_req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    console.error("❌ [Enquiry] Error fetching:", err);
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
});

// DELETE - Remove an enquiry
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

// BULK DELETE - Remove multiple enquiries
router.post("/bulk-delete", authMiddleware, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "No enquiry IDs provided." });
    }

    await Enquiry.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, message: "Selected enquiries deleted" });
  } catch (err) {
    console.error("❌ [Enquiry] Error bulk deleting:", err);
    res.status(500).json({ error: "Failed to bulk delete enquiries" });
  }
});

export default router;