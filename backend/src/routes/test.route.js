const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const ctrl = require('../controllers/test.controller');

router.get('/:courseId', auth, ctrl.getQuestions);
router.post('/submit', auth, ctrl.submitTest);

module.exports = router;
