// models/testAttempt.model.js
const mongoose = require('mongoose');

const testAttemptSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  answers: [Number],
  timeLeft: Number,
  submitted: {
    type: Boolean,
    default: false
  },
  score: Number,
  total: Number
}, { timestamps: true });

module.exports = mongoose.model('TestAttempt', testAttemptSchema);
