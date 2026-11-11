const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: '' },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, // e.g. "10 Days Trip"
    rating: { type: Number, min: 0, max: 5, default: 4.0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Destination', destinationSchema);
