const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const { authenticate, authorize } = require('./middleware/authMiddleware');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json()); // parse incoming JSON request bodies

// Serve test.html at the root so you can test APIs in the browser
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// ─── Routes ───────────────────────────────────────────────────────────────────

// Auth routes: /api/auth/register and /api/auth/login
app.use('/api/auth', authRoutes);

// ── Protected Profile Route ────────────────────────────────────────────────
// GET /api/profile
// Requires a valid JWT. Returns the user info embedded in the token.

app.get('/api/profile', authenticate, (req, res) => {
  res.status(200).json({
    message: 'Profile accessed successfully.',
    user: req.user   // { id, role } decoded from the JWT
  });
});

// ── Admin-Only Route ───────────────────────────────────────────────────────
// GET /api/admin
// Requires a valid JWT AND the user's role must be 'admin'.
// Students receive 403 Forbidden.

app.get('/api/admin', authenticate, authorize('admin'), (req, res) => {
  res.status(200).json({
    message: 'Welcome, Admin! You have access to the admin panel.',
    user: req.user
  });
});

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully.');

    // Start the server only after a successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // exit the process if DB connection fails
  });
