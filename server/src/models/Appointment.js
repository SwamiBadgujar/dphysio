import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
  reason: String,
});

export default mongoose.model('Appointment', appointmentSchema);