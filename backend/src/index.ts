import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import flightRoutes from './routes/flightRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/flights', flightRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Flight Tracker API is running' });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Flight Tracker API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`✈️  Flight tracking API: http://localhost:${PORT}/api/flights`);
});