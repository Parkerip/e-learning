const Course = require('../models/course.model');
const Video = require('../models/video.model');
const mongoose = require('mongoose');
const Question = require('../models/question.model');
exports.addVideo = async (req, res) => {
  try {
    const { courseId, title, youtubeUrl } = req.body;

    if (!courseId || !title || !youtubeUrl) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const video = await Video.create({
      courseId,
      title,
      youtubeUrl
    });

    res.status(201).json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addQuestion = async (req, res) => {
  const question = await Question.create(req.body);
  res.json(question);
};
