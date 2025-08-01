import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Flight Tracker API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Flight Tracker API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});