import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import movieRouter from './routers/movies.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Routes
app.use('/watchlist', movieRouter);

// MongoDB connection
await mongoose.connect(MONGODB_URI);
console.log("MongoDB connected ✅");

app.listen(PORT , () => {
  console.log(`server running on port ${PORT}`);
  
})
