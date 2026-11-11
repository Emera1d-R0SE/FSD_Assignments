const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/destinations  - public
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = featured === 'true' ? { featured: true } : {};
    const destinations = await Destination.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/destinations/:id - public
router.get('/:id', async (req, res) => {
  try {
    const dest = await Destination.findById(req.params.id);
    if (!dest) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: dest });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/destinations - admin only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const dest = await Destination.create(req.body);
    res.status(201).json({ success: true, data: dest });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/destinations/:id - admin only
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const dest = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dest) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: dest });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/destinations/:id - admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
