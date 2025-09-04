// src/testEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function testEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("⏳ Sending test email...");

    const info = await transporter.sendMail({
      from: `"Mangalam Physiotherapy" <${process.env.EMAIL_USER}>`,
      to: process.env.CLINIC_EMAIL, // send to your clinic Gmail
      subject: "✅ Test Email from DPhysio",
      text: "This is a test email from your Node.js server setup.",
      html: "<b>This is a test email from your Node.js server setup.</b>",
    });

    console.log("📧 Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email error:", err);
  }
}

testEmail();