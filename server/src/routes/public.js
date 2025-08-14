// server/routes/public.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { getAIReply } = require('../utils/ai');

// Simple index for /api
router.get('/', (_req, res) => {
  res.json({ message: 'Dphysio public API is running' });
});

// Create appointment
router.post('/appointments', async (req, res) => {
  try {
    const { name, phone, email, date, time, note } = req.body || {};
    if (!name || !phone || !date || !time) {
      return res.status(400).json({ error: 'name, phone, date, and time are required' });
    }

    const appt = await Appointment.create({ name, phone, email, date, time, note });
    res.status(201).json(appt);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// List appointments
router.get('/appointments', async (_req, res) => {
  try {
    const list = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(list);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// AI chat via HTTP (optional)
router.post('/ai/chat', async (req, res) => {
  try {
    const { prompt, context } = req.body || {};
    const reply = await getAIReply(prompt || '', context || null);
    res.json({ reply });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ error: 'AI failed' });
  }
});

module.exports = router;