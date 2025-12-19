const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: Number,
    required: true
  },
  marks: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
