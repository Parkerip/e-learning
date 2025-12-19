const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  score: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestResult', testResultSchema);
