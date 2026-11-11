const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Destination = require('../models/Destination');
const { protect } = require('../middleware/auth');

// POST /api/bookings - logged in user
router.post('/', protect, async (req, res) => {
  try {
    const { destinationId, travelDate, travelers, specialRequests } = req.body;
    const dest = await Destination.findById(destinationId);
    if (!dest) return res.status(404).json({ success: false, message: 'Destination not found' });

    const totalPrice = dest.price * (travelers || 1);
    const booking = await Booking.create({
      destination: destinationId,
      user: req.user._id,
      travelDate,
      travelers: travelers || 1,
      totalPrice,
      specialRequests,
    });
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/bookings/my - get current user's bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('destination').sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/bookings/:id - cancel booking
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    booking.status = 'cancelled';
    await booking.save();
    res.json({ success: true, message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
