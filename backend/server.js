import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns' 
import Movie from './models/Movie.js';

dns.setServers(['1.1.1.1' , '8.8.8.8']);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/watchlist' ,async (req , res) => {
  const watchlist = await Movie.find();
  res.status(200).json(watchlist);
})


// MongoDB connection
await mongoose.connect(MONGODB_URI);
console.log("MongoDB connected ✅");

app.listen(PORT , () => {
  console.log(`server running on port ${PORT}`);
  
})
