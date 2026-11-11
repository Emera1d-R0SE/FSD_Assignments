const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    travelDate: { type: Date, required: true },
    travelers: { type: Number, default: 1, min: 1 },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    specialRequests: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
