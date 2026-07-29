import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

// Routes
import publicRoutes from './routes/public.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import doctorRoutes from './routes/DoctorRoutes.js'; 
import enquiryRoutes from './routes/enquiriesRoutes.js'; // 👈 NEW route for contact form

// Utils
import { getAIReply } from './utils/ai.js';
import transporter from './utils/email.js';

const app = express();
const server = http.createServer(app);

// --- Socket.io setup ---
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN || '*' },
});

// --- Middleware ---
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));

// --- Env check logs ---
console.log("🔍 [Server] EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Not set");
console.log("🔍 [Server] CLINIC_EMAIL:", process.env.CLINIC_EMAIL ? "Set" : "Not set");
console.log("🔍 [Server] MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");
console.log("🔍 [Server] JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "Not set");

// --- Validate env variables ---
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'CLINIC_EMAIL', 'MONGO_URI'];
const missingEnvVars = requiredEnvVars.filter((v) => !process.env[v]);
if (missingEnvVars.length > 0) {
  console.error(`❌ [Server] Missing environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// --- Health check ---
app.get('/', (_req, res) => {
  res.send(`✅ Backend is running for ${process.env.DOCTOR_NAME || 'our clinic'}`);
});
app.get('/api/health', (_req, res) =>
  res.json({ ok: true, uptime: process.uptime() })
);

// --- API Routes ---
app.use('/api', publicRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/enquiries', enquiryRoutes);

// --- Socket.io Chatbot ---
io.on('connection', (socket) => {
  console.log('⚡ Socket connected:', socket.id);

  socket.emit(
    'aiMessage',
    `Hello! Welcome to ${process.env.DOCTOR_NAME || 'our clinic'}. How can I help you today?`
  );

  socket.on('userMessage', async (payload) => {
    try {
      const text = typeof payload === 'string' ? payload : payload?.text || '';
      if (!text.trim()) return;

      socket.emit('aiTyping', { typing: true });

      const reply = await getAIReply(text, payload?.context || null);
      socket.emit('aiMessage', reply);
    } catch (err) {
      console.error('❌ AI error:', err);
      socket.emit('aiMessage', "Sorry, I couldn’t process that right now.");
    } finally {
      socket.emit('aiTyping', { typing: false });
    }
  });

  socket.on('disconnect', () => console.log('⚡ Socket disconnected:', socket.id));
});

// --- Start Server after DB connection ---
const PORT = Number(process.env.PORT || 5002);

mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    try {
      await transporter.verify();
      console.log(`📧 Email transporter is ready to send messages`);
      console.log(`   ➡️ Sender Email: ${process.env.EMAIL_USER}`);
      console.log(`   ➡️ Clinic Email: ${process.env.CLINIC_EMAIL}`);
    } catch (err) {
      console.error('❌ Email transporter verification failed:', err.message);
      console.error('⚠️ Server will start, but emails may fail. Check EMAIL_USER and EMAIL_PASS.');
    }

    server.listen(PORT, () =>
      console.log(`🚀 Server running at: http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
