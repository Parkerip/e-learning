const Course = require('../models/course.model');
const Video = require('../models/video.model');
const Question = require('../models/question.model');
const Result = require('../models/result.model');

// COURSES
exports.addCourse = async (req, res) => {
  try {
    console.log('BODY:', req.body);

    const course = await Course.create(req.body);

    res.json(course);
  } catch (err) {
    console.error('ADD COURSE ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};



// VIDEOS
exports.getAllVideos = async (req, res) => {
  const videos = await Video.find().populate('courseId');
  res.json(videos);
};
// ADD VIDEO
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

    res.json(video);
  } catch (err) {
    console.error('ADD VIDEO ERROR:', err);
    res.status(500).json({ message: 'Failed to add video' });
  }
};


// ADD QUESTION
exports.addQuestion = async (req, res) => {
  try {
    let { courseId, question, options, correctAnswer, marks } = req.body;

    // ✅ Basic validation
    if (
      !courseId ||
      !question ||
      !Array.isArray(options) ||
      options.length !== 4 ||
      correctAnswer === undefined
    ) {
      return res.status(400).json({ message: 'Invalid or missing fields' });
    }

    // 🔥 ADMIN ENTERS 1–4 → CONVERT TO 0–3
    const correctIndex = Number(correctAnswer) - 1;

    if (correctIndex < 0 || correctIndex > 3) {
      return res.status(400).json({
        message: 'Correct answer must be between 1 and 4'
      });
    }

    const q = await Question.create({
      courseId,
      question,
      options,
      correctAnswer: correctIndex, // ✅ STORED AS 0–3
      marks: marks || 1
    });

    res.json(q);
  } catch (err) {
    console.error('ADD QUESTION ERROR:', err);
    res.status(500).json({ message: 'Failed to add question' });
  }
};




exports.deleteVideo = async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.json({ message: 'Video deleted' });
};

exports.updateVideo = async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(video);
};

// QUESTIONS
exports.getAllQuestions = async (req, res) => {
  const questions = await Question.find().populate('courseId');
  res.json(questions);
};

exports.deleteQuestion = async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ message: 'Question deleted' });
};

exports.updateQuestion = async (req, res) => {
  const q = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(q);
};

// RESULTS
exports.getAllResults = async (req, res) => {
  const results = await Result.find()
    .populate('userId', 'name email')
    .populate('courseId', 'title')
    .sort({ score: -1 });

  res.json(results);
};
exports.getResultsByCourse = async (req, res) => {
  const results = await Result.find({ courseId: req.params.courseId })
    .populate('userId', 'name email')   // 👈 FIX HERE
    .populate('courseId', 'title')
    .sort({ score: -1 });

  res.json(results);
};

exports.getAnalytics = async (req, res) => {
  const stats = await Result.aggregate([
    {
      $group: {
        _id: '$courseId',
        attempts: { $sum: 1 },
        avgScore: { $avg: '$score' }
      }
    }
  ]);

  res.json(stats);
};
