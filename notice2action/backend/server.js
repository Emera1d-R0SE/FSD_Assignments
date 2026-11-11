/**
 * server.js
 * Notice2Action — Express backend entry point.
 * Starts the API server on PORT (default 3001).
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import analyzeRouter from './routes/analyze.js';
import askRouter from './routes/ask.js';

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:4173', // Vite preview
  ],
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '50kb' })); // Reasonable body size limit

// --- Routes ---

// Health check — used to verify the server is running
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Notice2Action API' });
});

// Announcement analysis
app.use('/api/analyze', analyzeRouter);

// Context-aware Q&A — "Ask the Notice"
app.use('/api/ask', askRouter);

// --- 404 fallback ---
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

// --- Global error handler ---
// Catches any unhandled errors thrown by route handlers
app.use((err, req, res, _next) => {
  console.error('[server] Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    error: 'An unexpected error occurred. Please try again.',
  });
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`✅ Notice2Action API running at http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.warn('⚠️  GEMINI_API_KEY is not set. Add it to backend/.env before analyzing announcements.');
  } else {
    console.log(`   Using model: ${process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'}`);
  }
});
