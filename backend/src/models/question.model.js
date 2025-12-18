const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  courseId: mongoose.Schema.Types.ObjectId,
  question: String,
  options: [String],
  correctAnswer: Number, // index
  marks: { type: Number, default: 1 }
});

module.exports = mongoose.model('Question', questionSchema);
