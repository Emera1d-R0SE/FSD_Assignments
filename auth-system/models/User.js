const mongoose = require('mongoose');

// Define the schema for a User document
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // name is required
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,     // no two users can have the same email
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true    // stored as a bcrypt hash, never plain text
  },
  role: {
    type: String,
    enum: ['student', 'admin'],  // only these two roles are allowed
    default: 'student'           // every new user starts as a student
  }
}, {
  timestamps: true  // automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
