import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import publicRoutes from './routes/public.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import { getAIReply } from './utils/ai.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN || '*' },
});

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Health & welcome endpoints
app.get('/', (req, res) => {
  res.send(`✅ Backend is running for ${process.env.DOCTOR_NAME || 'our clinic'}`);
});
app.get('/api/health', (req, res) => res.json({ ok: true }));

// API routes
app.use('/api', publicRoutes);
app.use('/appointments', appointmentRoutes);

// Socket.io (AI chat)
io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);
  socket.emit('aiMessage', `Hello! Welcome to ${process.env.DOCTOR_NAME || 'our clinic'}. How can I help?`);

  socket.on('userMessage', async (payload) => {
    try {
      const text = typeof payload === 'string' ? payload : payload?.text || '';
      socket.emit('aiTyping', { typing: true });
      const reply = await getAIReply(text, payload?.context || null);
      socket.emit('aiMessage', reply);
    } catch (err) {
      console.error('AI error:', err);
      socket.emit('aiMessage', "Sorry, I couldn't process that right now.");
    } finally {
      socket.emit('aiTyping', { typing: false });
    }
  });

  socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
});

// Start server after MongoDB connection
const port = Number(process.env.PORT || 5001);
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    server.listen(port, () => console.log(`🚀 Server listening on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('❌ Failed to connect DB:', err.message);
    process.exit(1);
  });