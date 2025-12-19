const Question = require('../models/question.model');
const Result = require('../models/result.model');
const TestAttempt = require('../models/testAttempt.model');



exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({
      courseId: req.params.courseId
    }).select('-correctAnswer');

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load questions' });
  }
};
exports.autoSave = async (req, res) => {
  const { courseId, answers, timeLeft } = req.body;
  const userId = req.user.id;

  await TestAttempt.findOneAndUpdate(
    { courseId, userId },
    {
      answers,
      timeLeft,
      submitted: false
    },
    { upsert: true }
  );

  res.json({ message: 'Auto-saved' });
};



exports.getSavedAttempt = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  const attempt = await TestAttempt.findOne({ courseId, userId });

  // 🆕 No attempt
  if (!attempt) {
    return res.status(404).json({ message: 'No attempt found' });
  }

  // 🛑 Already submitted
  if (attempt.submitted === true) {
    return res.status(403).json({ message: 'Test already submitted' });
  }

  // ✅ Load fresh questions (NO correct answers)
  const questions = await Question.find({ courseId })
    .select('-correctOptionIndex');

  res.json({
    answers: attempt.answers,
    timeLeft: attempt.timeLeft,
    questions
  });
};

exports.getLeaderboard = async (req, res) => {
  const results = await Result.find({ courseId: req.params.courseId })
    .populate('userId', 'name')
    .sort({ score: -1 });

  res.json(results);
};

exports.submitTest = async (req, res) => {
  try {
    const { courseId, answers } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid answers format' });
    }

    const exists = await Result.findOne({ userId, courseId });
    if (exists) {
      return res.status(403).json({ message: 'Test already submitted' });
    }

    const questions = await Question.find({ courseId });

    let score = 0;

    questions.forEach((q, i) => {
      if (answers[i] !== undefined && answers[i] === q.correctAnswer) {
        score += q.marks || 1;
      }
    });

    const result = await Result.create({
      userId,
      courseId,
      score,
      total: questions.length
    });

    // 👇 OPTIONAL: hide score from student later
    res.json({ success: true });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(403).json({ message: 'Duplicate attempt blocked' });
    }
    console.error(err);
    res.status(500).json({ message: 'Submit failed' });
  }
};





