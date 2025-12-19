const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

const ctrl = require('../controllers/admin.controller');

// COURSES
router.post('/course', auth, admin, ctrl.addCourse);

// VIDEOS
router.post('/video', auth, admin, ctrl.addVideo);
router.get('/videos', auth, admin, ctrl.getAllVideos);
router.put('/video/:id', auth, admin, ctrl.updateVideo);
router.delete('/video/:id', auth, admin, ctrl.deleteVideo);

// QUESTIONS
router.post('/question', auth, admin, ctrl.addQuestion);
router.get('/questions', auth, admin, ctrl.getAllQuestions);
router.put('/question/:id', auth, admin, ctrl.updateQuestion);
router.delete('/question/:id', auth, admin, ctrl.deleteQuestion);

// RESULTS
router.get('/results', auth, admin, ctrl.getAllResults);
router.get('/results/:courseId', auth, admin, ctrl.getResultsByCourse);
router.get('/analytics', auth, admin, ctrl.getAnalytics);

module.exports = router;
