import express from 'express';
const router = express.Router();
import Appointment from '../models/Appointment.js'; // You’ll create this model

// POST endpoint to save appointment
router.post('/', async (req, res) => {
  try {
    const { name, phone, date, time, reason } = req.body;
    const appointment = new Appointment({ name, phone, date, time, reason });
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
});

export default router;