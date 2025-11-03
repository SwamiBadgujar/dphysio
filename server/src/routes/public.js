// server/src/Routes/public.js
import express from "express";

const router = express.Router();

// Default route for testing
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Dipak’s Physiotherapy API!",
    status: "OK",
  });
});

export default router;