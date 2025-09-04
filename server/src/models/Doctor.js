import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // will be hashed
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;