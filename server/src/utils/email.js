// server/src/utils/email.js
import nodemailer from "nodemailer";

// ✅ Transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465
  auth: {
    user: process.env.EMAIL_USER, // Gmail sender
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// ✅ Verify transporter at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ [Email] Transporter verification failed:", error.message);
  } else {
    console.log("✅ [Email] Transporter verified & ready");
    console.log(`📧 Sender Gmail: ${process.env.EMAIL_USER}`);
    console.log(`➡️ Clinic Inbox: ${process.env.CLINIC_EMAIL}`);
  }
});

/**
 * ✅ Send a single email (with full debug logs)
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  console.log("\n📨 [sendEmail] Preparing email...");
  console.log(`   From: ${process.env.EMAIL_USER}`);
  console.log(`   To: ${to}`);
  console.log(`   Subject: ${subject}`);

  try {
    const info = await transporter.sendMail({
      from: `"Mangalam Physiotherapy" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ [sendEmail] Email sent successfully!");
    console.log("   Accepted:", info.accepted);
    console.log("   Rejected:", info.rejected);
    console.log("   Response:", info.response);

    return info;
  } catch (err) {
    console.error("❌ [sendEmail] Error sending email:", err.message);
    return null;
  }
};

/**
 * ✅ Send appointment emails (patient + clinic)
 */
export const sendAppointmentEmails = async (appointment, clinicEmail) => {
  const { patientName, patientEmail, date, time, phone, message } = appointment;

  console.log("\n📌 [sendAppointmentEmails] Triggered");
  console.log("   ➡️ Patient Email:", patientEmail || "N/A");
  console.log("   ➡️ Clinic Email:", clinicEmail);

  try {
    // --- Patient confirmation email ---
    if (patientEmail) {
      console.log("📨 [sendAppointmentEmails] Sending email to patient...");
      await sendEmail({
        to: patientEmail,
        subject: "✅ Appointment Confirmation - Mangalam Physiotherapy",
        text: `Hello ${patientName},\n\nYour appointment is confirmed.\n\n📅 Date: ${date}\n⏰ Time: ${time}\n\nThank you!`,
        html: `
          <h2>Appointment Confirmation</h2>
          <p>Hello <b>${patientName}</b>,</p>
          <p>Your appointment is confirmed:</p>
          <ul>
            <li><b>Date:</b> ${date}</li>
            <li><b>Time:</b> ${time}</li>
          </ul>
          <p>📍 Mangalam Physiotherapy</p>
        `,
      });
    } else {
      console.log("ℹ️ [sendAppointmentEmails] No patient email provided — skipping patient email.");
    }

    // --- Clinic email ---
    console.log("📨 [sendAppointmentEmails] Sending email to clinic...");
    await sendEmail({
      to: clinicEmail,
      subject: `📅 New Appointment - ${patientName}`,
      text: `New appointment booked:\nPatient: ${patientName}\nPhone: ${phone}\nEmail: ${patientEmail || "N/A"}\nDate: ${date}\nTime: ${time}\nMessage: ${message || "N/A"}`,
      html: `
        <h2>New Appointment</h2>
        <ul>
          <li><b>Patient:</b> ${patientName}</li>
          <li><b>Email:</b> ${patientEmail || "N/A"}</li>
          <li><b>Phone:</b> ${phone}</li>
          <li><b>Date:</b> ${date}</li>
          <li><b>Time:</b> ${time}</li>
          <li><b>Message:</b> ${message || "N/A"}</li>
        </ul>
      `,
    });

    console.log("✅ [sendAppointmentEmails] Finished. Emails attempted to patient & clinic.");
  } catch (err) {
    console.error("❌ [sendAppointmentEmails] Failed:", err.message);
  }
};

export default transporter;