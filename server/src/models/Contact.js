import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    message: { type: String, required: false }, // ✅ optional now
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);