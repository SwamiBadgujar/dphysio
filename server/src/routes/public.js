// server/routes/public.js
import express from "express";

const router = express.Router();

// Simple index for /api
router.get("/", (_req, res) => {
  res.json({ message: "Dphysio public API is running" });
});

// Health check
router.get("/health", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

export default router;