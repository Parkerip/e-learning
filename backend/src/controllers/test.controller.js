const Question = require('../models/question.model');
const Result = require('../models/result.model');

exports.getQuestions = async (req, res) => {
  const questions = await Question.find({ courseId: req.params.courseId })
    .select('-correctAnswer');
  res.json(questions);
};

exports.submitTest = async (req, res) => {
  const { answers, courseId } = req.body;
  const questions = await Question.find({ courseId });

  let score = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correctAnswer) {
      score += q.marks;
    }
  });

  const result = await Result.create({
    userId: req.user.id,
    courseId,
    score,
    total: questions.length
  });

  res.json(result);
};
