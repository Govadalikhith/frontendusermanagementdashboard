import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import { db } from './services/dataStore.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), database: db.isInitialized ? 'ready' : 'initializing' });
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Initialize DB and start server
const startServer = async () => {
  try {
    await db.initialize();
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`👉 Health check: http://localhost:${PORT}/health`);
      });
    }
  } catch (err) {
    console.error('Failed to initialize server:', err);
    process.exit(1);
  }
};

startServer();

export default app;
