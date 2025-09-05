import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true }, // 👈 match frontend form
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", contactSchema); // 👈 rename to Enquiry