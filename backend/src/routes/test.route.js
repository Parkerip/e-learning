const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const ctrl = require('../controllers/test.controller');

// ✅ MORE SPECIFIC ROUTES FIRST
router.get('/resume/:courseId', auth, ctrl.getSavedAttempt);
router.get('/:courseId', auth, ctrl.getQuestions);
router.post('/submit', auth, ctrl.submitTest);
router.post('/autosave', auth, ctrl.autoSave);
router.get('/leaderboard/:courseId', auth, ctrl.getLeaderboard);


module.exports = router;
