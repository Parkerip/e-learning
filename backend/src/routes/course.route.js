const express = require('express');
const router = express.Router();
const Course = require('../models/course.model');

// ✅ PUBLIC route
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});
router.get('/:courseId/videos', async (req, res) => {
  try {
    const videos = await Video.find({ courseId: req.params.courseId });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
