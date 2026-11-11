const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// POST /api/newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Already subscribed!' });

    await Newsletter.create({ email });
    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
