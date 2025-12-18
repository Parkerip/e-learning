const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  courseId: mongoose.Schema.Types.ObjectId,
  videoIndex: Number,
  completed: Boolean
});

module.exports = mongoose.model('Progress', progressSchema);
