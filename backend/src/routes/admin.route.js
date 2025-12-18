const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

const {
  addVideo,
  addQuestion
} = require('../controllers/admin.controller');

router.get('/ping', (req, res) => {
  res.json({ message: 'admin route working' });
});

router.post('/video', auth, admin, addVideo);
router.post('/question', auth, admin, addQuestion);

module.exports = router;
