import nodemailer from "nodemailer";

// ===============================
// Create Gmail Transporter
// ===============================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false for TLS (587)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// ===============================
// Verify Transporter
// ===============================
(async () => {
  try {
    await transporter.verify();
    console.log("✅ Email transporter verified & ready");
    console.log(`📧 Sender: ${process.env.EMAIL_USER}`);
    console.log(`📥 Clinic: ${process.env.CLINIC_EMAIL}`);
  } catch (err) {
    console.error("❌ Email transporter verification failed");
    console.error(err);
  }
})();

// ===============================
// Send Single Email
// ===============================
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    console.log("\n📨 Sending Email...");
    console.log("From:", process.env.EMAIL_USER);
    console.log("To:", to);
    console.log("Subject:", subject);

    const info = await transporter.sendMail({
      from: `"Mangalam Physiotherapy" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email Sent Successfully");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);

    return info;
  } catch (err) {
    console.error("❌ Email sending failed:");
    console.error(err);
    throw err;
  }
};

// ===============================
// Send Appointment Emails
// ===============================
export const sendAppointmentEmails = async (
  appointment,
  clinicEmail = process.env.CLINIC_EMAIL
) => {
  const {
    patientName,
    patientEmail,
    phone,
    date,
    time,
    message,
  } = appointment;

  console.log("\n📌 Starting Appointment Email Workflow");

  try {
    // -------------------------
    // Patient Confirmation
    // -------------------------
    if (patientEmail) {
      await sendEmail({
        to: patientEmail,
        subject: "✅ Appointment Confirmation - Mangalam Physiotherapy",
        text: `Hello ${patientName},

Your appointment has been successfully booked.

Date: ${date}
Time: ${time}

Thank you for choosing Mangalam Physiotherapy.

Regards,
Mangalam Physiotherapy`,
        html: `
          <div style="font-family:Arial,sans-serif">
            <h2 style="color:#16a34a;">Appointment Confirmed ✅</h2>

            <p>Hello <b>${patientName}</b>,</p>

            <p>Your appointment has been successfully booked.</p>

            <table cellpadding="8">
              <tr>
                <td><b>Date</b></td>
                <td>${date}</td>
              </tr>
              <tr>
                <td><b>Time</b></td>
                <td>${time}</td>
              </tr>
            </table>

            <p>Thank you for choosing <b>Mangalam Physiotherapy</b>.</p>
          </div>
        `,
      });

      console.log("✅ Patient confirmation email sent");
    }

    // -------------------------
    // Clinic Notification
    // -------------------------
    await sendEmail({
      to: clinicEmail,
      subject: `📅 New Appointment - ${patientName}`,
      text: `
New Appointment Received

Patient: ${patientName}
Phone: ${phone}
Email: ${patientEmail}

Date: ${date}
Time: ${time}

Message:
${message || "No message"}
`,
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>New Appointment</h2>

          <table cellpadding="8">
            <tr><td><b>Patient</b></td><td>${patientName}</td></tr>
            <tr><td><b>Email</b></td><td>${patientEmail}</td></tr>
            <tr><td><b>Phone</b></td><td>${phone}</td></tr>
            <tr><td><b>Date</b></td><td>${date}</td></tr>
            <tr><td><b>Time</b></td><td>${time}</td></tr>
            <tr><td><b>Message</b></td><td>${message || "No message"}</td></tr>
          </table>
        </div>
      `,
    });

    console.log("✅ Clinic notification email sent");
    console.log("🎉 Appointment email workflow completed");

    return true;
  } catch (err) {
    console.error("❌ Appointment email workflow failed");
    console.error(err);
    throw err;
  }
};

export default transporter;