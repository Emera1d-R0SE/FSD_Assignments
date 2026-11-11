const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ─── POST /api/auth/register ──────────────────────────────────────────────────
// Registers a new user. Role is always forced to 'student' — users cannot
// self-assign the admin role.

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'A user with this email already exists.' });
    }

    // Hash the password with bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user (role defaults to 'student')
    const newUser = new User({
      name,
      email,
      password: hashedPassword
      // role is not taken from req.body — it always defaults to 'student'
    });

    await newUser.save();

    // Respond with success — never include the password in the response
    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
// Authenticates a user and returns a JWT token valid for 1 hour.

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the entered password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT containing the user's ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role },  // payload
      process.env.JWT_SECRET,              // secret from .env
      { expiresIn: '1h' }                  // token expires in 1 hour
    );

    res.status(200).json({
      message: 'Login successful.',
      token
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
// Returns the logged-in user's data from the database using the JWT.
// Used by the frontend on page refresh to restore the session.

const { authenticate } = require('../middleware/authMiddleware');

router.get('/me', authenticate, async (req, res) => {
  try {
    // Find user by id decoded from JWT, exclude password
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Get me error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
