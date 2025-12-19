const express = require('express');
const router = express.Router();
const Course = require('../models/course.model');
const Video = require('../models/video.model'); // if used

// ✅ GET ALL COURSES
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

router.get('/exam/:exam', async (req, res) => {
  try {
    const exam = req.params.exam;
    console.log('Requested exam:', exam);

    const allCourses = await Course.find();
    console.log('All courses:', allCourses);

    const courses = await Course.find({ title: exam });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/video/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
  } catch (err) {
    res.status(404).json({ message: 'Video not found' });
  }
});
// ✅ GET VIDEOS BY COURSE
router.get('/:courseId/videos', async (req, res) => {
  try {
    const videos = await Video.find({ courseId: req.params.courseId });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
