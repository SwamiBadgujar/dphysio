import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL for Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ [Email] Transporter verification failed!");
    console.error(error); // full error object
  } else {
    console.log("✅ [Email] Transporter verified & ready");
    console.log(`📧 Sender Gmail: ${process.env.EMAIL_USER}`);
    console.log(`➡️ Clinic Inbox: ${process.env.CLINIC_EMAIL}`);
  }
});

// Send a single email
export const sendEmail = async ({ to, subject, text, html }) => {
  console.log("\n📨 [sendEmail] Preparing to send...");
  console.log(`   From: ${process.env.EMAIL_USER}`);
  console.log(`   To: ${to}`);
  console.log(`   Subject: ${subject}`);

  // Validate inputs
  if (!process.env.EMAIL_USER) {
    throw new Error("EMAIL_USER not configured");
  }
  if (!to) {
    throw new Error("Recipient email is missing");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    throw new Error(`Invalid recipient email: ${to}`);
  }
  if (!subject) {
    throw new Error("Email subject is missing");
  }
  if (!text && !html) {
    throw new Error("Email content is missing");
  }

  try {
    const info = await transporter.sendMail({
      from: `"Mangalam Physiotherapy" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ [sendEmail] Success!");
    console.log("   Accepted:", info.accepted);
    console.log("   Rejected:", info.rejected);
    console.log("   Response:", info.response);
    return info;
  } catch (err) {
    console.error("❌ [sendEmail] Error while sending!");
    console.error(err); // full SMTP error object
    throw err;
  }
};

// Send appointment emails (patient + clinic)
export const sendAppointmentEmails = async (appointment, clinicEmail) => {
  const { patientName, patientEmail, date, time, phone, message } = appointment;

  console.log("\n📌 [sendAppointmentEmails] Starting email workflow...");
  console.log("   Appointment data:", {
    patientName,
    patientEmail,
    phone,
    date,
    time,
    message,
    clinicEmail,
  });

  try {
    // Validate inputs
    if (!clinicEmail) {
      throw new Error("Clinic email is missing");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clinicEmail)) {
      throw new Error(`Invalid clinic email format: ${clinicEmail}`);
    }
    if (!patientName || !date || !time) {
      throw new Error("Missing required appointment details");
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(`Invalid date format: ${date}`);
    }
    if (!/^\d{2}:\d{2}$/.test(time)) {
      throw new Error(`Invalid time format: ${time}`);
    }

    // Patient confirmation
    if (patientEmail) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail)) {
        throw new Error(`Invalid patient email format: ${patientEmail}`);
      }
      console.log("➡️ [sendAppointmentEmails] Sending confirmation to patient:", patientEmail);
      await sendEmail({
        to: patientEmail,
        subject: "✅ Appointment Confirmation - Mangalam Physiotherapy",
        text: `Hello ${patientName}, your appointment is confirmed for ${date} at ${time}.`,
        html: `
          <h2>Appointment Confirmation</h2>
          <p>Hello <b>${patientName}</b>,</p>
          <p>Your appointment is confirmed:</p>
          <ul>
            <li><b>Date:</b> ${date}</li>
            <li><b>Time:</b> ${time}</li>
          </ul>
        `,
      });
      console.log("✅ [sendAppointmentEmails] Patient confirmation sent");
    } else {
      console.log("ℹ️ [sendAppointmentEmails] No patient email provided, skipping.");
    }

    // Clinic notification
    console.log("➡️ [sendAppointmentEmails] Sending notification to clinic:", clinicEmail);
    await sendEmail({
      to: clinicEmail,
      subject: `📅 New Appointment - ${patientName}`,
      text: `Patient: ${patientName}\nPhone: ${phone}\nEmail: ${patientEmail || "N/A"}\nDate: ${date}\nTime: ${time}\nMessage: ${message || "N/A"}`,
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
    console.log("✅ [sendAppointmentEmails] Clinic notification sent");

    console.log("🎉 [sendAppointmentEmails] All emails sent successfully!");
    return true;
  } catch (err) {
    console.error("❌ [sendAppointmentEmails] Failed to complete workflow!");
    console.error(err); // full error object
    throw err;
  }
};

// Export transporter for debugging if needed
export default transporter;