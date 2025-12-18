// src/models/course.model.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['JEE', 'NEET']
  }
});

module.exports = mongoose.model('Course', courseSchema);
