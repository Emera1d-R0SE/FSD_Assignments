const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
    destinationName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    duration: {
      days: { type: Number, required: true },
      nights: { type: Number, required: true },
    },
    includes: [String],
    maxGroupSize: {
      type: Number,
      default: 15,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'hard'],
      default: 'easy',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
