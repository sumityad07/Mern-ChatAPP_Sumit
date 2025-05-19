import mongoose from 'mongoose';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/auth.user.js';
import express from "express"
import messageRoutes from './routes/message.routes.js';
import { app, server } from './lib/socket.js'; 

config(); 

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({ origin: 'http://localhost:5179', credentials: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URL, { dbName: 'CHAT_APPLICATION' })
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
