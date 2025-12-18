const Course = require('../models/course.model');

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
};

exports.getCoursesByExam = async (req, res) => {
  const { exam } = req.params;
  const courses = await Course.find({ examType: exam });
  res.json(courses);
};
