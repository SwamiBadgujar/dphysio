import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import publicRoutes from './Routes/public.js';
import appointmentRoutes from './Routes/appointmentRoutes.js';
import doctorRoutes from './Routes/doctorRoutes.js'; 
import { getAIReply } from './utils/ai.js';
import transporter from './utils/email.js'; // ✅ add transporter check

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

// --- Health check & welcome ---
app.get('/', (_req, res) => {
  res.send(`✅ Backend is running for ${process.env.DOCTOR_NAME || 'our clinic'}`);
});
app.get('/api/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }));

// --- API Routes ---
app.use('/api', publicRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctor', doctorRoutes);

// --- Socket.io (AI chat) ---
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

// --- Start server after MongoDB connection ---
const PORT = Number(process.env.PORT || 5002);

mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    // ✅ Verify email transporter before starting
    try {
      await transporter.verify();
      console.log(`📧 Email transporter is ready to send messages`);
      console.log(`   ➡️ Clinic Email: ${process.env.EMAIL_USER}`);
    } catch (err) {
      console.error('❌ Email transporter verification failed:', err.message);
    }

    server.listen(PORT, () =>
      console.log(`🚀 Server running at: http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });